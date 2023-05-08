import SearchInput from "../Search";
import "./index.css";
import { Link } from "react-router-dom";

function Header(allCountries) {
    return (
        <div className="header">
            <div className="ad"><Link to="/">prodam garage 0978214944</Link></div>
            <SearchInput countries={allCountries}/>
        </div>
    );
}

export default Header;
