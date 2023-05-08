import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import axios from "axios";
import Header from "../../Components/Header";
import FullCountryInfo from "../../Components/FullCountryInfo";

function AboutCountry() {
    const [allCountries, setAllCountries] = useState([]);
    const { cca3 } = useParams()
    const country = allCountries.find((item) => item.cca3 === cca3)
    
    useEffect(
        () => async () => {
            try {
                const result = await axios(
                    "https://restcountries.com/v3.1/all"
                );

                const resultAddId = result.data.map((item, ind) => {
                    return { ...item, index: ind + 1 };
                });

                setAllCountries(resultAddId);
            } catch {
                setAllCountries("Error");
            }
        },
        []
        );
    if (!country) {
        return <div>Loading...</div>;
    }
    if (country === "Error") {
        return <div>Error.</div>;
    }

    return (
        <>
            <FullCountryInfo country={country} allCountries={allCountries} />
        </>
    );
}

export default AboutCountry;
