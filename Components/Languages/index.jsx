import axios, { all } from "axios";
import "../../App.css";
import { useEffect, useState } from "react";
import CountryList from "../../Pages/Home/CountryList";
import Pagination from "../../Components/Pagination";
import { useParams } from "react-router";

function Languages() {
    const [allCountries, setAllCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedCountry, setSortedCountry] = useState([]);
    const [countItems, setCountItems] = useState(10);
    const [flagSortAB, setflagSortAB] = useState(false);
    const [indexSort, setIndexSort] = useState(false);
    const [selectedContinent, setSelectedContinent] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [uniqueSubregionsByRegion, setUniqueSubregionsByRegion] = useState(
        []
    );
    const [languageName, setLanguageName] = useState("");

    const lastCountryIndex = currentPage * countItems;
    const firstCountryIndex = lastCountryIndex - countItems;
    const { languageCode } = useParams();
    const sortIndex = () => {
        setIndexSort(!indexSort);
        if (indexSort) {
            const tmp2 =
                sortedCountry.length !== 0 ? sortedCountry : allCountries;
            const tmp = tmp2.sort(function (a, b) {
                if (a.index < b.index) {
                    return -1;
                }
                if (a.index > b.index) {
                    return 1;
                }
                return 0;
            });
            setSortedCountry(tmp);
        } else {
            const tmp2 =
                sortedCountry.length !== 0 ? sortedCountry : allCountries;
            const tmp = tmp2.sort(function (a, b) {
                if (a.index < b.index) {
                    return 1;
                }
                if (a.index > b.index) {
                    return -1;
                }
                return 0;
            });
            setSortedCountry(tmp);
        }
    };

    const sortAlph = () => {
        setflagSortAB(!flagSortAB);
        if (flagSortAB) {
            const tmp2 =
                sortedCountry.length !== 0 ? sortedCountry : allCountries;
            const tmp = tmp2.sort(function (a, b) {
                if (a.name.common < b.name.common) {
                    return -1;
                }
                if (a.name.common > b.name.common) {
                    return 1;
                }
                return 0;
            });
            setSortedCountry(tmp);
        } else {
            const tmp2 =
                sortedCountry.length !== 0 ? sortedCountry : allCountries;
            const tmp = tmp2.sort(function (a, b) {
                if (a.name.common < b.name.common) {
                    return 1;
                }
                if (a.name.common > b.name.common) {
                    return -1;
                }
                return 0;
            });
            setSortedCountry(tmp);
        }
    };

    const handleSearch = (continent) => {
        setSelectedContinent(continent);
        setSelectedRegion("");
        setSortedCountry(
            allCountries.filter(
                (country) =>
                    String(country.continents) === String(continent.continent)
            ),
            setCurrentPage(1)
        );
    };

    const handleSearchRegion = (region) => {
        setSelectedRegion(region);
        setSortedCountry(
            allCountries.filter(
                (country) => String(country.subregion) === String(region)
            )
        );
    };

    const paginate = (page) => {
        setCurrentPage(page);
        sessionStorage.setItem("pageNum", page);
    };

    const currentCountries =
        sortedCountry.length != 0
            ? sortedCountry.slice(firstCountryIndex, lastCountryIndex)
            : allCountries.slice(firstCountryIndex, lastCountryIndex);
    const countPages =
        sortedCountry.length != 0
            ? Math.ceil(sortedCountry.length / countItems)
            : Math.ceil(allCountries.length / countItems);

    const resetFilter = () => {
        setSortedCountry(allCountries);
        setSelectedContinent("");
    };

    const ResetCountries = () => {
        const tmp = allCountries.sort(function (a, b) {
            if (a.index < b.index) {
                return -1;
            }
            if (a.index < b.index) {
                return 1;
            }
            return 0;
        });
        setAllCountries(tmp);
    };

    const resetSort = () => {
        ResetCountries();

        selectedRegion === ""
            ? handleSearch(selectedContinent)
            : handleSearchRegion(selectedRegion);

        setflagSortAB(true);
        setIndexSort(true);
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
                const sortLanguage = resultAddId.filter(
                    (item) => item.languages && item.languages[languageCode]
                );
                setLanguageName(sortLanguage[0].languages[languageCode])
                setAllCountries(sortLanguage);
            } catch {
                setAllCountries("Error");
            }
        },
        []
    );

    useEffect(() => {
        const tmp = allCountries.reduce((acc, country) => {
            const { continents, subregion } = country;
            if (acc[continents]) {
                acc[continents].add(subregion);
            } else {
                acc[continents] = new Set([subregion]);
            }
            return acc;
        }, []);
        setUniqueSubregionsByRegion(tmp);
    }, [allCountries]);
    
    console.log(languageName)

    if (allCountries.length === 0) {
        return <div>loading</div>;
    }
    return (
        <>
            <CountryList
                currentCountries={currentCountries}
                allCountries={allCountries}
                langName={languageName}
                />
            <div className="buttonsSortDiv">
                <div className="sorts">
                    <div className="buttonSort" onClick={() => sortAlph()}>
                        Sort A-UA
                    </div>
                    <div className="buttonSort" onClick={() => sortIndex()}>
                        Sort Index
                    </div>
                    <div className="buttonSort" onClick={() => resetSort()}>
                        Reset Sort
                    </div>
                </div>
                <div className="continents">
                    {Object.entries(uniqueSubregionsByRegion).map(
                        ([continent]) => (
                            <div
                                key={continent}
                                onClick={() => handleSearch({ continent })}
                                className={`${
                                    continent === selectedContinent
                                        ? "activeButton"
                                        : "buttonSort"
                                }`}
                            >
                                {continent}
                            </div>
                        )
                    )}
                    <div className="buttonSort" onClick={() => resetFilter()}>
                        Reset Filter
                    </div>
                </div>
                <div className="regionsDiv">
                    {selectedContinent != null &&
                        uniqueSubregionsByRegion[selectedContinent.continent] &&
                        Array.from(
                            uniqueSubregionsByRegion[
                                selectedContinent.continent
                            ]
                        ).map(
                            (item) =>
                                item !== undefined && (
                                    <div
                                        className={
                                            selectedRegion === item
                                                ? "buttonSort activeButton"
                                                : "buttonSort"
                                        }
                                        key={item}
                                        onClick={() => handleSearchRegion(item)}
                                    >
                                        {item}
                                    </div>
                                )
                        )}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={countPages}
                onPageChange={paginate}
            />
        </>
    );
}

export default Languages;
