import SearchInput from "../Search";
import "./index.css";
import { Link } from "react-router-dom";

function Header({allCountries, langName}) {
    return (
        <div className="header">
            <div className="ad">
                <Link to="/">
                    coco jumbo ja ja je {langName === null ? "" : ` / ${langName}`}
                </Link>
            </div>
            <SearchInput countries={allCountries} />
        </div>
    );
}

export default Header;
