import React from "react";
import "./time-picker.styles.scss";

const TimePicker = ({id, values, handleTimeChange}) => {
    return(
        <div className="time-control-group">
            <label htmlFor={`${id}-label`}>Select time</label>
            <select id={`${id}-control`} className="time-control" onChange={handleTimeChange} required>
                {values.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
        </div>
    )
};

export default TimePicker;