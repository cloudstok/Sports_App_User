
import { Server } from "socket.io";

export const io = new Server(8084, {   cors: {
        origin: "*",
        methods: ['GET', 'PUT', 'POST']
        //credentials: true
      }
 });

