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
    gender: yup.string().required("Address is required"),
    email: yup
        .string()
        .email("Email must be a valid address")
        .required("Email is required"),
    phone: yup.string().phone("ET", true).required("Phone is required"),
    department: yup.string().required("Under is required"),
    academiclevel: yup.string().required("Academic Level is required"),
    year: yup.string().required("Year is required"),
});

const UserCompleteProfile = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    // const [coverPhoto, setCoverPhoto] = useState(
    //   "/assets/person/placeholder.jpeg"
    // );
    // const [profilePhoto, setProfilePhoto] = useState(
    //   "/assets/person/cameraplaceholder.jpeg"
    // );

    // useEffect(() => {
    //     const isProfileComplete = !JSON.parse(localStorage.getItem("user"))
    //         ?.changeProfile;
    //     if (isProfileComplete) {
    //         history.push("/");
    //     }
    //     setUsername(JSON.parse(localStorage.getItem("user")).username);
    // }, [history]);

    const isAuthenticated = !!localStorage.getItem("user");
    useEffect(() => {
        if (!isAuthenticated) {
            history.push("/login");
        }
    }, [isAuthenticated, history]);

    const formik = useFormik({
        initialValues: {
            name: "",
            gender: "",
            email: "",
            phone: "",
            department: "",
            academiclevel: "",
            year: "",
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            const data = { ...values, profilePicure: "" };
            // axios
            //     .post(
            //         "http://localhost:8000/admin/add-profile/" +
            //             JSON.parse(localStorage.getItem("user"))._id,
            //         data,
            //         {
            //             headers: {
            //                 "x-access-token": JSON.parse(
            //                     localStorage.getItem("user")
            //                 ).token,
            //             },
            //         }
            //     )
            //     .then((res) => {
            //         formik.resetForm();
            //         history.push("/");
            //     });
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
                                <Label htmlFor="nameField">Username</Label>
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
                                <Label htmlFor="nameField">Name</Label>
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
                    <Row className="mb-4" xs="1" md="3">
                        <Col className="mb-2">
                            <FormGroup>
                                <Label htmlFor="emailField">Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="emailField"
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
                                <Label htmlFor="phonenumberfield">
                                    Phone Number
                                </Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phonenumberfield"
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
                                <Label htmlFor="departmentfield">
                                    Department
                                </Label>
                                <Input
                                    type="text"
                                    name="department"
                                    id="departmentfield"
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
                    <Row xs="1" md="3">
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
                                        formik.errors.year &&
                                        formik.touched.year
                                    }
                                />
                                <FormFeedback>
                                    {formik.errors.year}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col></Col>
                    </Row>

                    <div className="mt-5 d-flex justify-content-end">
                        <Button variant="contained" onClick={formik.submitForm}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </MainLayout>
    );
};

// class CompleteProfile extends Component {
//   //const history = useHistory();
//   // const [coverPhoto, setCoverPhoto] = useState(
//   //   "/assets/person/placeholder.jpeg"
//   // );
//   // const [profilePhoto, setProfilePhoto] = useState(
//   //   "/assets/person/cameraplaceholder.jpeg"
//   // );

//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       gender: "",
//       email: "",
//       phone: "",
//       department: "",
//       academiclevel: "",
//       year: "",
//     };
//   }

//   // componentDidMount() {
//   //   axios
//   //     .get(
//   //       "http://localhost:8000/student/getStudent/" +
//   //         JSON.parse(localStorage.getItem("user")).username
//   //     )
//   //     .then((res) => {
//   //       console.log(this.props);
//   //       if (!res.data.changeProfile) {
//   //         this.props.history.push("/");
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // }

//   onChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   onSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       name: this.state.name,
//       gender: this.state.gender,
//       email: this.state.email,
//       phone: this.state.phone,
//       department: this.state.department,
//       academiclevel: this.state.academiclevel,
//       year: this.state.year,
//     };
//     //this.props.history.push("/completeprofile");
//     console.log(data);

//     axios
//       .post(
//         "http://localhost:8000/student/add-profile/" +
//           JSON.parse(localStorage.getItem("user")).username,
//         data,
//         {
//           headers: {
//             "x-access-token": JSON.parse(localStorage.getItem("user")).token,
//           },
//         }
//       )
//       .then((res) => {
//         this.setState({
//           name: "",
//           gender: "",
//           email: "",
//           phone: "",
//           academiclevel: "",
//           year: "",
//         });
//         console.log(res.data);
//         this.props.history.push("/");
//       });
//     // const handlePasswordChange = (prop) => (event) => {
//     //   setValues({ ...values, [prop]: event.target.value });
//     // };
//   };

//   render() {
//     return (
//       <Form
//         style={{
//           marginTop: "40px",
//         }}
//       >
//         <MainContainer>
//           <h3>Complete Profile </h3>
//           {/* <div className="mt-4">
//           <div className="cover">
//             <div className="cover__section">
//               <img src={coverPhoto} alt="" className="cover__img" />
//               <div className="cover__img__cam">
//                 <label htmlFor="upload-cover">
//                   <CameraAlt style={{ cursor: "pointer" }} />
//                 </label>
//                 <input
//                   type="file"
//                   name="photo"
//                   id="upload-cover"
//                   onChange={(e) =>
//                     setCoverPhoto(URL.createObjectURL(e.target.files[0]))
//                   }
//                 />
//               </div>
//             </div>
//             <div className="profile__pic__section">
//               <div className="profile__pic__section--inner">
//                 <img src={profilePhoto} alt="" className="profile__pic" />
//                 <div className="profile__pic__cam">
//                   <label htmlFor="upload-photo">
//                     <CameraAlt style={{ cursor: "pointer" }} />
//                   </label>
//                   <input
//                     type="file"
//                     name="photo"
//                     id="upload-photo"
//                     onChange={(e) =>
//                       setProfilePhoto(URL.createObjectURL(e.target.files[0]))
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
//           <div className="mt-4">
//             <Form onSubmit={this.onSubmit}>
//               <Row xs="1" md="3">
//                 <Col className="mb-2">
//                   <FormGroup>
//                     <Label htmlFor="exampleEmail">First Name</Label>
//                     <Input
//                       style={{
//                         width: "350px",
//                         height: "50px",
//                         fontSize: "18px",
//                         overflow: "hidden",
//                         resize: "none",

//                         boxShadow: "green",
//                         marginTop: "10px",
//                         marginBottom: "10px",
//                       }}
//                       type="text"
//                       name="name"
//                       value={this.state.username}
//                       onChange={this.onChange}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col>
//                   <FormGroup>
//                     <Label htmlFor="exampleEmail">Last Name</Label>
//                     <Input
//                       style={{
//                         width: "350px",
//                         height: "50px",
//                         fontSize: "18px",
//                         overflow: "hidden",
//                         resize: "none",

//                         boxShadow: "green",
//                         marginTop: "10px",
//                         marginBottom: "10px",
//                       }}
//                       type="text"
//                       name="name"
//                       value={this.state.username}
//                       onChange={this.onChange}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col>
//                   <FormGroup>
//                     <Label htmlFor="exampleEmail">Gender</Label>
//                     <Input
//                       style={{
//                         width: "350px",
//                         height: "50px",
//                         fontSize: "18px",
//                         overflow: "hidden",
//                         resize: "none",

//                         boxShadow: "green",
//                         marginTop: "10px",
//                         marginBottom: "10px",
//                       }}
//                       type="select"
//                       name="gender"
//                       value={this.state.gender}
//                       onChange={this.onChange}
//                       id="exampleSelect"
//                     >
//                       <option>Female</option>
//                       <option>Male</option>
//                     </Input>
//                   </FormGroup>
//                 </Col>
//               </Row>
//               <Row className="mt-4" xs="1" md="3">
//                 <Col className="mb-2">
//                   <FormGroup>
//                     <Label htmlFor="exampleEmail">Email</Label>
//                     <Input
//                       style={{
//                         width: "350px",
//                         height: "50px",
//                         fontSize: "18px",
//                         overflow: "hidden",
//                         resize: "none",

//                         boxShadow: "green",
//                         marginTop: "10px",
//                         marginBottom: "10px",
//                       }}
//                       type="email"
//                       name="email"
//                       id="exampleEmail1"
//                       value={this.state.email}
//                       onChange={this.onChange}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col>
//                   <FormGroup>
//                     <Label htmlFor="exampleEmail">Phone Number</Label>
//                     <Input
//                       style={{
//                         width: "350px",
//                         height: "50px",
//                         fontSize: "18px",
//                         overflow: "hidden",
//                         resize: "none",

//                         boxShadow: "green",
//                         marginTop: "10px",
//                         marginBottom: "10px",
//                       }}
//                       type="phone"
//                       name="phone"
//                       value={this.state.phone}
//                       onChange={this.onChange}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col>
//                   <FormGroup>
//                     <Label htmlFor="exampleEmail">Department</Label>
//                     <Input
//                       style={{
//                         width: "350px",
//                         height: "50px",
//                         fontSize: "18px",
//                         overflow: "hidden",
//                         resize: "none",

//                         boxShadow: "green",
//                         marginTop: "10px",
//                         marginBottom: "10px",
//                       }}
//                       type="text"
//                       name="department"
//                       value={this.state.department}
//                       onChange={this.onChange}
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>
//               <Row className="mt-4" xs="1" md="3">
//                 <Col className="mb-2">
//                   <FormGroup>
//                     <Label htmlFor="exampleEmail">Academic Level</Label>
//                     <Input
//                       style={{
//                         width: "350px",
//                         height: "50px",
//                         fontSize: "18px",
//                         overflow: "hidden",
//                         resize: "none",

//                         boxShadow: "green",
//                         marginTop: "10px",
//                         marginBottom: "10px",
//                       }}
//                       type="select"
//                       name="academiclevel"
//                       value={this.state.academiclevel}
//                       onChange={this.onChange}
//                     >
//                       <option>Bachelor</option>
//                       <option>Masters</option>
//                       <option>PhD</option>
//                     </Input>
//                   </FormGroup>
//                 </Col>
//                 <Col>
//                   <FormGroup>
//                     <Label htmlFor="exampleEmail">Year</Label>
//                     <Input
//                       style={{
//                         width: "350px",
//                         height: "50px",
//                         fontSize: "18px",
//                         overflow: "hidden",
//                         resize: "none",

//                         boxShadow: "green",
//                         marginTop: "10px",
//                         marginBottom: "10px",
//                       }}
//                       type="number"
//                       name="year"
//                       value={this.state.year}
//                       onChange={this.onChange}
//                       maxLength={4}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col></Col>
//               </Row>

//               <div className="mt-5 d-flex justify-content-end">
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   component={Link}
//                   to="/"
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </MainContainer>
//       </Form>
//     );
//   }
// }

export default UserCompleteProfile;
