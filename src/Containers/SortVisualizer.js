import React, { Component } from "react";
import Bar from "../Components/Bar";
import Input from "../Components/Input";
import Button from "../Components/Button";

class SortVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            interval: 50,
            elementsInputValue: "",
            intervalInputValue: "",
            shouldChange: -1,
            notSort: -1,
        };
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    insertionSort = async () => {

        // An array of integers to sort.
        let copy = this.state.elements;
        for (let i = 1; i <= copy.length; i++) {
            for (let j = i - 1; j >= 0; j--) {
                if (copy[j + 1] < copy[j]) {
                    const temp = copy[j];
                    copy[j] = copy[j + 1];
                    copy[j + 1] = temp;
                    this.setState({
                        shouldChange: j + 1,
                    });
                } else {
                    break;
                }
            }
            let last = copy[0];
            let end = false;
            copy.forEach((v, k) => {
                if (v >= last) {
                    last = v;
                } else {
                    if (!end) {
                        end = true;
                        this.setState({
                            notSort: k,
                        });
                    }
                }
            })
            await this.sleep(this.state.interval);
            this.setState({
                elements: copy,
            });
        }
        document.getElementById("end-message").innerText = "finish";
    };
    cal = () => {
        console.log(this);
        this.setState({
            elements: [],
            interval: 50,
            elementsInputValue: "",
            intervalInputValue: "",
            shouldChange: -1,
            notSort: -1,
        });
    }
    componentDidUpdate(_, prevState) {
        if (prevState.elementsInputValue !== this.state.elementsInputValue) {
            this.setState({ elements: this.state.elementsInputValue.split(" ") })
        }
        if (prevState.intervalInputValue !== this.state.intervalInputValue) {
            this.setState({ interval: Number(this.state.intervalInputValue) })
        }
    }
    render() {
        return (
            <div className={"visualizer-container"}>
                <span id="end-message"></span>
                <div className={"array-container"}>
                    {this.state.elements.map((value, key) => {
                        if (!!value && value !== 0)
                            return <Bar key={key} height={Number(value)} backgroundColor={
                                key === this.state.shouldChange ? "green" : key === this.state.notSort ? "blue" : "limegreen"
                            } />
                        else return null
                    })}
                </div>
                <div className={"input-container"}>
                    <div>
                        <Input
                            elementId={"interval"}
                            type="text"
                            width={"300px"}
                            placeholder={"Interval(ms) - default is 50ms"}
                            value={this.state.intervalInputValue}
                            onChange={(v) => { this.setState({ intervalInputValue: v.target.value }) }}
                        />
                    </div>
                    <div>
                        <Input
                            elementId={"array"}
                            type="text"
                            width={"600px"}
                            placeholder={"Numbers"}
                            value={this.state.elementsInputValue}
                            onChange={(v) => { this.setState({ elementsInputValue: v.target.value }) }}
                        />
                    </div>
                </div>
                <footer className="app-footer">
                    <Button onClick={this.insertionSort} elementId={"start"} text={"Insertion Sort"} />
                    <Button onClick={this.cal} elementId={"clean"} text={"Clear"} />
                </footer>
            </div>
        );
    }
}

export default SortVisualizer;
