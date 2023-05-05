import "./index.css";

function FullCountryInfo({ country }) {
    return (
        <div className="fullInfo">
            <div className="flagDiv">
                <div>
                    <img src={country.flags.svg} alt="flag svg" />
                </div>
            </div>
            <div className="infoDiv">
                <div>Native Name: {country.name.official}</div>
                <div>
                    Independency:{" "}
                    {country.independent === true ? "Independent" : "Dependent"}
                </div>
                <div>Capital: {country.capital}</div>
                <div>Region: {country.region}</div>
                <div>SubRegion: {country.subregion}</div>
                <div>Population: {country.population}</div>
                <div>Time zone: {country.timezones[0]}</div>
            </div>
        </div>
    );
}

export default FullCountryInfo;
