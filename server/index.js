const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT);

// handle server events
server.on("listening", () => {
  console.log(`server is listening to port ${server.address().port}`);
});

server.on("error", err => {
  console.log(err.message);
  console.log("something went wrong, closing the server...");
  server.close();
});

server.on("close", () => {
  console.log("Bye Bye!");
});
