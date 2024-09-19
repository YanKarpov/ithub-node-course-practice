const fs = require('fs')

try {
    const content = fs.readFileSync('2.txt')
    console.log(content.toString())
} catch (error) {
    console.error(error.message)
}

