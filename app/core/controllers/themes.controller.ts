import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../utilities/response-interceptor";
import { uploads3 } from "../../core/aws/uploads3";

export class ThemeController extends ResponseInterceptor {
    public connection : connection
    public uploads3 : uploads3
    SQL_ADD_THEMES: string = "INSERT INTO themes (meta_data) VALUE (?)" ;
    SQL_GET_THEMES: string = "SELECT * FROM themes";
    SQL_UPDATE_THEME: string = "UPDATE theme SET meta_data = ? WHERE themes_id = ?";
    SQL_DELETE_THEME: string = "Delete from themes where themes_id = ?";
    constructor() {
        super()
        this.connection = new connection()
        this.uploads3 = new uploads3()
    }

    async addThemes(req: any, res: any) {
        try {
            const files = req.files
            const url =  await this.uploads3.uploadImage(files)
            console.log(url)
            const  {meta_data} = req.body
            const [addThemes] = await this.connection.write.query(this.SQL_ADD_THEMES, [JSON.stringify(meta_data)]);
            return this.sendSuccess(res, {message: "Theme add successfully"})
        }
        catch (err) {
            console.log(err)
            this.sendBadRequest(res, "Something went wrong")
        }

    }

    async showThemes(req: any, res: any) {
        try {
            const [themeList]: any = await this.connection.write.query(this.SQL_GET_THEMES);
            return this.sendSuccess(res, {message: "Theme list fetched successfully", data: themeList})
        }
        catch (err) {
            console.log(err)
             this.sendBadRequest(res, "Something went wrong")
        }

    }

    async updateThemes(req: any, res: any) {
        try {
            const { meta_data } = req.body;
            const [theme]: any = await this.connection.write.query(this.SQL_UPDATE_THEME, [meta_data, req.params.themes_id]);
            return this.sendSuccess(res, { message: "Theme updated successfully", data: theme})
        }
        catch (err) {
            console.log(err)
            this.sendBadRequest(res, "Something went wrong")
        }

    }

    async deleteThemes(req: any, res: any) {
        try {
            const {message} = req.body;
            const [delThemes]: any = await this.connection.write.query(this.SQL_DELETE_THEME, [req.params.themes_id])
            return this.sendSuccess(res, { message: "Theme delete successfully"} )
        }
        catch (err) {
            console.log(err)
            this.sendBadRequest(res, "Something went wrong")
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


