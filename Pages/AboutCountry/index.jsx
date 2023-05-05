import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css"
import axios from "axios";
import Header from "../../Components/Header";
import FullCountryInfo from "../../Components/FullCountryInfo";

function AboutCountry() {
  const { nameCountry } = useParams();
  const [country, setCountry] = useState(null);
  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await axios(
          `https://restcountries.com/v3.1/name/${nameCountry}`
        );
        setCountry(response.data[0]);
      } catch {
        setCountry("Error");
      }
    }
    fetchCountry();
  }, [nameCountry]);

  if (!country) {
    return <div>Loading...</div>;
  }
  if (country === "Error") {
    return <div>Error.</div>;
  }

  return (
    <>
      <Header />
      <div className="buttons">
        <Link className="goBack" to="/"><button className="button_">go back</button></Link>
        <FullCountryInfo country={country}/>
      </div>
    </>
  );
}

export default AboutCountry;
