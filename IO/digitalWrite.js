const turbo = require('turbo-net')

const server = turbo.createServer(function (socket) {
    socket.read(Buffer.alloc(32 * 1024), function onread (err, buf, read) {
      if (err) throw err
      socket.write(buf, read, function (err) {
        if (err) throw err
        socket.read(buf, onread)
      })
    })
  })
  
  server.listen(8080, function () {
    const socket = turbo.connect(8080)
  
    socket.read(Buffer.alloc(32), function (err, buf, read) {
      if (err) throw err
      console.log(buf.toString('utf-8', 0, read))
    })
    socket.write(Buffer.from('hello world\n'))
  })