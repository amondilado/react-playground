import React from "react";
import TimePicker from "../time-picker/time-picker.component";
import DatePicker from "react-datepicker";
import "./datetime-picker.styles.scss";

const DateCustomInput = React.forwardRef((props, ref) => (
    <button className="datepicker-button" ref={ref} type="button" onClick={props.onClick}>
        <span className="icon" aria-hidden="true">&#8987;</span>
        {props.value}
    </button>
));

const DateTimePicker = ({id, dateMin, date, handleDateChange, handleTimeChange, timeValues}) => {
    const ref = React.createRef();
    return (
        <div className="datepicker-col">
            <DatePicker data-context={id}
                ref={ref}
                selected={date}
                onChange={handleDateChange}
                minDate={dateMin}
                customInput={<DateCustomInput ref={ref} />}
            />
            <TimePicker id={id} values={timeValues} handleTimeChange={e => handleTimeChange(e)} />
        </div>
    )
};

export default DateTimePicker;