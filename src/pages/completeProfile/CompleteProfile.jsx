import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Form,
    Button,
    FormFeedback,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import * as yup from "yup";
import "yup-phone";
import { useFormik } from "formik";
// import "./EditProfile.css";

const profileSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    email: yup
        .string()
        .email("Email must be a valid address")
        .required("Email is required"),
    phone: yup.string().phone("ET", true).required("Phone is required"),
    under: yup.string().required("Under is required"),
});

const CompleteProfile = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    // const [coverPhoto, setCoverPhoto] = useState(
    //   "/assets/person/placeholder.jpeg"
    // );
    // const [profilePhoto, setProfilePhoto] = useState(
    //   "/assets/person/cameraplaceholder.jpeg"
    // );

    useEffect(() => {
        const isProfileComplete = !JSON.parse(localStorage.getItem("user"))
            ?.changeProfile;
        if (isProfileComplete) {
            history.push("/");
        }
        setUsername(JSON.parse(localStorage.getItem("user")).username);
    }, [history]);

    const isAuthenticated = !!localStorage.getItem("user");
    useEffect(() => {
        if (!isAuthenticated) {
            history.push("/login");
        }
    }, [isAuthenticated, history]);

    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            email: "",
            phone: "",
            under: "",
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            const data = { ...values, profilePicure: "" };
            axios
                .post(
                    "http://localhost:8000/admin/add-profile/" +
                        JSON.parse(localStorage.getItem("user"))._id,
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
                    formik.resetForm();
                    history.push("/");
                });
        },
    });
    return (
        <MainLayout>
            <h3>Complete Profile </h3>
            {/* <div className="mt-4">
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
                    setCoverPhoto(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </div>
            </div>
            <div className="profile__pic__section">
              <div className="profile__pic__section--inner">
                <img src={profilePhoto} alt="" className="profile__pic" />
                <div className="profile__pic__cam">
                  <label htmlFor="upload-photo">
                    <CameraAlt style={{ cursor: "pointer" }} />
                  </label>
                  <input
                    type="file"
                    name="photo"
                    id="upload-photo"
                    onChange={(e) =>
                      setProfilePhoto(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
            <div className="mt-4">
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-4" xs="1" md="3">
                        <Col className="mb-2">
                            <FormGroup>
                                <Label htmlFor="exampleEmail">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="nameField"
                                    value={username}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col className="mb-2">
                            <FormGroup>
                                <Label htmlFor="exampleEmail">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="nameField"
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

                        <Col>
                            <FormGroup>
                                <Label htmlFor="exampleEmail">Address</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    id="nameField"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.address &&
                                        formik.touched.address
                                    }
                                />
                                <FormFeedback>
                                    {formik.errors.address}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row xs="1" md="3">
                        <Col className="mb-2">
                            <FormGroup>
                                <Label htmlFor="exampleEmail">Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="nameField"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.email &&
                                        formik.touched.email
                                    }
                                />
                                <FormFeedback>
                                    {formik.errors.email}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label htmlFor="exampleEmail">
                                    Phone Number
                                </Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="nameField"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.phone &&
                                        formik.touched.phone
                                    }
                                />
                                <FormFeedback>
                                    {formik.errors.phone}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label htmlFor="exampleEmail">Under</Label>
                                <Input
                                    type="text"
                                    name="under"
                                    id="nameField"
                                    value={formik.values.under}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.under &&
                                        formik.touched.under
                                    }
                                />
                                <FormFeedback>
                                    {formik.errors.under}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <div className="mt-5 d-flex justify-content-end">
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
        </MainLayout>
    );
};

export default CompleteProfile;
