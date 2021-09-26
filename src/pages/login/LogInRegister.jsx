import React, { Component } from "react";
import axios from "axios";
import "./loginregister.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Field, Form } from "formik";
import { Snackbar } from "@material-ui/core";
import Logo from "../../assets/erhLogo2.jpeg";

const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

class LoginRegister extends Component {
    // const [alertSuccess, setAlertSuccess] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            alertSuccess: false,
            errorMessage: "",
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password,
        };
        console.log(data);
    };

    componentDidMount() {
        const isAuthenticated = !!localStorage.getItem("user");
        if (isAuthenticated) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div className="login">
                <Snackbar
                    open={this.state.alertSuccess}
                    autoHideDuration={6000}
                    message={this.state.errorMessage}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                />
                <div className="login__left">
                    <img src={Logo} className="login__logo" />
                </div>
                <div className="login__right">
                    <div>
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            validationSchema={loginSchema}
                            onSubmit={(values) => {
                                console.log(values);
                                axios
                                    .post(
                                        "http://localhost:8000/api/auth/login",
                                        values
                                    )
                                    .then((res) => {
                                        console.log(res.data);
                                        localStorage.setItem(
                                            "user",
                                            JSON.stringify(res.data)
                                        );
                                        if (res.data.role === "user") {
                                            this.props.history.push(
                                                `/complete-profile`
                                            );
                                        } else if (res.data.role === "admin") {
                                            this.props.history.push(
                                                `/admin/complete-profile`
                                            );
                                        } else {
                                            this.props.history.push(`/`);
                                        }
                                    })
                                    .catch((error) => {
                                        this.setState({
                                            alertSuccess: true,
                                            errorMessage:
                                                error.response.data.message,
                                        });
                                        setTimeout(() => {
                                            this.setState({
                                                alertSuccess: false,
                                                errorMessage: "",
                                            });
                                        }, 2500);
                                    });
                            }}
                        >
                            {() => (
                                <Form className="login__form">
                                    <h3 className="mb-4">Sign In</h3>
                                    <div className="mb-3">
                                        <Field
                                            type="text"
                                            name="username"
                                            className="login__username py-2 px-4"
                                            placeholder="Username"
                                        />
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Field
                                            type="password"
                                            name="password"
                                            className="login__password py-2 px-4"
                                            placeholder="Password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <button
                                        className="login__button py-2 rounded"
                                        type="submit"
                                    >
                                        LOGIN
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginRegister;
