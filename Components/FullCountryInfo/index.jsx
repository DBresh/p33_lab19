import Header from "../Header";
import DisplayMap from "../Map";
import "./fullCountry.css";
import { Link } from "react-router-dom";

function nativeLanguage(item) {
    return Object.keys(item.name.nativeName)[0];
}

function mainCurrencie(item) {
    return Object.keys(item.currencies)[0];
}

// currentCountries.find((item) => item.index === id)

function FullCountryInfo({ country, allCountries }) {
    return (
        <div>
            <Header allCountries={allCountries}/>
            <div className="fullInfoDiv">
                <div className="bigFlagDiv">
                    <img
                        src={country.flags.svg}
                        alt="flag svg"
                        className="bigFlag"
                    />
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
                                    <span>
                                        {
                                            country.languages[
                                                nativeLanguage(country)
                                            ]
                                        }
                                    </span>
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
                </div>

                {/* <DisplayMap country={country} /> */}
                {/* const defaultCenter = { lat: 0, lng: 0 }; */}
            </div>
        </div>
    );
}

export default FullCountryInfo;
