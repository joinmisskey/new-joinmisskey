const gulp = require('gulp')
const fs = require("fs")
const loadyaml = require("./loadyaml")
const path = require("path")
const glog = require("fancy-log")
const extend = require("extend")

const $ = require("gulp-load-plugins")()

const argv = require("minimist")(process.argv.slice(2))

const site = loadyaml('./imgsetting.yml')

gulp.task("image", () => {
	if (!argv.i) throw Error("ファイル/フォルダ名が指定されていません。 -i <path>を付けて指定してください。")
	const parsed = path.parse(argv.i)
	if (parsed.length <= 0) throw Error("指定されたパスにファイルは見つかりませんでした。")
	const streams = []
	const date = new Date()

	const imagesAllFalse = {
		optipng: false,
		pngquant: false,
		zopflipng: false,
		jpegRecompress: false,
		mozjpeg: false,
		guetzli: false,
		gifsicle: false,
		svgo: false
	}
	const imagesBase = site.images.files.all.image ? extend(
		true,
		imagesAllFalse,
		site.images.files.all.image
	) : imagesAllFalse

	let gif; let svg; let others

	const dirname = `${date.getFullYear()}/${(`0${date.getMonth() + 1}`).slice(-2)}`
	if (parsed.ext === "") {
		glog(`image will be saved like as "img/${dirname}/filename.ext"`)
		gif = gulp.src(`${argv.i}/**/*.gif`)
		svg = gulp.src(`${argv.i}/**/*.svg`)
		others = gulp.src(`${argv.i}/**/*.{png,jpg,jpeg}`)
	} else if (parsed.ext === ".svg") {
		glog(`image will be saved like as "img/${dirname}/${parsed.name}${parsed.ext}"`)
		svg = gulp.src(argv.i)
	} else if (parsed.ext === ".gif") {
		glog(`image will be saved like as "img/${dirname}/${parsed.name}${parsed.ext}"`)
		gif = gulp.src(argv.i)
	} else {
		glog(`image will be saved like as "img/${dirname}/${parsed.name}${parsed.ext}"`)
		others = gulp.src(argv.i)
	}
	if (gif) {
		streams.push(
			new Promise((res, rej) => {
				gif
					.pipe($.image(extend(true, imagesBase, {
						gifsicle: true
					})))
					.pipe($.rename({ dirname } || {}))
					.pipe(gulp.dest("public/img"))
					.on("end", res)
					.on("error", rej)
			})
		)
	}
	if (svg) {
		streams.push(
			new Promise((res, rej) => {
				svg
					.pipe($.svgmin())
					.pipe($.rename({ dirname } || {}))
					.pipe(gulp.dest("public/img"))
					.on("end", res)
					.on("error", rej)
			})
		)
	}
	if (others) {
		streams.push(
			new Promise((res, rej) => {
				others
					.pipe($.responsive({
						"**": site.images.files.responsive
					}, site.images.files.all.responsive))
					.pipe($.image(imagesBase))
					.pipe($.rename({ dirname } || {}))
					.pipe(gulp.dest("public/img"))
					.on("end", res)
					.on("error", rej)
			})
		)
	}

	return Promise.all(streams)
})
