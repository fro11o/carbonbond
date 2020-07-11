#[macro_use]
extern crate derive_more;

#[path = "src/config/config.rs"]
mod config;
#[path = "src/custom_error.rs"]
mod custom_error;
#[path = "src/api/model.rs"]
mod model;
#[path = "src/api/query.rs"]
mod query;
use chitin::{ChitinCodegen, CodegenOption};
use query::RootQuery;
use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    // build server chitin
    let mut server_file = File::create("src/api/api_trait.rs")?;
    server_file.write_all(b"use async_trait::async_trait;\n")?;
    server_file.write_all(b"use crate::api::query::*;\n")?;
    server_file.write_all(b"use serde_json::error::Error;\n")?;
    server_file.write_all(
        RootQuery::codegen(&CodegenOption::Server {
            error: "crate::custom_error::Error",
            context: "&crate::Ctx",
        })
        .as_bytes(),
    )?;

    // build frontend chitin
    let mut client_file = File::create("frontend/src/ts/api/api_trait.ts")?;
    client_file.write_all(b"export type Option<T> = T | undefined | null;\n")?;
    client_file.write_all(
        b"export type Result<T, E> = {
    'Ok': T
} | {
    'Err': E
};\n",
    )?;
    client_file.write_all(model::gen_typescript().as_bytes())?;
    client_file
        .write_all(RootQuery::codegen(&CodegenOption::Client { error: "any" }).as_bytes())?;
    // set database url
    let conf = config::load_config(&None).unwrap();
    println!("cargo:rustc-env=DATABASE_URL={}", conf.database.get_url());

    Ok(())
}
