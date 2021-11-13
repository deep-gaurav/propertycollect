use std::convert::Infallible;

use anyhow::Result;
use async_graphql::{
    http::{playground_source, GraphQLPlaygroundConfig},
    EmptyMutation, EmptySubscription, Schema,
};
use warp::Filter;

type MySchema = Schema<propertycollect::server::schema::Query, EmptyMutation, EmptySubscription>;
#[tokio::main]
async fn main() -> Result<()> {
    let schema = Schema::new(
        propertycollect::server::schema::Query,
        EmptyMutation,
        EmptySubscription,
    );
    let filter = async_graphql_warp::graphql(schema).and_then(
        |(schema, request): (MySchema, async_graphql::Request)| async move {
            // Execute query
            let resp = schema.execute(request).await;

            // Return result
            Ok::<_, Infallible>(async_graphql_warp::Response::from(resp))
        },
    );
    let filter = warp::post().and(filter);
    let graphql_playground = warp::get().map(|| {
        warp::http::Response::builder()
            .header("content-type", "text/html")
            .body(playground_source(GraphQLPlaygroundConfig::new("/api/")))
    });
    let final_filter = graphql_playground.or(filter);
    // Convert them to a warp service (a tower service implmentation)

    // using `warp::service()`

    let warp_service = warp::service(final_filter);

    // The warp_lambda::run() function takes care of invoking the aws lambda runtime for you

    warp_lambda::run(warp_service)
        .await
        .map_err(|err| anyhow::anyhow!("An error occured `{:#?}`", err))?;
    Ok(())
}
