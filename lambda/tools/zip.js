const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

const BUNDLE_PATH = '../bundle/'

const output = fs.createWriteStream(path.resolve(__dirname, BUNDLE_PATH, 'index-' + Date.now() + '.zip'))
const archive = archiver('zip', { store: true })

output.on('close', () => {
  console.log('Done ' + archive.pointer() + ' total bytes')
})

archive.on('error', (err) => { throw err })

archive.pipe(output)

const source = path.resolve(__dirname, BUNDLE_PATH, 'index.js')
archive.append(fs.createReadStream(source), { name: 'index.js' })

archive.finalize()
