import React, { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

function ProtectedRoute({ component: Component, role, ...restOfProps }) {
    const history = useHistory();
    const isAuthenticated = !!localStorage.getItem("user");
    const isProfileComplete = !JSON.parse(localStorage.getItem("user"))
        ?.changeProfile;
    const userRole = JSON.parse(localStorage.getItem("user"))?.role;

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         history.push("/login");
    //     }
    // }, [isAuthenticated, history]);

    // useEffect(() => {
    //     if (!isProfileComplete) {
    //         <Redirect to="/complete-profile" />;
    //     } else {
    //         <Redirect to="/" />;
    //     }
    // }, [isProfileComplete]);

    // 3 users - approver, admin, user

    console.log({ isProfileComplete, role, userRole });

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? (
                    isProfileComplete ? (
                        role === userRole ? (
                            <Component {...props} />
                        ) : (
                            <Redirect to="/" />
                        )
                    ) : (
                        <Redirect to="/complete-profile" />
                    )
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default ProtectedRoute;
