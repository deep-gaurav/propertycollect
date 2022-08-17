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
    if (!loading && error == null && (data?.nobroker.place.properties.data.length ?? 0 > 0)) {
        setPageNumber(pageNumber + 1);

    }
    const [showFilter, setShowFilter] = useState(false);
    console.log(`properties ${properties?.length}`);
    const [maxDeposit, setMaxDeposit] = useState(Infinity);
    const [maxRent, setMaxRent] = useState(Infinity);
    const [typeFilter, setTypeFilter] = useState<Array<string>>([]);
    const [leaseTypeFilter, setLeaseTypeFilter] = useState<Array<string>>([]);

    let types_all = properties?.map((p) => p.type);
    let types_unique = types_all?.filter((item, i, ar) => ar.indexOf(item) === i);

    let lease_type_all = properties?.map((p) => p.leaseType);
    let lease_type_unique = lease_type_all?.filter((item, i, ar) => ar.indexOf(item) === i);

    let applied_filter_properties = properties;
    applied_filter_properties = applied_filter_properties?.filter
        (
            (p) => ((p.rent ?? Infinity) < maxRent)
                && ((p.deposit ?? Infinity) < maxDeposit)
        );
    if (typeFilter) {
        applied_filter_properties = applied_filter_properties?.filter
            (
                (p) => typeFilter.some(t2 => p.type == t2)
            )
    }
    if (leaseTypeFilter?.length) {
        applied_filter_properties = applied_filter_properties?.filter
            (
                (p) => leaseTypeFilter.some(t2 => p.leaseType == t2)
            )
    }
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
                        Loaded {properties?.length} / {firstdata.data.nobroker.place.properties.otherParams.totalCount} <br />
                        Filtered {applied_filter_properties?.length}
                    </h5>
                    <button className="button" onClick={() => setShowFilter(true)}>Filter</button>

                    <div className={`modal ${showFilter ? "is-active" : ""}`}>
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Filters</p>
                                <button className="delete" aria-label="close"></button>
                            </header>
                            <section className="modal-card-body">
                                <div className="field">
                                    <label className="label">Max Rent</label>
                                    <div className="control">
                                        <input className="input" type="number" placeholder={maxRent.toString()} value={maxRent}
                                            onChange={
                                                (val) => setMaxRent(parseInt(val.currentTarget.value))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Max Deposit</label>
                                    <div className="control">
                                        <input className="input" type="number" placeholder={maxDeposit.toString()} value={maxDeposit}
                                            onChange={
                                                (val) => setMaxDeposit(parseInt(val.currentTarget.value))
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="label">Property Type</label>

                                    {
                                        types_unique?.map(
                                            (type) => {
                                                let is_active = typeFilter?.includes(type!);
                                                return (
                                                    <button className={
                                                        `button ${is_active ? "is-primary" : ""}`
                                                    }
                                                        onClick={
                                                            () => {
                                                                if (!is_active) {
                                                                    setTypeFilter(
                                                                        [
                                                                            ...typeFilter,
                                                                            type!,
                                                                        ]
                                                                    )
                                                                } else {
                                                                    setTypeFilter(
                                                                        [
                                                                            ...typeFilter.filter(
                                                                                (t) => t != type
                                                                            )
                                                                        ]
                                                                    )
                                                                }
                                                            }
                                                        }

                                                    >
                                                        {type}
                                                    </button>
                                                )
                                            }
                                        )
                                    }
                                </div>
                                <div>
                                    <label className="label">Lease Type</label>

                                    {
                                        lease_type_unique?.map(
                                            (type) => {
                                                let is_active = leaseTypeFilter?.includes(type!);
                                                return (
                                                    <button className={
                                                        `button ${is_active ? "is-primary" : ""}`
                                                    }
                                                        onClick={
                                                            () => {
                                                                if (!is_active) {
                                                                    setLeaseTypeFilter(
                                                                        [
                                                                            ...typeFilter,
                                                                            type!,
                                                                        ]
                                                                    )
                                                                } else {
                                                                    setLeaseTypeFilter(
                                                                        [
                                                                            ...typeFilter.filter(
                                                                                (t) => t != type
                                                                            )
                                                                        ]
                                                                    )
                                                                }
                                                            }
                                                        }

                                                    >
                                                        {type}
                                                    </button>
                                                )
                                            }
                                        )
                                    }
                                </div>
                            </section>
                            <footer className="modal-card-foot">
                                <button className="button is-success" onClick={() => setShowFilter(false)}>Save changes</button>
                                <button className="button">Cancel</button>
                            </footer>
                        </div>
                    </div>

                    {
                        !showFilter && <MapContainer style={{
                            flexGrow: 1,
                        }} className="h100" center={[firstdata.data?.nobroker.place.geometry.location.lat ?? 0,
                        firstdata.data?.nobroker.place.geometry.location.lng ?? 0
                        ]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {
                                applied_filter_properties?.map(
                                    (property) => {
                                        return (
                                            <Marker
                                                key={property.id}
                                                position={
                                                    [
                                                        property.latitude ?? 0,
                                                        property.longitude ?? 0
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
                                                                <a href={property.shortUrl ?? "#"}>
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
                    }
                </section>
            </>
        )
    } else {
        return (<div></div>)
    }
}

export default Properties;