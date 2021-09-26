import React, { Component } from "react";
import "./manageusers.css";
import axios from "axios";
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
import { Delete, Edit } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import MainLayout from "../../layouts/MainLayout";

class ManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            deleteModal: false,
            userToDelete: "",
        };
    }

    toggleDelete = (id = "") => {
        this.setState((state, props) => ({ deleteModal: !state.deleteModal }));
        this.setState({ userToDelete: id });
    };

    componentDidMount() {
        axios
            .get("http://localhost:8000/admin/user-list", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                this.setState({
                    users: res.data,
                });
            })
            .catch((err) => {
                console.log(" Error ");
            });
    }

    deleteUser(id) {
        console.log(id);
        axios
            .delete("http://localhost:8000/admin/delete-user/" + id, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                console.log("deleted");
                axios
                    .get("http://localhost:8000/admin/user-list", {
                        headers: {
                            "x-access-token": JSON.parse(
                                localStorage.getItem("user")
                            ).token,
                        },
                    })
                    .then((res) => {
                        this.setState({
                            users: res.data,
                            deleteModal: false,
                        });
                    })
                    .catch((err) => {
                        console.log(" Error ");
                    });
            })
            .catch((err) => {
                console.log("Error form deleteClick");
            });
    }
    render() {
        const users = this.state.users;
        console.log("PrintUser: " + users);
        console.log(JSON.stringify(users));

        const userList = users.length ? (
            users.map((user) => (
                <tr className="center__row" key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>
                        <IconButton
                            onClick={() =>
                                this.props.history.push(
                                    `/admin/manage-users/edit/${user._id}`
                                )
                            }
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            type="button"
                            color="secondary"
                            onClick={() => this.toggleDelete(user._id)}
                        >
                            <Delete />
                        </IconButton>
                    </td>
                </tr>
            ))
        ) : (
            <tr className="text-center">
                <td colSpan={3}>No users found</td>
            </tr>
        );

        return (
            <MainLayout>
                <Modal
                    isOpen={this.state.deleteModal}
                    toggle={this.toggleDelete}
                >
                    <ModalHeader toggle={this.toggleDelete}>Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this user?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleDelete}>
                            Cancel
                        </Button>{" "}
                        <Button
                            color="secondary"
                            onClick={() =>
                                this.deleteUser(this.state.userToDelete)
                            }
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
                    onClick={() =>
                        this.props.history.push(`/admin/manage-users/add`)
                    }
                    disableElevation
                >
                    Add
                </Button>
                <div className="mt-5">
                    <Card>
                        <CardHeader>Users</CardHeader>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{userList}</tbody>
                        </Table>
                    </Card>
                </div>
            </MainLayout>
        );
    }
}

export default ManageUsers;
