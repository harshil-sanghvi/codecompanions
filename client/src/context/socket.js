import socketio from "socket.io-client";
import React from "react";
import { SOCKET_URL } from "../config/constants";

export const socket = socketio.connect(SOCKET_URL, {
  transports: ["websocket"],
});
export const SocketContext = React.createContext();
