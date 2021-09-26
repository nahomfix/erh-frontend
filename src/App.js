import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginRegister from "./pages/login/LogInRegister";
import ManageUsers from "./pages/manageusers/ManageUsers";
import AddUser from "./pages/manageusers/AddUser";
import EditProfile from "./pages/profile/EditProfile";
import Profile from "./pages/profile/Profile";
import CompleteProfile from "./pages/completeProfile/CompleteProfile";
import ManageDepartments from "./pages/manageusers/managedepartment";
import AddDepartment from "./pages/manageusers/AddDepartment";
import EditUser from "./pages/manageusers/EditUser";
import ManageApprovers from "./pages/manageusers/manageapprover";
import EditDepartment from "./pages/manageusers/EditDepartment";
import ManageExternalUser from "./pages/manageusers/manageexternaluser";
import AddExternalUser from "./pages/manageusers/AddExternalUser";
import EditExternalUser from "./pages/manageusers/EditExternalUser";
import Home from "./pages/home/Home";
import UserProfile from "./pages/userProfile/Profile";
import UserProfileEdit from "./pages/userProfile/EditProfile";
import Upload from "./pages/upload/Upload";
import UserCompleteProfile from "./pages/completeProfile/UserCompleteProfile";
import SuperDashboard from "./pages/dashboard/SuperDashboard";
import ManageAdmins from "./pages/manage-admins/ManageAdmins";
import AddAdmin from "./pages/manage-admins/AddAdmin";
import Review from "./pages/review/Review";
import History from "./pages/history/History";

function RootCheck() {
    const userRole = JSON.parse(localStorage.getItem("user")).role;
    if (userRole === "admin") {
        return <Redirect to="/admin/dashboard" />;
    } else if (userRole === "approver") {
        return <Redirect to="/approver/review" />;
    } else if (userRole === "superadmin") {
        return <Redirect to="/superadmin/dashboard" />;
    } else {
        return <Redirect to="/home" />;
    }
}

function App() {
    return (
        <>
            <Switch>
                <ProtectedRoute
                    exact
                    path="/admin/dashboard"
                    component={Dashboard}
                    role="admin"
                />
                <ProtectedRoute
                    exact
                    path="/admin/profile"
                    component={Profile}
                    role="admin"
                />
                <ProtectedRoute
                    path="/admin/profile/edit"
                    component={EditProfile}
                    role="admin"
                />
                <ProtectedRoute
                    exact
                    path="/admin/manage-users"
                    component={ManageUsers}
                    role="admin"
                />
                <ProtectedRoute
                    path="/admin/manage-users/add"
                    component={AddUser}
                    role="admin"
                />
                <ProtectedRoute
                    path="/admin/manage-users/edit/:id"
                    component={EditUser}
                    role="admin"
                />
                <ProtectedRoute
                    exact
                    path="/admin/manage-approvers"
                    component={ManageApprovers}
                    role="admin"
                />
                <ProtectedRoute
                    exact
                    path="/admin/manage-departments"
                    component={ManageDepartments}
                    role="admin"
                />
                <ProtectedRoute
                    path="/admin/manage-departments/add"
                    component={AddDepartment}
                    role="admin"
                />
                <ProtectedRoute
                    path="/admin/manage-departments/edit/:id"
                    component={EditDepartment}
                    role="admin"
                />
                <ProtectedRoute
                    exact
                    path="/admin/manage-externalusers"
                    component={ManageExternalUser}
                    role="admin"
                />
                <ProtectedRoute
                    path="/admin/manage-externalusers/add"
                    component={AddExternalUser}
                    role="admin"
                />
                <ProtectedRoute
                    path="/admin/manage-externalusers/edit/:id"
                    component={EditExternalUser}
                    role="admin"
                />

                {/* USER */}
                <ProtectedRoute
                    exact
                    path="/home"
                    component={Home}
                    role="user"
                />
                <ProtectedRoute
                    exact
                    path="/profile"
                    component={UserProfile}
                    role="user"
                />
                <ProtectedRoute
                    exact
                    path="/profile/edit"
                    component={UserProfileEdit}
                    role="user"
                />
                <ProtectedRoute
                    exact
                    path="/upload"
                    component={Upload}
                    role="user"
                />
                <Route
                    exact
                    path="/complete-profile"
                    component={UserCompleteProfile}
                />
                <Route
                    exact
                    path="/admin/complete-profile"
                    component={CompleteProfile}
                />
                <ProtectedRoute
                    exact
                    path="/superadmin/dashboard"
                    component={SuperDashboard}
                    role="superadmin"
                />
                <ProtectedRoute
                    exact
                    path="/superadmin/manage-admins"
                    component={ManageAdmins}
                    role="superadmin"
                />
                <ProtectedRoute
                    exact
                    path="/superadmin/manage-admins/add"
                    component={AddAdmin}
                    role="superadmin"
                />
                <ProtectedRoute
                    exact
                    path="/approver/review"
                    component={Review}
                    role="approver"
                />
                <ProtectedRoute
                    exact
                    path="/approver/history"
                    component={History}
                    role="approver"
                />

                <Route path="/login" component={LoginRegister} />
                <Route exact path="/" component={RootCheck} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    );
}

export default App;
