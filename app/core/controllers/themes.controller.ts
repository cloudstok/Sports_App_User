import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../utilities/response-interceptor";
import { uploads3 } from "../aws/uploads3";
import { SQL_ADD_THEMES, SQL_DELETE_THEME, SQL_GET_THEMES, SQL_UPDATE_THEME } from "../query/query";

export class ThemeController extends ResponseInterceptor {
    public connection: connection
    public uploads3: uploads3
    constructor() {
        super()
        this.connection = new connection()
        this.uploads3 = new uploads3()
    }

    async addThemes(req: any, res: any) {
        try {
            const files = req.files
            const url = await this.uploads3.uploadImage(files)
            const { meta_data } = req.body
            const [addThemes] = await this.connection.write.query(SQL_ADD_THEMES, [JSON.stringify(meta_data)]);
            return this.sendSuccess(res, { message: "Theme add successfully" })
        }
        catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }

    }

    async showThemes(req: any, res: any) {
        try {
            const [themeList]: any = await this.connection.write.query(SQL_GET_THEMES);
            return this.sendSuccess(res, { message: "Theme list fetched successfully", data: themeList })
        }
        catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }

    }

    async updateThemes(req: any, res: any) {
        try {
            const { meta_data } = req.body;
            const [theme]: any = await this.connection.write.query(SQL_UPDATE_THEME, [meta_data, req.params.themes_id]);
            return this.sendSuccess(res, { message: "Theme updated successfully", data: theme })
        }
        catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }

    }

    async deleteThemes(req: any, res: any) {
        try {
            const { message } = req.body;
            const [delThemes]: any = await this.connection.write.query(SQL_DELETE_THEME, [req.params.themes_id])
            return this.sendSuccess(res, { message: "Theme delete successfully" })
        }
        catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }

    }

    async findByIdThemes(req: any, res: any) {
        try {


        }
        catch (err) {
            console.log(err)
        }

    }

}


