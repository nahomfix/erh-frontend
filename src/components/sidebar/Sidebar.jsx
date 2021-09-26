import "./sidebar.css";

import DashboardIcon from "@material-ui/icons/Dashboard";
// import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import GroupIcon from "@material-ui/icons/Group";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink, Link, useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Logo from "../../assets/erhLogo2.jpeg";
import { Home } from "@material-ui/icons";

export default function Sidebar({ isOpen, toggle }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem("user");
        history.push("/login");
    };

    return (
        <div className={`${isOpen ? "sidebar is-open" : "sidebar"}`}>
            <img src={Logo} alt="" className="sidebar__logo" />
            <div>
                <ul className="sidebarList">
                    {JSON.parse(localStorage.getItem("user"))?.role ===
                    "user" ? (
                        <>
                            <NavLink
                                as="li"
                                to="/home"
                                exact
                                className="sidebarListItem"
                                activeClassName="active"
                            >
                                <Home className="sidebarIcon" />
                                <span className="sidebarListItemText">
                                    Home
                                </span>
                            </NavLink>
                            <NavLink
                                as="li"
                                to="/profile"
                                className="sidebarListItem"
                                activeClassName="active"
                            >
                                <PersonIcon className="sidebarIcon" />
                                <span className="sidebarListItemText">
                                    Profile
                                </span>
                            </NavLink>
                        </>
                    ) : null}

                    {JSON.parse(localStorage.getItem("user"))?.role ===
                    "admin" ? (
                        <>
                            <NavLink
                                as="li"
                                to="/admin/dashboard"
                                exact
                                className="sidebarListItem"
                                activeClassName="active"
                            >
                                <DashboardIcon className="sidebarIcon" />
                                <span className="sidebarListItemText">
                                    Dashboard
                                </span>
                            </NavLink>

                            <NavLink
                                as="li"
                                to="/admin/profile"
                                className="sidebarListItem"
                                activeClassName="active"
                            >
                                <PersonIcon className="sidebarIcon" />
                                <span className="sidebarListItemText">
                                    Profile
                                </span>
                            </NavLink>
                            <li className="sidebarListItem">
                                <GroupIcon className="sidebarIcon" />
                                <span>
                                    <span
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Manage
                                    </span>
                                    <Menu
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Link
                                                className="sidebar-link"
                                                to="/admin/manage-users"
                                            >
                                                Manage Users
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link
                                                className="sidebar-link"
                                                to="/admin/manage-approvers"
                                            >
                                                Manage Approvers
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link
                                                className="sidebar-link"
                                                to="/admin/manage-externalusers"
                                            >
                                                Manage External Users
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link
                                                className="sidebar-link"
                                                to="/admin/manage-departments"
                                            >
                                                Manage Departments
                                            </Link>
                                        </MenuItem>
                                    </Menu>
                                </span>
                            </li>
                        </>
                    ) : null}

                    {JSON.parse(localStorage.getItem("user"))?.role ===
                    "superadmin" ? (
                        <>
                            <NavLink
                                as="li"
                                to="/superadmin/dashboard"
                                exact
                                className="sidebarListItem"
                                activeClassName="active"
                            >
                                <DashboardIcon className="sidebarIcon" />
                                <span className="sidebarListItemText">
                                    Dashboard
                                </span>
                            </NavLink>
                            <NavLink
                                as="li"
                                to="/superadmin/manage-admins"
                                exact
                                className="sidebarListItem"
                                activeClassName="active"
                            >
                                <GroupIcon className="sidebarIcon" />
                                <span className="sidebarListItemText">
                                    Manage Admins
                                </span>
                            </NavLink>
                        </>
                    ) : null}

                    {JSON.parse(localStorage.getItem("user"))?.role ===
                    "approver" ? (
                        <>
                            <NavLink
                                as="li"
                                to="/approver/review"
                                exact
                                className="sidebarListItem"
                                activeClassName="active"
                            >
                                <PersonIcon className="sidebarIcon" />
                                <span className="sidebarListItemText">
                                    Review
                                </span>
                            </NavLink>
                            <NavLink
                                as="li"
                                to="/approver/history"
                                exact
                                className="sidebarListItem"
                                activeClassName="active"
                            >
                                <GroupIcon className="sidebarIcon" />
                                <span className="sidebarListItemText">
                                    History
                                </span>
                            </NavLink>
                        </>
                    ) : null}

                    <li
                        style={{ cursor: "pointer" }}
                        onClick={logout}
                        className="sidebarListItem"
                    >
                        <ExitToAppIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
