const path = require("path");
const glob = require("glob");

class ChunkController {
	constructor() {
		this.routes = this.getProjectRoutes();
		this.templates = this.getProjcetHtml();
	}

	getProjectRoutes() {
		// console.log(process.cwd());
		// TODO glob的目录取值方式
		return glob.sync("./src/pages/**/*.ts");
	}

	getProjcetHtml() {
		return glob.sync("./src/pages/**/*.html");
	}

	getTemplateHtml() {
		const templateHtml = {};
		this.templates.forEach((temp) => {
			// TODO 正则优化
			const name = temp.split("./src/pages/")[1].split("/")[0];
			if (name === "app") {
				templateHtml["index"] = temp;
			} else {
				templateHtml[name] = temp;
			}
		});
		return templateHtml;
	}

	getEntrys() {
		const entrys = {};
		this.routes.forEach((route) => {
			// TODO 正则优化
			const name = route.split("./src/pages/")[1].split("/")[0];
			entrys[name] = route;
		});
		return entrys;
	}
}

module.exports = new ChunkController();
