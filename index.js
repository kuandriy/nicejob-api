const host = process.env.host || 'localhost';
const port = process.env.port || 8080;
const server = require('./server.js');

server.listen(port, host, () => {
    console.log(`Server started ${host} ${port}`);
});