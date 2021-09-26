import "./managedepartment.css";
import {
    Table,
    Card,
    CardHeader,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Delete, Edit } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";

function ManageDepartment() {
    const history = useHistory();
    const [deleteModal, setDeleteModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [departmentToDelete, setDepartmentToDelete] = useState("");

    const toggleDelete = (id = "") => {
        setDeleteModal(!deleteModal);
        setDepartmentToDelete(id);
    };

    const deleteDepartment = (id) => {
        axios
            .delete(
                "http://localhost:8000/department/delete-department/" + id,
                {
                    headers: {
                        "x-access-token": JSON.parse(
                            localStorage.getItem("user")
                        ).token,
                    },
                }
            )
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

    const tableRecords = departments.length ? (
        departments.map((department) => (
            <tr className="center__row" key={department._id}>
                <td>{department.name}</td>
                <td>
                    <IconButton
                        onClick={() =>
                            history.push(
                                `/admin/manage-departments/edit/${department._id}`
                            )
                        }
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        onClick={() => toggleDelete(department._id)}
                    >
                        <Delete />
                    </IconButton>
                </td>
            </tr>
        ))
    ) : (
        <tr className="text-center">
            <td colSpan={3}>No departments found</td>
        </tr>
    );

    useEffect(() => {
        axios
            .get("http://localhost:8000/department/department-list", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                setDepartments(res.data);
                setDeleteModal(false);
            })
            .catch((err) => {
                console.log(" Error ");
            });
    }, []);

    return (
        <MainLayout>
            <Modal isOpen={deleteModal} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this department?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleDelete}>
                        Cancel
                    </Button>{" "}
                    <Button
                        color="secondary"
                        variant="contained"
                        disableElevation
                        onClick={() => deleteDepartment(departmentToDelete)}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>

            <Button
                id="Popover1"
                size="large"
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                type="button"
                onClick={() => history.push(`/admin/manage-departments/add`)}
                disableElevation
            >
                Add
            </Button>
            <div className="mt-5">
                <Card>
                    <CardHeader>Departments</CardHeader>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{tableRecords}</tbody>
                    </Table>
                </Card>
            </div>
        </MainLayout>
    );
}
export default ManageDepartment;
