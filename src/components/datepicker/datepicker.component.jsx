import React from "react";
import DateTimePicker from "../datetime-picker/datetime-picker.component";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.styles.scss";

// TODO Fix props drilling
// TODO Add date utils
const currentDay = new Date();

class Datepicker extends React.Component {
    state = {
        dateMin: currentDay,
        startDate: currentDay,
        endDate: new Date(currentDay.getTime() + 86400000),
        timeStart: 0,
        timeEnd: 0
    };

    handleDateStartChange = date => {
        const ds = new Date(date);
        const de = new Date(this.state.endDate);

        if(ds.getTime() > de.getTime()) {
            console.log('dateStart > dateEnd');

            this.setState({
                endDate: new Date(ds.getTime() + 86400000),
            });
        }

        this.setState({
            startDate: date
        });

        console.log('handleDateStartChange', date)
    };

    handleDateEndChange = date => {
        this.setState({
            endDate: date
        });
        console.log('handleDateEndChange', date)
    };

    handleTimeStartChange = (e) => {
        console.log('handleTimeStartChange selectedIndex: ',e.target.selectedIndex);
        this.setState({
            timeStart: e.target.selectedIndex
        });
    };

    handleTimeEndChange = (e) => {
        console.log('handleTimeEndChange selectedIndex: ',e.target.selectedIndex);
        this.setState({
            timeEnd: e.target.selectedIndex
        });
    };

    render() {
        const timeValues = [1,2,3,4,5,6];
        return (
            <div className="datepickers">
                <DateTimePicker id="dateStart" dateMin={this.state.dateMin} date={this.state.startDate} timeValues={timeValues} handleDateChange={this.handleDateStartChange} handleTimeChange={this.handleTimeStartChange} />
                <DateTimePicker id="dateEnd" dateMin={this.state.startDate} date={this.state.endDate} timeValues={timeValues} handleDateChange={this.handleDateEndChange} handleTimeChange={this.handleTimeEndChange} />
            </div>
        );
    }
}

export default Datepicker;