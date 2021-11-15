import { useApolloClient } from "@apollo/client";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { usePropertiesQuery } from "./generated/graphql";


const Properties: NextPage<{ placeId: string }> = props => {
    const [isBrowser, setIsBrowser] = useState(false);
    const [retries, setRestries] = useState(0);
    useEffect(() => {
        {
            if (window) {

                setIsBrowser(true);
            }
        }
    }, []);
    const [pageNumber, setPageNumber] = useState(1);
    const firstdata = usePropertiesQuery(
        {
            variables: {
                placeId: props.placeId,
                pageNo: 1,
            }
        }
    );
    const { data, loading, error } = usePropertiesQuery(
        {
            variables: {
                placeId: props.placeId,
                pageNo: pageNumber,
            }
        }
    );
    const [properties, setProperties] = useState(data?.nobroker.place.properties.data);

    // if(properties.length==)
    let filteredProperties = data?.nobroker.place.properties.data ?? [];
    filteredProperties = filteredProperties.filter((e) =>
        properties?.every((e2) => e2.id != e.id)
    );
    let tmpl = [
        ...properties ?? []
        ,
        ...filteredProperties,
    ];
    if (properties?.length != tmpl.length) {
        setProperties(
            tmpl
        );
    }
    if (!loading && error == null) {
        setPageNumber(pageNumber + 1);

    }
    console.log(`properties ${properties?.length}`);
    // const {loc} = 
    if (isBrowser && firstdata.data) {
        return (
            <>
                <section className="section" style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",

                }} >
                    <h5>
                        {firstdata.data?.nobroker.place.placeId}<br />
                        Lat {firstdata.data?.nobroker.place.geometry.location.lat}
                        Lng {firstdata.data?.nobroker.place.geometry.location.lng}<br />
                        Loaded {properties?.length} / {firstdata.data.nobroker.place.properties.otherParams.totalCount}
                    </h5>
                    <MapContainer style={{
                        flexGrow: 1,
                    }} className="h100" center={[firstdata.data?.nobroker.place.geometry.location.lat ?? 0,
                    firstdata.data?.nobroker.place.geometry.location.lng ?? 0
                    ]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            properties?.map(
                                (property) => {
                                    return (
                                        <Marker
                                            key={property.id}
                                            position={
                                                [
                                                    property.latitude,
                                                    property.longitude
                                                ]
                                            }
                                        >
                                            <Popup>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                    }}
                                                >
                                                    <img src={property.thumbnailImage ?? ""}
                                                        style={{
                                                            height: "50px"
                                                        }}
                                                    />
                                                    <div>
                                                        <div>{
                                                            property.propertyTitle
                                                        }
                                                        </div>
                                                        <div>
                                                            Rent {property.rent}<br />
                                                            Deposit {property.deposit}
                                                        </div>
                                                        <div>
                                                            <a href={property.shortUrl}>
                                                                Nobroker
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )
                                }
                            )
                        }
                    </MapContainer>
                </section>
            </>
        )
    } else {
        return (<div></div>)
    }
}

export default Properties;