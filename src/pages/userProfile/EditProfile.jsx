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

const editProfileSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    gender: yup.string().required("Gender needs to be selected"),
    email: yup
        .string()
        .email("Email must be a valid address")
        .required("Email is required"),
    phone: yup.string().phone("ET", true).required("Phone is required"),
    department: yup.string().required("Department is required"),
    academiclevel: yup.string().required("Academic Level needs to be selected"),
    year: yup.number("Must be a number").required("Year is required"),
});
function EditProfile() {
    const history = useHistory();
    const [coverPhoto, setCoverPhoto] = useState("/assets/post/1.jpeg");
    const [profilePhoto, setProfilePhoto] = useState("/assets/person/1.jpeg");

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            gender: "",
            email: "",
            phone: "",
            department: "",
            academiclevel: "",
            year: "",
        },
        validationSchema: editProfileSchema,
        onSubmit: (values) => {
            console.log(values);
            // const data = {
            //     ...values,
            //     under: "",
            //     profilepicture: "",
            //     address: "",
        },
    });
    const { setValues } = formik;

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
                        {/* <img src={coverPhoto} alt="" className="cover__img" /> */}
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
                <Row xs="1" md="3">
                    <Col className="mb-2">
                        <FormGroup>
                            <Label htmlFor="exampleEmail">First Name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                id="firstnamefield"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                invalid={
                                    formik.errors.firstName &&
                                    formik.touched.firstName
                                }
                            />
                            <FormFeedback>
                                {formik.errors.firstName}
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="lastnamefield">Last Name</Label>
                            <Input
                                type="text"
                                name="lastName"
                                id="lastnamefield"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                invalid={
                                    formik.errors.lastName &&
                                    formik.touched.lastName
                                }
                            />
                            <FormFeedback>
                                {formik.errors.lastName}
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="genderSelect">Gender</Label>
                            <Input
                                type="select"
                                name="gender"
                                id="genderSelect"
                            >
                                <option>Female</option>
                                <option>Male</option>
                                <option>Others</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="mt-4" xs="1" md="3">
                    <Col className="mb-2">
                        <FormGroup>
                            <Label htmlFor="Emailfield">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="Emailfield"
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
                            <Label htmlFor="contactField">Phone Number</Label>
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
                    <Col>
                        <FormGroup>
                            <Label htmlFor="departmentField">Department</Label>
                            <Input
                                type="text"
                                name="department"
                                id="departmentField"
                                value={formik.values.department}
                                onChange={formik.handleChange}
                                invalid={
                                    formik.errors.department &&
                                    formik.touched.department
                                }
                            />
                            <FormFeedback>
                                {formik.errors.department}
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="mt-4" xs="1" md="3">
                    <Col className="mb-2">
                        <FormGroup>
                            <Label htmlFor="alSelect">Academic Level</Label>
                            <Input
                                type="select"
                                name="academiclevel"
                                id="alSelect"
                            >
                                <option>Bachelor</option>
                                <option>Masters</option>
                                <option>PhD</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleEmail">Year</Label>
                            <Input
                                type="number"
                                maxLength={4}
                                name="year"
                                value={formik.values.year}
                                onChange={formik.handleChange}
                                invalid={
                                    formik.errors.year && formik.touched.year
                                }
                            />
                            <FormFeedback>{formik.errors.year}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col></Col>
                </Row>

                <div className="mt-5 d-flex justify-content-end">
                    <Button variant="contained" onClick={formik.submitForm}>
                        Submit
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
}

export default EditProfile;
