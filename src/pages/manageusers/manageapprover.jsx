import "./manageapprover.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    Card,
    CardHeader,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    FormFeedback,
    Button as BootstrapButton,
} from "reactstrap";
import MainLayout from "../../layouts/MainLayout";
import * as yup from "yup";
import { useFormik } from "formik";
import { Snackbar, Button } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const approverSchema = yup.object().shape({
    username: yup
        .string()
        .matches(/(?!^\d+$)^.+$/, "Only characters are allowed in this field")
        .required("Username is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    department: yup.string().required("Department is required"),
});

export default function ManageApprovers() {
    const [departments, setDepartments] = useState([]);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [approverToDelete, setApproverToDelete] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/department/department-list", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                console.log(res.data);
                setDepartments(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const toggleDelete = (id = "") => {
        setDeleteModal(!deleteModal);
        setApproverToDelete(id);
    };

    const deleteApprover = (id) => {
        console.log(id);
        axios
            .delete("http://localhost:8000/admin/delete-approver/" + id, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                axios
                    .get("http://localhost:8000/department/department-list", {
                        headers: {
                            "x-access-token": JSON.parse(
                                localStorage.getItem("user")
                            ).token,
                        },
                    })
                    .then((res) => {
                        setDepartments(res.data);
                        setDeleteModal(false);
                    })
                    .catch((err) => {
                        console.log(" Error ");
                    });
            })
            .catch((err) => {
                console.log("Error form deleteClick");
            });
    };

    const approversList = departments[0]?.approvers.length ? (
        departments.map((department) => {
            if (department.approvers.length) {
                return department.approvers.map((approver) => {
                    return (
                        <tr key={approver._id}>
                            <td>{approver.username}</td>
                            <td>{department.name}</td>
                            <td>
                                <IconButton
                                    type="button"
                                    color="secondary"
                                    onClick={() => toggleDelete(approver._id)}
                                >
                                    <Delete />
                                </IconButton>
                            </td>
                        </tr>
                    );
                });
            } else {
                return null;
            }
        })
    ) : (
        <tr className="text-center">
            <td colSpan={3}>No Approvers found</td>
        </tr>
    );

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            department: "",
        },
        validationSchema: approverSchema,
        onSubmit: (values) => {
            delete values["confirmPassword"];
            const data = { ...values, role: "approver", name: values.username };
            console.log(data);
            axios
                .post("http://localhost:8000/admin/register-approver/", data, {
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
                        setAlertSuccess(false);
                    }, 1500);
                    axios
                        .get(
                            "http://localhost:8000/department/department-list",
                            {
                                headers: {
                                    "x-access-token": JSON.parse(
                                        localStorage.getItem("user")
                                    ).token,
                                },
                            }
                        )
                        .then((res) => {
                            setDepartments(res.data);
                            setDeleteModal(false);
                        })
                        .catch((err) => {
                            console.log(" Error ");
                        });
                })
                .catch((err) => console.log(err));
        },
    });

    return (
        <MainLayout>
            <Modal isOpen={deleteModal} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this user?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleDelete}>
                        Cancel
                    </Button>{" "}
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => deleteApprover(approverToDelete)}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>

            <Snackbar
                open={alertSuccess}
                autoHideDuration={6000}
                message="Approver successfully added!"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />

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
                                <Label for="deparmentSelector">
                                    Department
                                </Label>
                                <Input
                                    type="select"
                                    name="department"
                                    id="deparmentSelector"
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.department &&
                                        formik.touched.department
                                    }
                                >
                                    <option value="">
                                        Select the department of the approver
                                    </option>
                                    {departments.map((department) =>
                                        department.approvers.length < 3 ? (
                                            <option
                                                key={department._id}
                                                value={department._id}
                                            >
                                                {department.name}
                                            </option>
                                        ) : null
                                    )}
                                </Input>
                                <FormFeedback>
                                    {formik.errors.department}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
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

                    <div className="mt-4 d-flex justify-content-end align-items-center">
                        <BootstrapButton type="submit">Submit</BootstrapButton>
                    </div>
                </Form>
            </div>

            <div className="mt-5">
                <Card>
                    <CardHeader>Approvers</CardHeader>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{approversList}</tbody>
                    </Table>
                </Card>
            </div>
        </MainLayout>
    );
}
