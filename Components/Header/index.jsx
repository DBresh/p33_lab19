import SearchInput from "../Search";
import "./index.css";
import { Link } from "react-router-dom";

function Header(allCountries) {
    return (
        <div className="header">
            <div className="ad"><Link to="/">coco jumbo ja ja je</Link></div>
            <SearchInput countries={allCountries}/>
        </div>
    );
}

export default Header;
