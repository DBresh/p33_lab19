import Header from "../Header";
import DisplayMap from "../Map";
import "./fullCountry.css";
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";

function nativeLanguage(item) {
    return Object.keys(item.name.nativeName)[0];
}

function mainCurrencie(item) {
    return Object.keys(item.currencies)[0];
}

function FullCountryInfo({ country, allCountries }) {
    const [showMap, setShowMap] = useState(false);

    const toggleMap = () => {
        setShowMap(true);
    };

    const toggleInfo = () => {
        setShowMap(false);
    };

const { cca3 } = useParams();
    return (
        <>
            <Header allCountries={allCountries} langName={null}/>
            <div className="fullInfoDiv">
                <div className="bigFlagDiv">
                    {showMap ? (
                        <DisplayMap chosenCountry={country} />
                    ) : (
                        <img
                            src={country.flags.svg}
                            alt="flag svg"
                            className="bigFlag"
                        />
                    )}
                </div>
                <div className="infoDiv">
                    <p className="Caption">{country.name.common}</p>
                    <div className="infoCountry">
                        <div className="details">
                            <p>
                                Native name:{" "}
                                <span>
                                    {
                                        country.name.nativeName[
                                            nativeLanguage(country)
                                        ].common
                                    }
                                </span>
                            </p>
                            <p>
                                Population:{" "}
                                <span>
                                    {country.population === undefined
                                        ? "-"
                                        : country.population}
                                </span>
                            </p>
                            <p>
                                Region:{" "}
                                <span>
                                    {country.region === undefined
                                        ? "-"
                                        : country.region}
                                </span>
                            </p>
                            <p>
                                Sub Region:{" "}
                                <span>
                                    {country.subregion === undefined
                                        ? "-"
                                        : country.subregion}
                                </span>
                            </p>
                            <p>
                                Capital:{" "}
                                <span>
                                    {country.capital === undefined
                                        ? "-"
                                        : country.capital}
                                </span>
                            </p>
                            <p>
                                Area:{" "}
                                <span>
                                    {country.area === undefined
                                        ? "-"
                                        : country.area}
                                </span>
                            </p>
                            <div className="languages">
                                <p>
                                    Main Currencie:{" "}
                                    <span>
                                        {
                                            country.currencies[
                                                mainCurrencie(country)
                                            ].name
                                        }
                                    </span>
                                </p>
                                <p>
                                    Main Language:{" "}
                                    <Link
                                        to={`/about/${country.cca3}/${Object.keys(country.languages)[0]}`}
                                    >
                                        <button>
                                            {
                                                country.languages[
                                                    nativeLanguage(country)
                                                ]
                                            }
                                        </button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="borders">
                        <p>
                            Neighboring countries:{" "}
                            {country.borders === undefined
                                ? "-"
                                : country.borders.map((item) => (
                                      <Link key={item} to={`/about/${item}`}>
                                          <button>{item}</button>
                                      </Link>
                                  ))}
                        </p>
                    </div>
                    <div className="borders">
                        <p>
                            Languages:{" "}
                            {country.languages === undefined
                                ? "-"
                                : Object.keys(country.languages).map((item) => (
                                      <Link key={item} to={`/about/${cca3}/${item}`}>
                                          <button>{item.toUpperCase()}</button>
                                      </Link>
                                  ))}
                        </p>
                    </div>
                    <div className="buttons">
                        <Link className="goBack" to="/">
                            <button className="">To Main Page</button>
                        </Link>
                        <button className="" onClick={toggleInfo}>
                            Country Info
                        </button>
                        <button className="" onClick={toggleMap}>
                            Map
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FullCountryInfo;
