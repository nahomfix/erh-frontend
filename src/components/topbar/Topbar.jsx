import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import "./topbar.css";

export default function Topbar({ toggleSidebar }) {
    return (
        <div className="topbarContainer">
            <div
                style={{ cursor: "pointer", marginRight: "auto" }}
                onClick={toggleSidebar}
            >
                <MenuIcon />
            </div>
            {JSON.parse(localStorage.getItem("user"))?.role === "user" ? (
                <div className="searchbar">
                    <SearchIcon className="searchIcon" />
                    <input className="searchInput" />
                </div>
            ) : null}
        </div>
    );
}
