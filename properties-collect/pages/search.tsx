import { NextPage } from "next";
import { useMemo, useState } from "react";
import { useSearchQuery } from "../src/generated/graphql";
import dynamic from "next/dynamic";
// import Properties from "./properties";

const Search: NextPage = props => {
    const [query, setQuery] = useState("");
    const { data } = useSearchQuery({
        variables: {
            query: query
        }
    })
    const [location, setLocation] = useState("");
    // const {activeItem,setActive} = useState(null);
    const Properties = useMemo(
        () => dynamic(
            () => import('./properties'), // replace '@components/map' with your component's location
            { ssr: false } // This line is important. It's what prevents server-side render
        ),
        [location]
    )
    return (
        <div className="h100"
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div className="field">
                <p className="control is-expanded">
                    <input className="input is-expanded" type="text" placeholder="Seach Locality"
                        onChange={
                            (val) => setQuery(val.currentTarget.value)
                        }
                    /><br />

                </p>
            </div>
            <div className={`dropdown is-expanded ${location ? "" : "is-active"}`} >
                <div className="dropdown-menu ">
                    <div className="dropdown-content ">
                        {
                            data?.nobroker?.searchCity?.predictions?.map(
                                (prediction) => {
                                    return (
                                        <a key={prediction.id} className="dropdown-item"
                                            onClick={
                                                (val) => {
                                                    setLocation(prediction.placeId)
                                                }
                                            }
                                        >

                                            {
                                                prediction.name
                                            }
                                        </a>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>

            {
                location ?
                    <Properties placeId={location} />
                    : null
            }

        </div >
    );
}

export default Search;