use super::get_pool;
use crate::api::model::SignupInvitation;
use crate::custom_error::{DataType, Error, ErrorCode, Fallible};

pub async fn query_signup_invitation(from_user: i64) -> Fallible<Vec<SignupInvitation>> {
    let pool = get_pool();
    let tickets: Vec<SignupInvitation> = sqlx::query_as!(
        SignupInvitation,
        r#"
		SELECT * FROM signup_invitations
		WHERE signup_invitations.from_user = $1;"#,
        from_user
    )
    .fetch_all(pool)
    .await?;
    Ok(tickets)
}

pub async fn activate_signup_invitation(signup_invitation_id: i64) -> Fallible {
    let pool = get_pool();
    // step 1. if code === NULL, generate code
    // step 2. update last_activate_time to current time
    Ok(())
}

pub async fn deactivate_signup_invitation(signup_invitation_id: i64) -> Fallible {
    let pool = get_pool();
    // TODO
    Ok(())
}
