import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
    Form,
} from "reactstrap";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";
import * as yup from "yup";
import { useFormik } from "formik";
import { Snackbar } from "@material-ui/core";

const userSchema = yup.object().shape({
    username: yup
        .string()
        .matches(/(?!^\d+$)^.+$/, "Only characters are allowed in this field")
        .required("Username is required"),
    password: yup.string(),
});

function EditExternalUser() {
    const history = useHistory();
    const { id } = useParams();
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [name, setName] = useState("");

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            let data;
            if (values.password) {
                data = { ...values };
            } else {
                data = { username: values.username };
            }
            axios
                .put(`http://localhost:8000/admin/edit-user/${id}`, data, {
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
                        history.push("/manage-externalusers");
                    }, 1500);
                })
                .catch((err) => console.log(err));
        },
    });

    const { setValues } = formik;
    useEffect(() => {
        axios
            .get("http://localhost:8000/admin/user-list/" + id, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                setValues({
                    username: res.data.username,
                    password: "",
                });
                setName(res.data.name);
            })
            .catch((err) => {
                console.log(" Error ");
            });

        // eslint-disable-next-line
    }, [id, setValues]);

    return (
        <MainLayout>
            <Snackbar
                open={alertSuccess}
                autoHideDuration={6000}
                message="User successfully updated!"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
            <Breadcrumb>
                <BreadcrumbItem
                    onClick={() => history.push("/manage-users")}
                    style={{ cursor: "pointer" }}
                >
                    Manage Users
                </BreadcrumbItem>
                <BreadcrumbItem active>Edit</BreadcrumbItem>
            </Breadcrumb>
            <h3>Edit External User - {name}</h3>
            <div className="mt-4">
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
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
                                <Label for="exampleEmail">New Password</Label>
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
                    </Row>
                    <div className="mt-4 d-flex justify-content-end">
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
        </MainLayout>
    );
}

export default EditExternalUser;
