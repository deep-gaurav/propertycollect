use async_graphql::SimpleObject;
use serde::{Deserialize, Serialize};
use surf::Client;

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct NoBrokerPrediction {
    pub name: String,
    pub id: String,
    pub place_id: String,
    pub description: String,
}

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct NoBrokerPredictions {
    pub predictions: Vec<NoBrokerPrediction>,
}

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
#[graphql(complex)]
pub struct NoBrokerPlaceDetail {
    pub name: String,
    pub geometry: NoBrokerGeometry,
    pub reference: String,
    pub formatted_address: String,
    pub place_id: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ResultData<Data> {
    pub result: Data,
    pub status: String,
}

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct NoBrokerLocation {
    pub lng: f64,
    pub lat: f64,
}

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct NoBrokerGeometry {
    pub location: NoBrokerLocation,
}

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
#[serde(rename_all = "camelCase")]
pub struct NoBrokerProperty {
    rent: i64,
    balconies: Option<i64>,
    negotiable: bool,
    #[serde(rename = "type")]
    _type: String,
    deposit: i64,
    #[serde(rename = "propertySize")]
    property_size: i64,
    #[serde(rename = "shortUrl")]
    short_url: String,
    location: String,
    longitude: f64,
    latitude: f64,
    parking: Option<String>,
    id: String,
    property_title: String,
    water_supply: Option<String>,
    photo_available: bool,
    lease_type: Option<String>,
    thumbnail_image: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct NoBrokerPropertyOtherParams {
    total_count: i64,
    count: i64,
}

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
#[serde(rename_all = "camelCase")]
pub struct NoBrokerPropertiesResult {
    pub status: String,
    pub data: Vec<NoBrokerProperty>,
    pub other_params: NoBrokerPropertyOtherParams,
}

pub async fn get_predictions(
    client: &Client,
    hint: &str,
    city: &str,
) -> anyhow::Result<NoBrokerPredictions> {
    let resp = client.get(format!("https://www.nobroker.in/api/v1/localities/autocomplete/_search?hint={}&city={}&page=default",hint,city))
    .recv_json::<NoBrokerPredictions>().await.map_err(|e|anyhow::anyhow!("{:#?}",e))?;
    Ok(resp)
}

pub async fn get_place_details(
    client: &Client,
    place: &str,
) -> anyhow::Result<ResultData<NoBrokerPlaceDetail>> {
    let resp = client
        .get(format!(
            "https://www.nobroker.in/api/v1/localities/place_detail/{}/_search",
            place
        ))
        .recv_json()
        .await
        .map_err(|e| anyhow::anyhow!("{:#?}", e))?;
    Ok(resp)
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchParam {
    lat: f64,
    lon: f64,
    place_id: String,
    place_name: String,
}

pub async fn get_properties(
    client: &Client,
    page_no: i64,
    lat: f64,
    lon: f64,
    place_id: &str,
    place_name: &str,
) -> anyhow::Result<NoBrokerPropertiesResult> {
    let search_param = serde_json::to_string(&vec![SearchParam {
        lat,
        lon,
        place_id: place_id.to_string(),
        place_name: place_name.to_string(),
    }])
    .map_err(|e| anyhow::anyhow!("{:#?}", e))?;
    let search_param = base64::encode(&search_param);
    let resp = client
        .get(format!(
            "https://www.nobroker.in/api/v1/multi/property/filter?pageNo={}&searchParam={}&radius=2.0&sharedAccomodation=0",
            page_no,
            search_param,
        ))
        .recv_json()
        .await
        .map_err(|e| anyhow::anyhow!("{:#?}", e))?;
    Ok(resp)
}
