const fs = require('fs')

let content = ''

fs.readFile('1.txt', (error, data) => {
    if (error) {
        console.error(error.message)
    } else {
        content = data.toString()
        console.log(content)
    }
})

