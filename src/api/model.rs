use chitin::*;
#[chitin_model]
mod model {
    use chitin::*;
    use chrono::{DateTime, Utc};
    use serde::{Deserialize, Serialize};
    use typescript_definitions::{TypeScriptify, TypeScriptifyTrait};

    #[derive(Serialize, Deserialize, TypeScriptify, Clone, Debug)]
    pub struct User {
        pub id: i64,
        pub user_name: String,
        pub energy: i64,
        pub sentence: String,

        pub hated_count: i64,
        pub followed_count: i64,
        pub hating_count: i64,
        pub following_count: i64,
    }
    #[derive(Serialize, Deserialize, TypeScriptify, Clone, Debug)]
    pub struct Party {
        pub id: i64,
        pub party_name: String,
        pub board_id: Option<i64>,
        pub board_name: Option<String>,
        pub energy: i32,
        pub ruling: bool,
        pub create_time: DateTime<Utc>,
    }
    #[derive(Serialize, Deserialize, TypeScriptify, Clone, Debug)]
    pub struct Board {
        pub id: i64,
        pub board_name: String,
        pub create_time: DateTime<Utc>,
        pub title: String,
        pub detail: String,
        pub force: String,
        pub ruling_party_id: i64,
        pub popularity: i64,
    }
    #[derive(Serialize, Deserialize, TypeScriptify, Clone, Debug)]
    pub struct BoardName {
        pub id: i64,
        pub board_name: String,
    }
    #[derive(Serialize, Deserialize, TypeScriptify, Clone, Debug)]
    pub struct NewBoard {
        pub board_name: String,
        pub title: String,
        pub detail: String,
        pub force: String,
        pub ruling_party_id: i64,
    }
    #[derive(Serialize, Deserialize, TypeScriptify, Clone, Debug)]
    pub struct ArticleMeta {
        pub id: i64,
        pub board_id: i64,
        pub board_name: String,
        pub category_id: i64,
        pub category_name: String,
        pub category_source: String,
        pub title: String,
        pub author_id: i64,
        pub author_name: String,
        pub show_in_list: bool,
        pub create_time: chrono::DateTime<chrono::Utc>,
    }
    #[derive(Serialize, Deserialize, TypeScriptify, Clone, Debug)]
    pub struct Article {
        pub meta: ArticleMeta,
        pub content: String,
    }
    #[derive(Serialize, Deserialize, TypeScriptify, Clone, Debug)]
    pub struct BoardOverview {
        pub id: i64,
        pub board_name: String,
        pub title: String,
        pub popularity: i64,
    }
    #[derive(Serialize, Deserialize, TypeScriptify, Clone, Copy, Display, Debug)]
    pub enum UserRelationKind {
        #[display(fmt = "follow")]
        Follow,
        #[display(fmt = "hate")]
        Hate,
        #[display(fmt = "openly_hate")]
        OpenlyHate,
    }
    #[derive(Serialize, Deserialize, TypeScriptify, Clone, Debug)]
    pub struct UserRelation {
        pub from_user: i64,
        pub to_user: i64,
        pub kind: UserRelationKind,
    }
}

pub use model::*;
