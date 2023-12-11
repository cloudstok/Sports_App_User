import { ResponseInterceptor } from '../../core/utilities/response-interceptor';
import { connection } from '../../config/dbConf';
import { uploads3 } from '../../core/aws/uploads3';
// import { SQL_ADD_REELS, SQL_SHOW_REELS } from '../query/query';
import { SQL_ADD_REELS, SQL_SHOW_NEWS, SQL_SHOW_REELS, SQL_UPDATE_REALS } from '../query/query';
import { count } from 'console';


export class reel extends ResponseInterceptor {
    connection: connection
    upload: uploads3
    constructor() {
        super();
        this.connection = new connection()
        this.upload = new uploads3();
    }

    async updateMetaData(data: {}, id: number) {
        try {
            await this.connection.write.query(SQL_UPDATE_REALS, [data, id]);
            return true
        } catch (err) {
            console.log(err)
        }
    }
    async findMetaData(id: number) {
        try {
            const [metaData] = await this.connection.write.query(SQL_ADD_REELS, [id]);
            return metaData[0]
        } catch (err) {
            console.log(err)
        }
    }

    async showReel(req: any, res: any) {
        try {
            let { PageLimit, PageOffset } = req.query
            let userId = res.locals.auth.user?.user_id
            const [showsReel]: any = await this.connection.write.query(SQL_SHOW_REELS, [+PageLimit, +PageOffset]);
            for (let x of showsReel) {
                if (x?.like_data) {
                    x.likeCount = (x?.like_data?.filter(e => e.status === "like")).length
                } else {
                    x.likeCount = 0
                }
                if (x.comments_data) {
                    x.commentount = x?.comments_data?.length
                } else {
                    x.commentount = 0
                }
                delete x.like_data
                delete x.comments_data
            }
            return this.sendSuccess(res, { data: showsReel })
        }
        catch (err) {
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }

    async updateLikeReel(req: any, res: any) {
        try {
            const { status, reel_id, user_id } = req.query
            const reel = "SELECT like_data FROM sport_app.reels where reel_id = ?"
            const updateReeel = "update reels set like_data  = ? where reel_id = ?"
            const [showsReel] = await this.connection.read.query(reel, [+reel_id]);
            let likeCount = 0;
            let disLikeCount = 0;
            if (showsReel[0]?.like_data) {
                for (let x of showsReel[0].like_data) {
                    if (x.status === "like") {
                        likeCount++
                    }
                    if (x.status === "dislike") {
                        disLikeCount++
                    }
                }
            }
            delete req.query.reel_id
            if (showsReel[0].like_data === null) {
                req.query.like_id = 1
                if (status === 'like') {
                    likeCount++
                }
                if (status === 'dislike') {
                    disLikeCount++
                }
                await this.connection.read.query(updateReeel, [JSON.stringify([req.query]), +reel_id]);
            } else {
                let dataLike = showsReel[0].like_data.find(e => e.user_id === user_id)
                if (dataLike) {
                    if (dataLike.status !== status) {
                        status === "like" ? likeCount++ : likeCount--;
                        status === 'dislike' ? disLikeCount++ : disLikeCount--;
                    }
                    Object.assign(dataLike, req.query)
                    await this.connection.read.query(updateReeel, [JSON.stringify(showsReel[0].like_data), +reel_id]);
                } else {
                    req.query.like_id = showsReel[0].like_data.length + 1
                    showsReel[0].like_data.push(req.query)
                    status === "like" ? likeCount++ : likeCount;
                    status === "dislike" ? disLikeCount++ : disLikeCount;
                    await this.connection.read.query(updateReeel, [JSON.stringify(showsReel[0].like_data), +reel_id]);
                }
            }

            return this.sendSuccess(res, { likeCount, disLikeCount })
        }
        catch (err) {
            console.log(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }
    // comment reeel
    async updateCommentReel(req: any, res: any) {
        try {
            const { comment, reel_id, user_id } = req.query
            const reel = "SELECT comments_data FROM sport_app.reels where reel_id = ?"
            const updateReeel = "update reels set comments_data  = ? where reel_id = ?"
            const [showsReel] = await this.connection.read.query(reel, [+reel_id]);
            delete req.query.reel_id
            if (showsReel[0].comments_data === null) {
                req.query.like_id = 1
                await this.connection.read.query(updateReeel, [JSON.stringify([req.query]), +reel_id]);
            } else {
                req.query.like_id = showsReel[0].comments_data.length + 1
                showsReel[0].comments_data.push(req.query)
                await this.connection.read.query(updateReeel, [JSON.stringify(showsReel[0].comments_data), +reel_id]);
            }
            return this.sendSuccess(res, { showsReel })
        }
        catch (err) {
            console.log(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }

    // -----------admin----------------------
    async addReel(req: any, res: any) {
        try {
            const { title, sub_title } = req.body
            let url = '';
            if (req.files && req.files.length > 0) {
                let imageUrl = await this.upload.uploadImage(req.files)
                url = imageUrl.Location
            }
            const [addingReel]: any = await this.connection.write.query(SQL_ADD_REELS, [url, title, sub_title])
            return this.sendSuccess(res, { msg: "Reels added Successfully" })

        }
        catch (err) {
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }

    async showReels(req: any, res: any) {
        try {
            const { PageLimit, PageOffset } = req.query
            const [showsReel]: any = await this.connection.read.query(SQL_SHOW_REELS, [+PageLimit, +PageOffset]);
            for (let x of showsReel) {
                if (x?.like_data) {
                    x.likeCount = (x?.like_data?.filter(e => e.status === "like")).length
                } else {
                    x.likeCount = 0
                }
                if (x.comments_data) {
                    x.commentount = x?.comments_data?.length
                } else {
                    x.commentount = 0
                }
                delete x.like_data
                delete x.comments_data
            }
            return this.sendSuccess(res, { data: showsReel })
        }
        catch (err) {
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }


    //
    async deleteReel(req: any, res: any) {
        try {
            const [showsReel] = await this.connection.read.query("UPDATE reels SET is_deleted = 0 WHERE reel_id = ?"
                , [req.query.reel_id]);
            return this.sendSuccess(res, { data: "delete Reel successfully" })
        }
        catch (err) {
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }






}