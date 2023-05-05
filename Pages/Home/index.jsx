import axios from "axios";
import "../../App.css";
import { useEffect, useState } from "react";
import CountryList from "./CountryList";
import Pagination from "../../Components/Pagination";
import Header from "../../Components/Header";

function Home() {
    const [allCountries, setAllCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(
        Number(sessionStorage.getItem("pageNum"))
    );
    const [countItems, setCountItems] = useState(10);

    const countPages = allCountries.length / countItems;

    const lastCountryIndex = currentPage * countItems;
    const firstCountryIndex = lastCountryIndex - countItems;
    const currentCountry = allCountries.slice(
        firstCountryIndex,
        lastCountryIndex
    );

    const paginate = (page) => {
        setCurrentPage(page);
        sessionStorage.setItem("pageNum", page);
    };

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
        console.log(allCountries)
        return (
            <>
            <Header />
            <CountryList allCountries={currentCountry} />
            <Pagination
                currentPage={currentPage}
                totalPages={countPages}
                onPageChange={paginate}
            />
        </>
    );
}

export default Home;
