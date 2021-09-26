import React from "react";
import { CustomInput, Form, FormGroup, Label } from "reactstrap";

import "./rightbar.css";
export default function Rightbar() {
    return (
        <div>
            <Form style={{ marginTop: "65px", flex: "0.10" }}>
                <Label for="exampleCheckbox">
                    <h4>Department</h4>
                </Label>
                <FormGroup>
                    <div>
                        <CustomInput
                            type="checkbox"
                            id="exampleCustomCheckbox"
                            label="Software"
                            className="custom-control-lg"
                        />
                        <CustomInput
                            type="checkbox"
                            id="exampleCustomCheckbox"
                            label="Electrical"
                        />
                        <CustomInput
                            type="checkbox"
                            id="exampleCustomCheckbox"
                            label="Biomedical"
                        />
                        <CustomInput
                            type="checkbox"
                            id="exampleCustomCheckbox"
                            label="Mechanical"
                        />
                    </div>
                </FormGroup>
            </Form>

            <Form style={{ marginTop: "50px" }}>
                <Label for="exampleCheckbox">
                    <h4>Tags</h4>
                </Label>
                <FormGroup>
                    <div>
                        <CustomInput
                            type="checkbox"
                            id="exampleCustomCheckbox"
                            label="AI"
                        />
                        <CustomInput
                            type="checkbox"
                            id="exampleCustomCheckbox"
                            label="CS"
                        />
                        <CustomInput
                            type="checkbox"
                            id="exampleCustomCheckbox"
                            label="Web"
                        />
                    </div>
                </FormGroup>
            </Form>
        </div>
    );
}
