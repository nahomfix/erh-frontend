import React, { PureComponent } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export default class Example extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            totalUsers: 0,
            totalApprovers: 0,
        };
    }
    componentDidMount() {
        console.log(this.props.totalUsers);
        axios
            .get("http://localhost:8000/admin/total-user/", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                this.setState({ totalUsers: res.data });
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get("http://localhost:8000/admin/total-approver/", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("user"))
                        .token,
                },
            })
            .then((res) => {
                this.setState({ totalApprovers: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <Chart
                width={"100%"}
                height={"300px"}
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                    ["Actor", "Number of"],
                    ["Users", this.state.totalUsers],
                    ["Approvers", this.state.totalApprovers],
                    ["External Users", 0],
                ]}
                options={{
                    title: "Total Percentage",
                    // Just add this option
                    is3D: true,
                }}
                rootProps={{ "data-testid": "2" }}
            />
        );
    }
}
