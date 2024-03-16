const fs = require('fs-extra')
const Path = require('path');

(async function build() {
	// clean docs folder
	const docsPath = './docs'
	if (fs.existsSync(docsPath)) {
		const deleteFolderRecursive = (path) => {
			if (fs.existsSync(path)) {
				fs.readdirSync(path).forEach((file, index) => {
					const curPath = Path.join(path, file)
					if (fs.lstatSync(curPath).isDirectory()) {
						deleteFolderRecursive(curPath)
					} else {
						fs.unlinkSync(curPath)
					}
				})
                fs.rmdirSync(path)
			}
		}
		deleteFolderRecursive(docsPath)
	}

	await fs.copy('./build/', './docs/')
})()