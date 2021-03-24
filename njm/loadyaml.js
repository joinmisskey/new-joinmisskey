const readyaml = require("js-yaml").load
const fs = require("fs")

module.exports = filepath => readyaml(fs.readFileSync(filepath))
