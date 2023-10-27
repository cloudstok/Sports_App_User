import { appConfig } from '../../config/appConf'
import { ResponseInterceptor } from "../utilities/response-interceptor";
export class socketController extends ResponseInterceptor{
    constructor(){
      super();
    }
   

Connection_Web_Socket(){
  const socket = new WebSocket("wss://d3qrzb2hkwacmz.cloudfront.net/");
// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});

}
}