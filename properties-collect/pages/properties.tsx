import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { usePropertiesQuery } from "../src/generated/graphql";

const Properties: NextPage<{ placeId: string }> = props => {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        {
            if (window) {

                setIsBrowser(true);
            }
        }
    }, []);
    const { data } = usePropertiesQuery(
        {
            variables: {
                placeId: props.placeId,
                pageNo: 1,
            }
        }
    );
    // const {loc} = 
    if (isBrowser && data) {
        return (
            <>
                <section className="section" style={{ flexGrow: 1 }} >
                    <h5>
                        {data?.nobroker.place.placeId}<br />
                        Lat {data?.nobroker.place.geometry.location.lat}
                        Lng {data?.nobroker.place.geometry.location.lng}
                    </h5>
                    <MapContainer className="h100" center={[data?.nobroker.place.geometry.location.lat ?? 0,
                    data?.nobroker.place.geometry.location.lng ?? 0
                    ]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            data.nobroker.place.properties.map(
                                (property) => {
                                    return (
                                        <Marker
                                            key={property.shortUrl}
                                            position={
                                                [
                                                    property.latitude,
                                                    property.longitude
                                                ]
                                            }
                                        />
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