import "reflect-metadata";
import Server from "./src/server";

const port = 3000 || process.env.SERVER_PORT;

const server: Server = new Server(port);

server.start();
