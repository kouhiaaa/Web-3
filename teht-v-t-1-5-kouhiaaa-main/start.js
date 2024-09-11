//const app = require('./teht6_12.js')
const app = require('./teht1_5.js')
//const app = require('./server.js')

let port = 3004;
//let hostname = "127.0.0.1";

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
