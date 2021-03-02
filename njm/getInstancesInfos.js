const fs = require("fs")
const glog = require("fancy-log")
const semver = require("semver")
const fetch = require("node-fetch").default
const AbortController = require("abort-controller").default
const extend = require("extend")
const loadyaml = require("./loadyaml")
const Queue = require('promise-queue');

const instances = loadyaml("../data/instances.yml")

const pqueue = new Queue(20)

getInstancesInfos().then(instanceInfos => {
    fs.writeFile('./public/instances.json', JSON.stringify(instanceInfos), () => {})
})

function safePost(url, options) {
    const controller = new AbortController()
    const timeout = setTimeout(
      () => { controller.abort() },
      80000
    )
    // glog("POST start", url)
    return fetch(url, extend(true, options, { method: "POST", signal: controller.signal })).then(
      res => {
        // glog("POST finish", url)
        if (res && res.status === 200) return res
        return false
      },
      e => {
        // glog("POST failed", url, e.errno, e.type)
        return false
      }
    ).finally(() => {
      clearTimeout(timeout)
    })
}

async function postJson(url, json) {
    return pqueue.add(() => safePost(url, (json ? {
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "LuckyBeast"
            }
        } : {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "LuckyBeast"
            }
        }))
        .then(res => (!res ? false : res.json()))
        .catch(e => {
            glog.error(url, e)
            return false
        })
    )
}

async function getVersions() {
    glog("Getting Misskey Versions")
    const ghRepos = ["mei23/misskey", "Groundpolis/Groundpolis", "346design/twista.283.cloud", "syuilo/misskey"]
    const maxRegExp = /<https:\/\/.*?>; rel="next", <https:\/\/.*?\?page=(\d+)>; rel="last"/
    const versions = {}
    const headers = {
      "User-Agent": "LuckyBeast",
      Authorization: `bearer ${process.env.LB_TOKEN}`
    }

    const vqueue = new Queue(3)

    for (const repo of ghRepos) {
        glog(repo, "Start")
        const res1 = await fetch(`https://api.github.com/repos/${repo}/releases`, { headers })
        const link = res1.headers.get("link")
        const max = link && Math.min(Number(maxRegExp.exec(link)[1]), repo === "syuilo/misskey" ? 99999 : 3)
    
        const resp = (await Promise.all([Promise.resolve(res1), ...(!link ? []
            : Array(max - 1).fill()
            .map((v, i) => `https://api.github.com/repos/${repo}/releases?page=${i + 2}`)
            .map(url => vqueue.add(() => fetch(url, { headers }))))]
            .map((resa, i) => resa.then(
            res => res.json(),
            e => {
                glog(repo, "Error(fetch)", e)
                Promise.resolve([])
            }
            ).then(
            json => json.map((release, j) => {
                // glog("Misskey Version", release.tag_name)
                versions[semver.clean(release.tag_name, { loose: true })] = (i - 1) * 30 + j
                return release.tag_name
            }),
            e => {
                glog(repo, "Error(json)", e)
                Promise.resolve([])
            }
            ).catch(e => { throw Error(e) })))).flat(1)
        glog(repo, "Finish", resp.length)
    }

    glog("Got Misskey Versions")
    return versions
}

async function getInstancesInfos(keys) {
    glog("Getting Instances' Infos")

    const metasPromises = []
    const statsPromises = []
    const AUChartsPromises = []
    const instancesInfos = []
  
    const versions = await getVersions(keys)

    // eslint-disable-next-line no-restricted-syntax
    for (let t = 0; t < instances.length; t += 1) {
      const instance = instances[t]
      metasPromises.push(postJson(`https://${instance.url}/api/meta`))
      statsPromises.push(postJson(`https://${instance.url}/api/stats`))
      AUChartsPromises.push(postJson(`https://${instance.url}/api/charts/active-users`, { span: "day" }))
    }

    const interval = setInterval(() => {
        glog(`${pqueue.getQueueLength()} requests remain and ${pqueue.getPendingLength()} requests processing.`)
    }, 1000)

    const [
      metas,
      stats,
      AUCharts
    ] = await Promise.all([
      Promise.all(metasPromises),
      Promise.all(statsPromises),
      Promise.all(AUChartsPromises)
    ])

    clearInterval(interval)
  
    for (let i = 0; i < instances.length; i += 1) {
      const instance = instances[i]
      const meta = metas[i] || false
      const stat = stats[i] || false
      const AUChart = AUCharts[i] || false
      if (meta && stat && AUChart) {
        delete meta.emojis
  
        /*   インスタンスバリューの算出   */
        let value = 0
        // 1. バージョンのリリース順をもとに並び替え
        const v = versions[semver.clean(meta.version, { loose: true })] || versions[semver.valid(semver.coerce(meta.version))] || 999
        value += 100000 - v * 7200

        // (基準値に影響があるかないか程度に色々な値を考慮する)
        if (AUChart) {
          // 2.
          const arr = AUChart.local.count.filter(e => e !== 0)
          // eslint-disable-next-line no-mixed-operators
          if (arr.length > 0) value += arr.reduce((prev, current) => prev + current) / arr.length * 10
        }

        delete meta.announcements;

        instancesInfos.push(extend(true, instance, {
          value,
          meta,
          stats: stat,
          description: meta.description ? meta.description : (instance.description || null),
          isAlive: true
        }))
      }/* else {
        instancesInfos.push(extend(true, { isAlive: false, value: 0 }, instance))
      }*/
    }
    glog("Got Instances' Infos")

    return instancesInfos.sort((a, b) => {
      if (!a.isAlive && b.isAlive) return 1
      if (a.isAlive && !b.isAlive) return -1
      if (a.isAlive && b.isAlive) return (b.value || 0) - (a.value || 0)
      return (b.url > a.url ? -1 : 1)
    })
}
