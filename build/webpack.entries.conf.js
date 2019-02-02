
const Path = require('path')
const Fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const destDir = ''
const cwd = Path.resolve(__dirname, '../src')
const defaultTemplateFile = Path.resolve(cwd, 'layout.pug')
// export
module.exports = (options = {}) => {
	const entries = readPageEntries('pages')
	const entry = {}
	const htmlGeneratorPlugins = []
	for (const name in entries) {
		const instance = entries[name]
		entry[name] = instance.path
		htmlGeneratorPlugins.push(new HtmlWebpackPlugin({
			filename: Path.join(destDir, `${name}.html`),
			template: instance.template,
			chunks: ['vendor', 'manifest', name],
			title: instance.title,
		}))
	}
	return {
		entry,
		plugins: htmlGeneratorPlugins,
	}
}

/**
 * @param {string} src
 * @return {Object}
 * @internal
 * */
function readPageEntries(src) {
	const fileList = Fs.readdirSync(Path.resolve(cwd, src))
	const entry = {}
	fileList.forEach((name) => {
		const dirPath = Path.resolve(cwd, src, name)
		if (Fs.statSync(dirPath).isDirectory()) {
			const fileList = Fs.readdirSync(dirPath)
			const jsFileName = `${name}.js`
			const templateName = `${name}.pug`
			const title = Fs.existsSync(Path.resolve(dirPath, 'package.json')) ? require(Path.resolve(dirPath, 'package.json')).title : ''
			if (fileList.indexOf(jsFileName) >= 0) {
				entry[name] = {
					path: Path.resolve(dirPath, jsFileName),
					template: fileList.indexOf(templateName) >= 0 ? Path.resolve(dirPath, templateName) : defaultTemplateFile,
					title,
				}
			}
		} else if (/\.js$/.test(dirPath)) {
			const filename = Path.basename(dirPath)
			entry[filename.slice(0, filename.lastIndexOf('.'))] = {
				path: dirPath,
				template: defaultTemplateFile,
			}
		}
	})
	return entry
}
