import livery from "livery";
import { Gpio } from "onoff";
import { WebSocketServer } from "ws";

livery(".", { httpPort: 3000 });

let socketServer = new WebSocketServer({ port: 3030 });
let buttonUp = new Gpio(6, "in", "both", { debounceTimeout: 10 });
let buttonDown = new Gpio(13, "in", "both", { debounceTimeout: 10 });
let buttonLeft = new Gpio(19, "in", "both", { debounceTimeout: 10 });
let buttonRight = new Gpio(26, "in", "both", { debounceTimeout: 10 });

socketServer.on("connection", (socket) => {
  socket.on("error", console.error);
  socket.on("message", console.log);

  buttonUp.watch((err, value) => {
    if (!err) socket.send(JSON.stringify({ id: 'up', value }));
  });

  buttonDown.watch((err, value) => {
    if (!err) socket.send(JSON.stringify({ id: 'down', value }));
  });

  buttonLeft.watch((err, value) => {
    if (!err) socket.send(JSON.stringify({ id: 'left', value }));
  });

  buttonRight.watch((err, value) => {
    if (!err) socket.send(JSON.stringify({ id: 'right', value }));
  });
});

// /etc/xdg/lxsession/LXDE-pi/autostart
// @/usr/bin/chromium-browser --start-fullscreen --noerrdialogs --disable-infobars http://localhost:3000

// sudo crontab -e
// @reboot sudo /home/alanmoeller/.config/nvm/versions/node/v22.12.0/bin/node /home/alanmoeller/Repos/github/oddalan/three-dee/hardware/server.js &