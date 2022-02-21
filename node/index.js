const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost'
const port = 3000


const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} via ${req.method} request`);


    if (req.method === 'GET') {
        let fileUrl;
        if (req.url === '/') {
            fileUrl = '/index.html'
        } else {
            fileUrl = req.url
        }


        const filepath = path.resolve('./public'+fileUrl)
        const fileExt = path.extname(filepath)

        if (fileExt === '.html'){
            fs.exists(filepath, (exists) => {
                if (!exists) {
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
                    res.end('<html><body><h1>Error 404:' + fileUrl + ' not found </h1></body></html>')

                    return;
                }
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                fs.createReadStream(filepath).pipe(res)
            })
} else {
                            res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
        res.end('<html><body><h1>Error 404:' + fileUrl + ' is not an HTML file </h1></body></html>')
        return;
        }
    } else {
        res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
        res.end('<html><body><h1>Error 404:' + req.method + ' not supported </h1></body></html>')
        return;
    }

    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    // res.end('<html><body><h1>Hello world!</h1></body></html>')
})

server.listen(port, hostname, () => {
    console.log(`Server listening at port ${port} on ${hostname}`)
})