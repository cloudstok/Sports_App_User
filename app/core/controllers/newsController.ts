import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from '../../config/dbConf';
import { SQL_INSERT_NEWS, SQL_SHOW_NEWS, SQL_SHOW_NEWS_BY_ID, SQL_UPDATE_NEWS, SQL_DELETE_NEWS } from '../query/query'
import { uploads3 } from "../aws/uploads3"
export class News extends ResponseInterceptor {
    public connection: connection
    uploads3: uploads3
    constructor() {
        super();
        this.connection = new connection();
        this.uploads3 = new uploads3()
    }
    async getNews(req: any, res: any) {
        try {
            const { PageLimit, PageOffset } = req.query
            const [news] = await this.connection.write.query(SQL_SHOW_NEWS, [+PageLimit, +PageOffset]);
            return this.sendSuccess(res, { data: news })
        } catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }

    async getNewsById(req: any, res: any) {
        try {
            const [news] = await this.connection.write.query(SQL_SHOW_NEWS_BY_ID, [req.params.news_id]);
            this.sendSuccess(res, { data: news })
        } catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }

    async insertNews(req: any, res: any) {
        try {
            console.log(req.files)
            if (req?.files?.length > 0) {
                req.body.cover_image = (await this.uploads3.uploadImage(req.files)).Location
            }
            const { heading, sub_heading, cover_image, created_by, url, content } = req.body;
            await this.connection.write.query(SQL_INSERT_NEWS, [heading, sub_heading, cover_image, created_by, url, content]);
            this.sendSuccess(res, { msg: "News added successfully" })
        } catch (err) {
            console.log(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }

    async updateNews(req: any, res: any) {
        try {
            const reqBody = req.body;
            if (req.body.description) {
                req.body.description = JSON.stringify(req.body.description)
            }
            const [news] = await this.connection.write.query(SQL_UPDATE_NEWS, [reqBody, req.params.news_id]);
            this.sendSuccess(res, { msg: "News updated successfully", data: news })
        } catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }

    async deleteNews(req: any, res: any) {
        try {
            const [news]: any = await this.connection.write.query(SQL_DELETE_NEWS, [req.query.news_id]);
            return this.sendSuccess(res, { message: "News deleted Successfully", data: news })
        } catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }
}