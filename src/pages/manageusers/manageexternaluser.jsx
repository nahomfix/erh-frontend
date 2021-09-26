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

function ManageExternalUser() {
    const history = useHistory();
    const [deleteModal, setDeleteModal] = useState(false);
    const [externalUsers, setExternalUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState("");

    const toggleDelete = (id = "") => {
        setDeleteModal(!deleteModal);
        setUserToDelete(id);
    };

    const deleteUser = (id) => {
        axios
            .delete("http://localhost:8000/admin/delete-user/" + id, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                axios
                    .get("http://localhost:8000/admin/externaluser-list", {
                        headers: {
                            "x-access-token": JSON.parse(
                                localStorage.getItem("user")
                            ).token,
                        },
                    })
                    .then((res) => {
                        setExternalUsers(res.data);
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

    const tableRecords = externalUsers.length ? (
        externalUsers.map((externalUser) => (
            <tr className="center__row" key={externalUser._id}>
                <td>{externalUser.name}</td>
                <td>{externalUser.username}</td>
                <td>
                    <IconButton
                        onClick={() =>
                            history.push(
                                `/admin/manage-externalusers/edit/${externalUser._id}`
                            )
                        }
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        onClick={() => toggleDelete(externalUser._id)}
                    >
                        <Delete />
                    </IconButton>
                </td>
            </tr>
        ))
    ) : (
        <tr className="text-center">
            <td colSpan={3}>No external users found</td>
        </tr>
    );

    useEffect(() => {
        axios
            .get("http://localhost:8000/admin/externaluser-list", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                setExternalUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                        onClick={() => deleteUser(userToDelete)}
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
                onClick={() => history.push(`/admin/manage-externalusers/add`)}
                disableElevation
            >
                Add
            </Button>
            <div className="mt-5">
                <Card>
                    <CardHeader>External Users</CardHeader>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
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
export default ManageExternalUser;
