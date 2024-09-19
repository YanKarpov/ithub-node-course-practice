// import { createReadStream } from 'fs'

// const stream = createReadStream('1.txt')

// stream.on('data', data => {
//     console.log(data.toString())
// })

// stream.on('close', () => {
//     console.log('end of file')
// })

import fs from 'fs'
import streams from 'stream/promises'
import zlib from 'zlib'

await streams.pipeline(
    fs.createReadStream('1.zip'),
    zlib.createGzip(),
    fs.createWriteStream('archive.tar.gz')
)

console.log('completed')