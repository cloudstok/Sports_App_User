export const SQL_CHECK_ADMIN: string = `select * from admin_profile where phone = ?  limit 1`;
export const SQL_INSERT_ADMIN: string = `insert into admin_profile(phone, password) values (?,?)`;
export const SQL_ALL_ADMIN: string = `select * from admin_profile`;
export const SQL_UPDATE_ADMIN: string = `update admin_profile set  password= ? where phone = ? limit 1 `;
export const SQL_DELETE_ADMIN: string = `update admin_profile set is_deleted = 1 where phone = ? limit 1 `;
export const SQL_ADD_REELS : string = `insert into reels(url) values (?)`;
export const SQL_SHOW_REELS : string = `select * from reels where is_deleted = 0`;
export const SQL_INSERT_NEWS: string = `INSERT INTO news (heading, sub_heading, cover_image, created_by, url, content) values(?,?,?,?,?,?)`;
export const SQL_SHOW_NEWS: string = `SELECT * from news where is_deleted = 0`;
export const SQL_UPDATE_NEWS: string = `UPDATE  news SET ? where news_id = ?`;
export const SQL_DELETE_NEWS:string = `DELETE from news where news_id = ?`;
export const SQL_SHOW_NEWS_BY_ID : string = `SELECT * from news where news_id = ? and is_deleted = 0`
