import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { CameraAlt } from "@material-ui/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import "yup-phone";
import "./EditProfile.css";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";

const profileSchema = yup.object().shape({
    name: yup
        .string()
        .matches(/(?!^\d+$)^.+$/, "Only characters are allowed in this field")
        .required("Name is required"),
    email: yup
        .string()
        .email("Email must be a valid address")
        .required("Email is required"),
    phone: yup.string().phone("ET", true).required("Phone is required"),
});

function EditProfile() {
    const history = useHistory();
    const [coverPhoto, setCoverPhoto] = useState("/assets/post/8.jpeg");
    const [profilePhoto, setProfilePhoto] = useState("/assets/person/6.jpeg");

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            console.log(values);
            const data = {
                ...values,
                under: "",
                profilepicture: "",
                address: "",
            };
            axios
                .put(
                    "http://localhost:8000/admin/updateProfile/" +
                        JSON.parse(localStorage.getItem("user")).instituteId,
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
                    console.log("Success", res.data);
                    history.push("/profile");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    const { setValues } = formik;
    useEffect(() => {
        axios
            .get(
                "http://localhost:8000/admin/profile/" +
                    JSON.parse(localStorage.getItem("user")).instituteId
            )
            .then((res) => {
                setValues({
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [setValues]);

    return (
        <MainLayout>
            <Breadcrumb>
                <BreadcrumbItem
                    onClick={() => history.push("/profile")}
                    style={{ cursor: "pointer" }}
                >
                    Profile
                </BreadcrumbItem>
                <BreadcrumbItem active>Edit</BreadcrumbItem>
            </Breadcrumb>
            <h3>Edit Profile</h3>
            <div className="mt-4">
                <div className="cover">
                    <div className="cover__section">
                        <img src={coverPhoto} alt="" className="cover__img" />
                        <div className="cover__img__cam">
                            <label htmlFor="upload-cover">
                                <CameraAlt style={{ cursor: "pointer" }} />
                            </label>
                            <input
                                type="file"
                                name="photo"
                                id="upload-cover"
                                onChange={(e) =>
                                    setCoverPhoto(
                                        URL.createObjectURL(e.target.files[0])
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="profile__pic__section">
                        <div className="profile__pic__section--inner">
                            <img
                                src={profilePhoto}
                                alt=""
                                className="profile__pic"
                            />
                            <div className="profile__pic__cam">
                                <label htmlFor="upload-photo">
                                    <CameraAlt style={{ cursor: "pointer" }} />
                                </label>
                                <input
                                    type="file"
                                    name="photo"
                                    id="upload-photo"
                                    onChange={(e) =>
                                        setProfilePhoto(
                                            URL.createObjectURL(
                                                e.target.files[0]
                                            )
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <Row className="mt-4" xs="1" md="3">
                    <Col className="mb-2">
                        <FormGroup>
                            <Label htmlFor="nameField">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="nameField"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                invalid={
                                    formik.errors.name && formik.touched.name
                                }
                            />
                            <FormFeedback>{formik.errors.name}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col className="mb-2">
                        <FormGroup>
                            <Label htmlFor="emailField">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="emailField"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                invalid={
                                    formik.errors.email && formik.touched.email
                                }
                            />
                            <FormFeedback>{formik.errors.email}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="contactField">Contact</Label>
                            <Input
                                type="text"
                                name="phone"
                                id="contactField"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                invalid={
                                    formik.errors.phone && formik.touched.phone
                                }
                            />
                            <FormFeedback>{formik.errors.phone}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <div className="mt-4 d-flex justify-content-end">
                    <Button variant="contained" onClick={formik.submitForm}>
                        Submit
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
}

export default EditProfile;
