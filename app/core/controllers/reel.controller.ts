import { ResponseInterceptor } from '../../core/utilities/response-interceptor';
import { connection } from '../../config/dbConf';
import { uploads3 } from '../../core/aws/uploads3';
import { SQL_ADD_REELS } from '../query/query';
import { reelLike } from './reel.like.controller'
import { reelComments } from './reel.comments.controller'

const addReel = "INSERT INTO reels set ?"
const updateReel = "UPDATE reels set ? where reel_id = ?"
const getAllReel = "select * from reels where is_deleted = 1 limit ? offset ?"
const getReelByReelId = "SELECT * FROM reels where reel_id = ?"
const getReelById = "SELECT * FROM reels where like_id = ?"
const DeleteReel = "DELETE FROM reels WHERE like_id = ?"

export class reel extends ResponseInterceptor {
    connection: connection
    upload: uploads3
    reelComments: reelComments
    reelLike: reelLike
    constructor() {
        super();
        this.connection = new connection()
        this.upload = new uploads3();
        this.reelComments = new reelComments()
        this.reelLike = new reelLike()
    }
    async addReels(data: {}) {
        try {
            await this.connection.write.query(addReel, [data])
            return true
        } catch (err) {
            console.error(err);
            return err
        }

    }
    async updateReel(data: { data: {}, reel_id: number }) {
        try {
            await this.connection.write.query(updateReel, [data.data, data.reel_id]);
            return true
        } catch (err) {
            console.log(err)
        }
    }
    async getAllReels(limit, offset, phone) {
        try {

            const [showsReel]: any = await this.connection.write.query(getAllReel, [+limit, +offset]);
            for (let x of showsReel) {
                let likeCount: any = await this.reelLike.getLikeByReelId(x.reel_id)
                let comment: any = await this.reelComments.getCommentByReelId(x.reel_id)
                if (phone) {
                    let check = likeCount.find(e => e.phone == phone)
                    if (check) {
                        x.likeStatus = "like"
                        x.like_id =  check.like_id
                    }
                }

                x.likeCount = likeCount.length
                x.commentCount = comment.length

            }

            return showsReel
        }
        catch (err) {
            return false
        }
    }
    async getReelById(reel_id: number) {
        try {
            const [showsReel]: any = await this.connection.write.query(getReelByReelId, [reel_id]);
            return { data: showsReel[0] }
        }
        catch (err) {
            return false
        }
    }

    // usering admin
    async getAllReel(req: any, res: any) {
        try {

            const { limit, offset } = req.query
          let data
            if(res.locals.auth){
                const { phone } = res?.locals?.auth?.user
                phone ? phone : false 
                data = await this.getAllReels(limit, offset, phone)
            }
            data = await this.getAllReels(limit, offset, false)
            return this.sendSuccess(res, { data: Object.values(data) })
        }
        catch (err) {
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }




    // -----------admin----------------------
    async addReelToTable(req: any, res: any) {
        try {
            const { title, sub_title } = req.body
            let url = '';
            if (req.files && req.files.length > 0) {
                let imageUrl = await this.upload.uploadImage(req.files)
                url = imageUrl.Location
            }
            await this.addReels({ url, title, sub_title })
            return this.sendSuccess(res, { msg: "Reels added Successfully" })

        }
        catch (err) {
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }







}