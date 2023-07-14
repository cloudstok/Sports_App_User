import { appConfig } from "./config/appConf";
import * as express from "express";
import { AppRoutes } from "./routes/app.routes";
import { ResponseInterceptor } from "./core/utilities/response-interceptor"
import * as cors from 'cors';


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
        const appRoutes = new AppRoutes();
    
        for (var getRoute = 0; getRoute < appRoutes.AppGetRoutes.length; getRoute++) {
            let getPath = appRoutes.AppGetRoutes[getRoute].path
            getPath = getPath !== "*" ? appConfig.path + getPath : getPath
            this.app.get(getPath, [appRoutes.AppGetRoutes[getRoute].component]);
        }
        for (var postRoute = 0; postRoute < appRoutes.AppPostRoutes.length; postRoute++) {
            let postPath = appRoutes.AppPostRoutes[postRoute].path
            postPath = postPath !== '*' ? appConfig.path  + postPath : postPath 
            this.app.post( postPath, [appRoutes.AppPostRoutes[postRoute].component]);          
        }
        for (var putRoute = 0; putRoute < appRoutes.AppUpdateRoutes.length; putRoute++) {
            let putPath = appRoutes.AppUpdateRoutes[putRoute].path 
            putPath = putPath !== "*" ? appConfig.path  + putPath : putPath
            this.app.put(putPath, [appRoutes.AppUpdateRoutes[putRoute].component])
        }
        for (var delRoute = 0; delRoute < appRoutes.AppDeleteRoutes.length; delRoute++) {
            let delPath = appRoutes.AppDeleteRoutes[delRoute].path
            delPath = delPath  !== "*" ? appConfig.path  + delPath : delPath
            this.app.delete(delPath, [appRoutes.AppDeleteRoutes[delRoute].component])
        }
    }


    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }
}

export default new App().app;