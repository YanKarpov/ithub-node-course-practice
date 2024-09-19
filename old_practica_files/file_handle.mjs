import fs from 'node:fs/promises'

// async/await syntax
// await fs.unlink("1.txt")

// promises syntax
// fs.unlink("1.txt").then(() => {
//     console.log('file was successfully removed')
// })

// async/await syntax with exc handling
try {
    const content = await fs.readFile('1.txt')
    console.log(content.toString())
    await fs.writeFile('1', "writing completed")
} catch (error) {
    console.error(error.message)
}

// promises syntax with exc handling
// let content = ''
// fs.readFile('2.txt')
//     .then(data => {
//         content = data.toString()
//     })
//     .catch(error => {
//         console.error(error.code)
//     })
//     .then(() => {
//         console.log(content)
//     })

