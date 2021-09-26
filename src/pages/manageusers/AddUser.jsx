import React, { useEffect, useState } from "react";
import "./AddUser.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    Row,
    Col,
    FormGroup,
    Label,
    Form,
    Input,
    Button,
    FormFeedback,
} from "reactstrap";
import MainLayout from "../../layouts/MainLayout";
import { useFormik } from "formik";
import * as yup from "yup";
import { Snackbar } from "@material-ui/core";

const userSchema = yup.object().shape({
    username: yup
        .string()
        .matches(/(?!^\d+$)^.+$/, "Only characters are allowed in this field")
        .required("Username is required"),
    name: yup
        .string()
        .matches(/(?!^\d+$)^.+$/, "Only characters are allowed in this field")
        .required("Name is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    externalUser: yup.boolean(),
});

const AddUser = () => {
    const history = useHistory();
    const [alertSuccess, setAlertSuccess] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            name: "",
            password: "",
            confirmPassword: "",
            externalUser: false,
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            delete values["confirmPassword"];
            const data = { ...values, role: "user" };
            axios
                .post("http://localhost:8000/admin/register-user/", data, {
                    headers: {
                        "x-access-token": JSON.parse(
                            localStorage.getItem("user")
                        ).token,
                    },
                })
                .then((res) => {
                    setAlertSuccess(true);
                    formik.resetForm();
                    setTimeout(() => {
                        history.push("/admin/manage-users");
                    }, 1500);
                })
                .catch((err) => console.log(err));
        },
    });

    const { setValues } = formik;
    useEffect(() => {
        setValues({
            username: "",
            name: "",
            password: "",
            confirmPassword: "",
            externalUser: false,
        });
    }, [setValues]);

    return (
        <MainLayout>
            <Snackbar
                open={alertSuccess}
                autoHideDuration={6000}
                message="User successfully added!"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
            <Breadcrumb>
                <BreadcrumbItem
                    onClick={() => history.push("/admin/manage-users")}
                    style={{ cursor: "pointer" }}
                >
                    Manage Users
                </BreadcrumbItem>
                <BreadcrumbItem active>Add</BreadcrumbItem>
            </Breadcrumb>
            <h3>Add User</h3>
            <div className="mt-4">
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-4">
                        <Col>
                            <FormGroup>
                                <Label for="exampleEmail">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.username &&
                                        formik.touched.username
                                    }
                                />
                                <FormFeedback>
                                    {formik.errors.username}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="exampleEmail">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.name &&
                                        formik.touched.name
                                    }
                                />
                                <FormFeedback>
                                    {formik.errors.name}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <FormGroup>
                                <Label for="exampleEmail">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.password &&
                                        formik.touched.password
                                    }
                                />
                                <FormFeedback>
                                    {formik.errors.password}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Confirm Password
                                </Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.confirmPassword &&
                                        formik.touched.confirmPassword
                                    }
                                />
                                <FormFeedback>
                                    {formik.errors.confirmPassword}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="externalUser"
                                        value={formik.values.externalUser}
                                        onChange={formik.handleChange}
                                    />{" "}
                                    External User
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>

                    <div className="mt-4 d-flex justify-content-end align-items-center">
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
        </MainLayout>
    );
};

export default AddUser;
