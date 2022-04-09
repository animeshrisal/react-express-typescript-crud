import WebSocket, { Server, WebSocketServer } from "ws";

let websocketServer: Server;

export const socket = (expressServer) => {
  websocketServer = new WebSocket.Server({
    noServer: true,
  });

  websocketServer.on("connection", (socket) => {
    socket.on("message", (message) => console.log(message));
  });

  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });
};

export const adminMessage = () => {
    console.log(websocketServer.clients)
    websocketServer.clients.forEach(function each(client) {
        client.send('aaaa');
      });
}