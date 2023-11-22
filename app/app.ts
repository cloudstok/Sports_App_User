import { appConfig } from "./config/appConf";
import * as express from "express";
import { AppRoutes } from "./routes/app.routes";
import { AdminAppRoutes } from "./routes/app.admin.routes";
import { ResponseInterceptor } from "./core/utilities/response-interceptor"
import { io, firstSUb } from './core/socket/socket';

import * as cors from 'cors';
var getRawBody = require('raw-body');
var zlib = require('zlib');

class App {
    public app: express.Application;
    private PORT: number = appConfig.server.port;
    responseInterceptor: ResponseInterceptor;


    constructor() {
        this.app = express();
        this.config();
        this.responseInterceptor = new ResponseInterceptor();
        this.app.listen(this.PORT, () => {
            console.log(`server listening @ port ${appConfig.server.port} `);
        });
        const admin_appRoutes = new AdminAppRoutes();
        const appRoutes = new AppRoutes();


        let AllGetRoutes = [...admin_appRoutes.AppGetRoutes, ...appRoutes.AppGetRoutes]
        let AllPostRoutes = [...admin_appRoutes.AppPostRoutes, ...appRoutes.AppPostRoutes]
        let AllDeleteRoutes = [...admin_appRoutes.AppDeleteRoutes, ...appRoutes.AppDeleteRoutes]
        let AllUpdateRoutes = [...admin_appRoutes.AppUpdateRoutes, ...appRoutes.AppUpdateRoutes]

        for (var getRoute = 0; getRoute < AllGetRoutes.length; getRoute++) {
            let getPath = AllGetRoutes[getRoute].path
            this.app.get(getPath, [AllGetRoutes[getRoute].component]);
        }
        for (var postRoute = 0; postRoute < AllPostRoutes.length; postRoute++) {
            let postPath = AllPostRoutes[postRoute].path
            // postPath = postPath !== '*' ? appConfig.adminpath  + postPath : postPath 
            // console.log(postPath)
            this.app.post(postPath, [AllPostRoutes[postRoute].component]);
        }
        for (var putRoute = 0; putRoute < AllUpdateRoutes.length; putRoute++) {
            let putPath = AllUpdateRoutes[putRoute].path

            this.app.put(putPath, [AllUpdateRoutes[putRoute].component])
        }
        for (var delRoute = 0; delRoute < AllDeleteRoutes.length; delRoute++) {
            let delPath = AllDeleteRoutes[delRoute].path
            this.app.delete(delPath, [AllDeleteRoutes[delRoute].component])
        }

        // ==================================socket===================================
        io.on('connection', (socket) => {
            console.log('socket connected');
            socket.on("sub", async (...ev) => {
                await socket.join(ev);
                console.log(ev, socket.id, typeof ev[0],)
                await firstSUb(socket.id, ev)
            })
        });
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        // this.app.use(initSocket());
        this.app.use(function (req, res, next) {
            if (req.headers['content-type'] === 'application/octet-stream') {
                getRawBody(req, {
                    length: req.headers['content-length'],
                }, function (err, string) {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    zlib.gunzip(string, function (err, dezipped: Buffer) {
                        if (err) {
                            console.log(err);
                            next(err);
                        }
                        req.body = JSON.parse(dezipped.toString());
                        next();
                    });
                })
            }
            else {
                next();
            }
        });

    }

}


export default new App().app;




   
