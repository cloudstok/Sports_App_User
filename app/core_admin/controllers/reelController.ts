import { ResponseInterceptor } from '../utilities/response-interceptor';
import { connection } from '../../config/dbConf';
import { uploads3 } from '../../core/aws/uploads3';
import { SQL_ADD_REELS, SQL_SHOW_REELS } from '../query/query';

export class reelController extends ResponseInterceptor {
    public connection: connection
    upload: uploads3
    constructor() {
        super()
        this.connection = new connection();
        this.upload = new uploads3();
    }

    async addReel(req: any, res: any) {
        try {
            let url = '';
            if (req.files && req.files.length > 0) {
                let imageUrl = await this.upload.uploadImage(req.files)
                url = imageUrl.Location
            }
            const [addingReel]: any = await this.connection.write.query(SQL_ADD_REELS, [url])
            return this.sendSuccess(res, { msg: "Reels added Successfully" })

        }
        catch (err) {
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }

    async showReel(req: any, res: any) {
        try {
            const [showsReel] = await this.connection.read.query(SQL_SHOW_REELS);
            return this.sendSuccess(res, { data: showsReel })
        }
        catch (err) {
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }

}