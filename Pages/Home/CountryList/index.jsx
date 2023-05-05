import "./CountryList.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function CountryList({ allCountries }) {
    const [showDiv, setShowDiv] = useState({
        isVisible: false,
        object: null,
    });

    const handleMouseEnter = (id) => {
        setShowDiv({
            isVisible: true,
            object: allCountries.find((item) => item.index === id),
        });
    };

    const handleMouseLeave = () => {
        setShowDiv({
            isVisible: false,
            object: null,
        });
    };

    if (allCountries.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div className="allCountriesDiv">
            <div className="allCountries">
                {allCountries.map((item) => (
                    <Link
                        key={item.name.common}
                        onMouseEnter={() => handleMouseEnter(item.index)}
                        // onMouseLeave={handleMouseLeave}
                        to={`/about/${item.name.common}`}
                    >
                        <div className="country">
                            <div className="flagDiv">
                                <img
                                    src={item.flags.png}
                                    className="flag"
                                    alt="flag png"
                                />
                            </div>
                            <div className="nameDiv">
                                <div className="nameCountry">
                                    {item.name.common}
                                </div>
                                <div className="indexCountry">
                                    index: {item.index}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {showDiv.isVisible && (
                <div className="moreInfoDiv">
                    <div className="flagCaptionDiv">
                        <div>
                            <img
                                className="moreInfoFlag"
                                src={showDiv.object.flags.svg}
                                alt="flag svg"
                            />
                        </div>
                        <div className="moreInfoCaption">
                            {showDiv.object.name.common}
                        </div>
                    </div>
                    <div className="info">
                        Native Name: {showDiv.object.name.official} <br />
                        Independency: {showDiv.object.independent === true ? "Independent" : "Dependent"} <br />
                        Capital: {showDiv.object.capital} <br />
                        Region: {showDiv.object.region} <br />
                        SubRegion: {showDiv.object.subregion}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CountryList;
