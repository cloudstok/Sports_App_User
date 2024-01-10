// <<<<-----------------------  user_profile Table sql query ----------------------------------------<<<<
export const SQL_CHECK_USER: string = "select * from user_profile where phone = ? limit 1";
export const SQL_INSERT_USER: string = "insert into user_profile(phone, password) values (?,?)";
export const SQL_ALL_USER: string = "select * from user_profile where is_deleted = 0 order by u_id DESC";
export const SQL_UPDATE_USER: string = "update user_profile set ? where phone = ? limit 1 ";
export const SQL_DELETE_USER: string = "update user_profile set is_deleted = 1 where u_id = ? limit 1 ";
// <<<<------------------------- themes table  sql Query  --------------------------------------------<<<<
export const SQL_ADD_THEMES: string = "INSERT INTO themes (meta_data) VALUE (?)";
export const SQL_GET_THEMES: string = "SELECT * FROM themes";
export const SQL_UPDATE_THEME: string = "UPDATE theme SET meta_data = ? WHERE themes_id = ?";
export const SQL_DELETE_THEME: string = "Delete from themes where themes_id = ?";   
// <<<<--------------------------- news Table  sql query ---------------------------------------------<<<<
export const SQL_SHOW_NEWS: string = "SELECT * from news where is_deleted = 0 limit ? offset ?";
//  <<<<-------------------------- Reels Table  sql Query ------------------------------------------<<<<
export const SQL_SHOW_REELS : string = "select * from reels where is_deleted = 1 limit ? offset ?";
// export const SQL_ADD_REELS : string = "select * from reels where reel_id = ? and is_deleted=0 limit 1";
export const SQL_UPDATE_REALS :  string = "UPDATE reels set ? where reel_id = ?";

//<<<<------------------------------series table sql --------------------------------->>>>>

export const SQL_GET_SERIES : string = "select * from series";


// <<<----------------------------team table sql------------------------------------->>>>>

export const SQL_GET_TEAM : string = "select * from team";

//<<<<---------------------------Player--------------------------------->>>>

export const SQL_GET_PLAYER : string = "select players , play , status , squad, team from cricket_match where match_key = ?";


////===================== admin =====================
export const SQL_CHECK_ADMIN: string = `select * from admin_profile where phone = ?  limit 1`;
export const SQL_INSERT_ADMIN: string = `insert into admin_profile(phone, password) values (?,?)`;
export const SQL_ALL_ADMIN: string = `select * from admin_profile`;
export const SQL_UPDATE_ADMIN: string = `update admin_profile set  password= ? where phone = ? limit 1 `;
export const SQL_DELETE_ADMIN: string = `update admin_profile set is_deleted = 1 where phone = ? limit 1 `;
export const SQL_ADD_REELS : string = `insert into reels(url ,title , sub_title) values (? , ? , ?)`;
// export const SQL_SHOW_REELS : string = `select * from reels where is_deleted = 0`;
export const SQL_INSERT_NEWS: string = `INSERT INTO news (heading, sub_heading, cover_image, created_by, url, content) values(?,?,?,?,?,?)`;
// export const SQL_SHOW_NEWS: string = `SELECT * from news where is_deleted = 0`;
export const SQL_UPDATE_NEWS: string = `UPDATE  news SET ? where news_id = ?`;
export const SQL_DELETE_NEWS:string = `DELETE from news where news_id = ?`;
export const SQL_SHOW_NEWS_BY_ID : string = `SELECT * from news where news_id = ? and is_deleted = 0`
