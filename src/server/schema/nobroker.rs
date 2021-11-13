use async_graphql::*;

use crate::services::nobroker::{
    get_place_details, get_predictions, get_properties, NoBrokerPlaceDetail, NoBrokerPredictions,
    NoBrokerProperty,
};

pub struct NoBroker {
    pub client: surf::Client,
}

#[Object]
impl NoBroker {
    async fn search_city(
        &self,
        query: String,
        city: String,
    ) -> Result<NoBrokerPredictions, async_graphql::Error> {
        let predictions = get_predictions(&self.client, &query, &city).await?;
        Ok(predictions)
    }

    async fn place(&self, place_id: String) -> Result<NoBrokerPlaceDetail, async_graphql::Error> {
        let result = get_place_details(&self.client, &place_id).await?;
        Ok(result.result)
    }

    // async fn properties(&self, )
}

#[ComplexObject]
impl NoBrokerPlaceDetail {
    async fn properties(
        &self,
        page_no: i64,
    ) -> Result<Vec<NoBrokerProperty>, async_graphql::Error> {
        let client = surf::client();
        let result = get_properties(
            &client,
            page_no,
            self.geometry.location.lng,
            self.geometry.location.lat,
            &self.place_id,
            &self.name,
        )
        .await?;
        let result = result.data;

        Ok(result)
    }
}
