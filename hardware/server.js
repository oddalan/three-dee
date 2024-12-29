import livery from "livery";
// import { Gpio } from "onoff";
import { WebSocketServer } from "ws";

livery(".", { httpPort: 3000 });

let socketServer = new WebSocketServer({ port: 3030 });
// let button = new Gpio(4, "in", "rising", { debounceTimeout: 10 });

socketServer.on("connection", (socket) => {
  socket.on("error", console.error);
  socket.on("message", console.log);

  //   button.watch((err, val) => {
  //     if (!err) socket.send(JSON.stringify([4, val]));
  //   });

  socket.send(JSON.stringify({ id: 4, value: 1 }));
});
