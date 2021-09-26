import "./profile.css";
import Feed from "../../components/feed/Feed";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Email, Phone } from "@material-ui/icons";
import MainLayout from "../../layouts/MainLayout";

export default function Profile() {
    const history = useHistory();
    const [adminProfile, setAdminProfile] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        axios
            .get(
                "http://localhost:8000/admin/profile/" +
                    JSON.parse(localStorage.getItem("user")).instituteId
            )
            .then((res) => {
                setAdminProfile({
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <MainLayout fullWidth={true}>
            <div className="profile">
                <div className="profile__header">
                    <div className="profile__cover">
                        <img
                            className="profile__coverImg"
                            src="assets/post/8.jpeg"
                            alt=""
                        />
                        <div className="profile__photo">
                            <div className="profile__photo--relative">
                                <img
                                    className="profile__photoImg"
                                    src="assets/person/6.jpeg"
                                    alt=""
                                />
                                <div
                                    className="profile__photo__editIcon"
                                    onClick={() =>
                                        history.push("/profile/edit")
                                    }
                                >
                                    <EditIcon />
                                    <span>Edit</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{adminProfile.name}</h4>
                    <span className="profileInfoDesc">
                        <Email fontSize="small" />
                        {adminProfile.email} | <Phone fontSize="small" />{" "}
                        {adminProfile.phone}
                    </span>
                </div>
                <div className="profileRightBottom">
                    <Feed />
                </div>
            </div>
        </MainLayout>
    );
}
