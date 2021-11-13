use async_graphql::*;

mod nobroker;

pub struct Query;

#[Object]
impl Query {
    async fn nobroker(&self) -> nobroker::NoBroker {
        nobroker::NoBroker {
            client: surf::client(),
        }
    }
}

// pub fn create_schema()->
