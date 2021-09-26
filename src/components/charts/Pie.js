import * as React from "react";
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { EventTracker, SelectionState } from "@devexpress/dx-react-chart";

const data = [
    { year: "Software Engineering", population: 2.525 },
    { year: "1960", population: 3.018 },
    { year: "1970", population: 3.682 },
];

const compare = (
    { series, point },
    { series: targetSeries, point: targetPoint }
) => series === targetSeries && point === targetPoint;

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
            selection: [],
        };

        this.click = ({ targets }) => {
            const target = targets[0];
            if (target) {
                this.setState(({ selection }) => ({
                    selection:
                        selection[0] && compare(selection[0], target)
                            ? []
                            : [target],
                }));
            }
        };
    }

    render() {
        const { data: chartData, selection } = this.state;

        return (
            <div>
                <span>
                    Selected value:{" "}
                    {selection.length
                        ? data[selection[0].point].population
                        : undefined}
                </span>
                <Chart data={chartData}>
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries valueField="population" argumentField="year" />
                    <EventTracker onClick={this.click} />
                    <SelectionState selection={selection} />
                </Chart>
            </div>
        );
    }
}
