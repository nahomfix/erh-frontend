import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
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

const departmentSchema = yup.object().shape({
    name: yup
        .string()
        .matches(/(?!^\d+$)^.+$/, "Only characters are allowed in this field")
        .required("Name is required"),
});

const EditDepartment = () => {
    const history = useHistory();
    const [alertSuccess, setAlertSuccess] = useState(false);
    const { id } = useParams();

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: departmentSchema,
        onSubmit: (values) => {
            console.log(values);
            const data = { ...values };
            axios
                .put(
                    `http://localhost:8000/department/edit-department/${id}`,
                    data,
                    {
                        headers: {
                            "x-access-token": JSON.parse(
                                localStorage.getItem("user")
                            ).token,
                        },
                    }
                )
                .then((res) => {
                    setAlertSuccess(true);
                    formik.resetForm();
                    setTimeout(() => {
                        history.push("/admin/manage-departments");
                    }, 1500);
                })
                .catch((err) => console.log(err));
        },
    });

    const { setValues } = formik;
    useEffect(() => {
        axios
            .get(`http://localhost:8000/department/department-list/${id}`, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                setValues({
                    name: res.data.name,
                });
            })
            .catch((err) => {
                console.log(" Error ");
            });
    }, [setValues, id]);

    return (
        <MainLayout>
            <Snackbar
                open={alertSuccess}
                autoHideDuration={6000}
                message="Department successfully updated!"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
            <Breadcrumb>
                <BreadcrumbItem
                    onClick={() => history.push("/admin/manage-departments")}
                    style={{ cursor: "pointer" }}
                >
                    Manage Departments
                </BreadcrumbItem>
                <BreadcrumbItem active>Add</BreadcrumbItem>
            </Breadcrumb>
            <h3>Edit Department</h3>
            <div className="mt-4">
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
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

                    <div className="mt-4 d-flex justify-content-end">
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
        </MainLayout>
    );
};

export default EditDepartment;
