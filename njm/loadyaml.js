import { load as readyaml } from "js-yaml";
import fs from "fs";

export default filepath => readyaml(fs.readFileSync(filepath));
