import React, { useState } from "react";
import {
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import AttachmentIcon from "@material-ui/icons/Attachment";
//import { Label, Room } from "@material-ui/icons";
import * as yup from "yup";
//import "yup-phone";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";

const uploadSchema = yup.object().shape({
    description: yup.string().required("Description is required"),
    attachmentFile: yup.string().required("Attachement File is requried"),
    title: yup.string().required("Title is required"),
    department: yup.string().required("Department is required"),
    institute: yup.string().required("Institute is required"),
    academiclevel: yup.string().required("Academic Level is required"),
    year: yup.number("Must be a number").required("Year is required"),
    date: yup.date("Must be a date").required("Date is required"),
});
function Upload() {
    const [startDate, setStartDate] = useState(new Date());
    // const [attachmentFile, setAttachmentFile] = useState(null);
    const [openTagInput, setOpenTagInput] = useState(false);
    // const [description, setDescription] = useState("");
    // const [title, setTitle] = useState("");
    // const [department, setDepartment] = useState("");
    // const [institute, setInstitute] = useState("");
    // const [academiclevel, setAcademiclevel] = useState("");
    // const [under, setUnder] = useState("");
    // const [year, setYear] = useState("");
    // const [date, setDate] = useState("");

    // function handleFormSubmittion(e) {
    //   e.preventDefault();

    //   let Form = document.getElementById("Form");
    //   let formData = new FormData(Form);
    const formik = useFormik({
        initialValues: {
            description: "",
            attachmentFile: "",
            title: "",
            department: "",
            institute: "",
            academiclevel: "",
            year: "",
            date: "",
        },
        validationSchema: uploadSchema,
        onSubmit: (values) => {
            console.log(values);
            //  const data = {
            //     ...values,
            //     under: "",
            //     profilepicture: "",
            //     address: "",
            // };

            // axios.post(
            //   "http://localhost:8000/upload/upload/",
            //   JSON.parse(localStorage.getItem("user")).username,
            //   formData,
            //   {
            //     headers: {
            //       "x-access-token": JSON.parse(localStorage.getItem("user")).token,
            //     },
            //   }
            // );

            // do something
            console.log("Form submitted");
        },
    });
    const { setValues } = formik;

    // function handleAttachmentFile(e) {
    //   setAttachmentFile(e.target.value);
    // }
    // function handleDescription(e) {
    //   setDescription(e.target.value);
    // }
    // function handleTitle(e) {
    //   setTitle(e.target.value);
    // }
    // function handleDepartment(e) {
    //   setDepartment(e.target.value);
    // }
    // function handleAcademiclevel(e) {
    //   setAcademiclevel(e.target.value);
    // }
    // function handleInstitute(e) {
    //   setInstitute(e.target.value);
    // }
    // // function handleUnder(e) {
    // //   setUnder(e.target.value);
    // // }

    // function handleYear(e) {
    //   setYear(e.target.value);
    // }

    return (
        <MainLayout>
            <Form
                encType="multipart/form-data"
                onSubmit={formik.handleSubmit}
                id="form"
            >
                <h3>Upload</h3>
                <div className="mt-4">
                    <Row>
                        <Input
                            type="textarea"
                            name="description"
                            rows="10"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            invalid={
                                formik.errors.description &&
                                formik.touched.description
                            }
                            placeholder="Description..."
                        />
                        <FormFeedback>{formik.errors.description}</FormFeedback>
                    </Row>
                    <Row className="mt-4">
                        <div className="shareOption">
                            <label
                                htmlFor="attachment"
                                style={{
                                    cursor: "pointer",
                                    fontSize: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <AttachmentIcon
                                    htmlColor="tomato"
                                    className="shareIcon"
                                    style={{ fontSize: "40px" }}
                                />
                                File
                            </label>
                            <input
                                type="file"
                                name="attachmentFile"
                                value={formik.values.attachmentFile}
                                onChange={formik.handleChange}
                                invalid={
                                    formik.errors.attachmentFile &&
                                    formik.touched.attachmentFile
                                }
                            />
                            <FormFeedback>
                                {formik.errors.attachmentFile}
                            </FormFeedback>
                        </div>
                    </Row>

                    <Row className="mt-4" xs="1" md="3">
                        <Col className="mb-2">
                            <FormGroup>
                                <Label htmlFor="exampleEmail">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.title &&
                                        formik.touched.title
                                    }
                                    required
                                />
                                <FormFeedback>
                                    {formik.errors.title}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label htmlFor="exampleEmail">Department</Label>
                                <Input
                                    type="text"
                                    name="department"
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
                        <Col>
                            <FormGroup>
                                <Label htmlFor="exampleEmail">Institute</Label>
                                <Input
                                    type="text"
                                    name="institute"
                                    value={formik.values.institute}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.institute &&
                                        formik.touched.institute
                                    }
                                ></Input>
                                <FormFeedback>
                                    {formik.errors.institute}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="mt-4" xs="1" md="3">
                        <Col className="mb-2">
                            <FormGroup>
                                <Label htmlFor="exampleEmail">
                                    Academic Level
                                </Label>
                                <Input
                                    type="text"
                                    name="academiclevel"
                                    value={formik.values.academiclevel}
                                    onChange={formik.handleChange}
                                    invalid={
                                        formik.errors.academiclevel &&
                                        formik.touched.academiclevel
                                    }
                                ></Input>
                                <FormFeedback>
                                    {formik.errors.academiclevel}
                                </FormFeedback>
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
                                        formik.errors.year &&
                                        formik.touched.year
                                    }
                                />
                                <FormFeedback>
                                    {formik.errors.academiclevel}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label htmlFor="exampleEmail">Date</Label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="form-control"
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <div className="mt-5 d-flex justify-content-end">
                        <Button
                            variant="contained"
                            onClick={formik.submitForm}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>
        </MainLayout>
    );
}

export default Upload;
