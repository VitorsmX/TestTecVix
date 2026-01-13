import { io, Socket } from "socket.io-client";
import { IGenericSocket } from "../types/socketType";

let socket: Socket | null = null;

export const createSocket = (): IGenericSocket => {
  if (socket) return socket as unknown as IGenericSocket;

  socket = io("http://localhost:3001", {
    transports: ["websocket"],
    autoConnect: true,
  });
  return socket as unknown as IGenericSocket;
};

export const disconnectSocket = () => {
  if (!socket) return;

  socket.disconnect();
  socket = null;
};