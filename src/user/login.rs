use diesel::pg::PgConnection;
use diesel::prelude::*;
use crate::db::models::User;
use crate::db::schema;
use crate::custom_error::Error;

pub fn login(conn: &PgConnection, id: &str, password: &str) -> Result<(), Error> {
    // TODO: 對 SQL 查詢的錯誤做分類
    let user = schema::users::table
        .find(id)
        .first::<User>(conn)
        .map_err(|_| Error::LogicError("找不到 ID".to_string(), 401))?;

    let equal = argon2::verify_raw(
        password.as_bytes(),
        &user.salt,
        &user.password_hashed,
        &argon2::Config::default(),
    )
    .unwrap();

    match equal {
        true => Ok(()),
        false => Err(Error::LogicError("密碼錯誤".to_string(), 401)),
    }
}