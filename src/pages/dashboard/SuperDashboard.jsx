import "./dashboard.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Bar from "../../components/charts/bar";
import Pie from "../../components/charts/Pie";
import { FcApproval } from "react-icons/fc";
import { FcCollaboration } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import MainLayout from "../../layouts/MainLayout";
const SuperDashboard = () => {
    const [totalApprovers, setTotalApprovers] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    // const [totalPosts, setTotalPosts] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:8000/admin/total-user/", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                setTotalUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8000/admin/total-approver/", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                setTotalApprovers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // useEffect(() => {
    //     axios
    //         .get(
    //             "http://localhost:8000/admin/total-post/" +
    //                 JSON.parse(localStorage.getItem("user")).adminId,
    //             {
    //                 headers: {
    //                     "x-access-token": JSON.parse(
    //                         localStorage.getItem("user")
    //                     ).token,
    //                 },
    //             }
    //         )
    //         .then((res) => {
    //             setTotalPosts(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    return (
        <MainLayout>
            <div className="dashboard">
                {/* <div className="main__title">
                    <img src={WelcomeImg} alt="Welcome Image" />
                    <div className="main__greeting">
                        <h1>Welcome</h1>
                        <p>Welcome to dashboard</p>
                    </div>
                </div> */}

                <div className="dashboard__stats">
                    <div className="stat__card">
                        <FcApproval size="60px" />
                        <p className="text-primary-p">Number of Admins</p>
                        <span className="font-bold text-title">
                            {totalApprovers}
                        </span>
                    </div>
                    <div className="stat__card">
                        <FcConferenceCall size="60px" />
                        <p className="text-primary-p">Number of users</p>
                        <span className="font-bold text-title">
                            {totalUsers}
                        </span>
                    </div>
                    <div className="stat__card">
                        <FcCollaboration size="60px" />
                        <p className="text-primary-p">Number of posts</p>
                        <span className="font-bold text-title">0</span>
                    </div>
                </div>

                <div className="charts">
                    <div className="charts__card charts__left">
                        <div>
                            <h3>Daily reports</h3>
                        </div>
                        <Pie />
                    </div>

                    <div className="charts__card charts__right">
                        <div>
                            <h3>Daily reports</h3>
                        </div>
                        <Bar totalUsers={totalUsers} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
export default SuperDashboard;
