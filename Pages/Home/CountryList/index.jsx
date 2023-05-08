import "./CountryList.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function CountryList({ currentCountries, allCountries }) {
    const [showDiv, setShowDiv] = useState({
        isVisible: false,
        object: null,
    });

    const handleMouseEnter = (id) => {
        setShowDiv({
            isVisible: true,
            object: currentCountries.find((item) => item.index === id),
        });
    };

    const handleMouseLeave = () => {
        setShowDiv({
            isVisible: false,
            object: null,
        });
    };

    function nativeLanguage(item){
        return Object.keys(item.name.nativeName)[0];
    }
    
    if (currentCountries.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div className="allCountriesDiv">
            <div className="allCountries">
                {currentCountries.map((item) => (
                    <Link
                        key={item.name.common}
                        onMouseEnter={() => handleMouseEnter(item.index)}
                        // onMouseLeave={handleMouseLeave}
                        to={`/about/${item.cca3}`}
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
                        Native Name: {showDiv.object.name.nativeName[nativeLanguage(showDiv.object)].common} <br />
                        Independency: {showDiv.object.independent === true ? "Independent" : "Dependent"} <br />
                        Capital: {showDiv.object.capital} <br />
                        Region: {showDiv.object.region} <br />
                        SubRegion: {showDiv.object.subregion} <br />
                        Main Language: {showDiv.object.languages[nativeLanguage(showDiv.object)]}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CountryList;
