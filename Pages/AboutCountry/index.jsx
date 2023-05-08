import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import axios from "axios";
import Header from "../../Components/Header";
import FullCountryInfo from "../../Components/FullCountryInfo";

function AboutCountry() {
    const { cca3 } = useParams();
    const [country, setCountry] = useState(null);
    useEffect(() => {
        async function fetchCountry() {
            try {
                const response = await axios(
                    `https://restcountries.com/v3.1/alpha/${cca3}`
                );
                setCountry(response.data[0]);
            } catch {
                setCountry("Error");
            }
        }
        fetchCountry();
    }, [cca3]);

    if (!country) {
        return <div>Loading...</div>;
    }
    if (country === "Error") {
        return <div>Error.</div>;
    }

    return (
        <>
            <FullCountryInfo country={country} />
            <Link className="goBack" to="/">
                <button className="button_">go back</button>
            </Link>
        </>
    );
}

export default AboutCountry;
