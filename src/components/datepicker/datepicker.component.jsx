import React from "react";
// import TimePicker from "../time-picker/time-picker.component";
import DatePicker from "react-datepicker";
import {addDays, isBefore, isAfter, addHours, addMinutes} from "date-fns";
import {utils_extend} from '../../utils/utils';
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.styles.scss";

// TODO
// . Props drilling
// . Remove time picker component
// . Set initial time base on set interval
// . Add useState
// . Disable time options
// . Disable past time options: excludeTimes

// Of interest: https://reactdatepicker.com/#example-calendar-container

// Issues:
// . Time format in options: https://github.com/Hacker0x01/react-datepicker/issues/1785

const APP_SETTINGS = window['APP_SETTINGS'] || {};
const APP_VERBALS = window['APP_VERBALS'] || {};
const currentDate = new Date();

const DateCustomInput = React.forwardRef((props, ref) => (
    <button className="datepicker-button" ref={ref} type="button" onClick={props.onClick}>
        <span className="icon" aria-hidden="true">&#8987;</span>
        {props.value}
    </button>
));

class Datepicker extends React.Component {
    _defaults = {
        dateFormat: 'MM/dd/yyyy',
        displayFormat: {"day": "D", "top": "MMM", "bottom": "YYYY"},
        locale: 'en',
        dateStart: currentDate,
        dateEnd: currentDate,
        minDate: currentDate,
        dateMax: '',
        durationMin: 0,
        disabledDays: [],
        // disabledDates: [],
        timeIntervals: '',
        timeStart: '12:00',
        timeEnd: '12:00',
        timeMin: 1,
        hideToday: false,
        locationElem: 'pickupLocation',
        timezone: ''
    };

    _o = utils_extend(this._defaults, APP_SETTINGS);

    state = {
        minDate: new Date(this._o['minDate']),
        startDate: new Date(this._o['dateStart']),
        endDate: new Date(this._o['dateEnd']),
        timeStart: this._o['timeStart'],
        timeEnd: this._o['timeEnd']
    };

    // initStartDate = () => {};
    getClosestInterval = (d, i) => {
        // Safari issue: new Date(defaults.timezone) >> Invalid date
        const rm = (Math.ceil(d.getMinutes() / i) * i) % 60;

        console.log('___GET_ClosestInterval: ', d,' rm:',rm);
        return (rm === 0) ? 0 : rm; // String coercion
    };
    updateDateEnd = (ds, de) => {
        if (isBefore(ds, de)) {
            return;
        }
        this.setState({
            endDate: addDays(ds, 1)
        });
    };

    checkDates = () => {
        let {minDate, startDate, endDate} = this.state;

        console.log('startDate 1:', startDate);

        const interval = this.getClosestInterval(startDate, this._o['timeIntervals']);
        const minutesToAdd = interval - currentDate.getMinutes();

        if(minutesToAdd > 0) {
            startDate = addMinutes(startDate, minutesToAdd);
        } else {
            startDate = startDate.setMinutes(0);
            startDate = addHours(startDate, 1);
        }

        this.setState({startDate: startDate});

        console.log('startDate 2:', startDate);

        if (isAfter(minDate, startDate)) {
            startDate = minDate; // TODO check minDate Interval
            console.log('minDate:', minDate);
            this.setState({
                startDate: startDate
            });
        }
        this.updateDateEnd(startDate, endDate);
    };

    handleDateStartChange = date => {
        this.updateDateEnd(date, this.state.endDate);

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
        console.log('handleTimeStartChange selectedIndex: ', e.target.selectedIndex);
        this.setState({
            timeStart: e.target.selectedIndex
        });
    };

    handleTimeEndChange = (e) => {
        console.log('handleTimeEndChange selectedIndex: ', e.target.selectedIndex);
        this.setState({
            timeEnd: e.target.selectedIndex
        });
    };

    handleTime = (date) => {
        console.log('handleTime date: ', date);
        this.setState({
            startDate: date
        });
    };

    componentWillMount() {
        const {minDate, startDate, endDate} = this.state;
        // Normalize data
        // 1. Time
        // TODO set intervals
        console.log('');
        // 2. Date
        this.checkDates();

    }

    render() {
        const {minDate, startDate, endDate} = this.state;
        const {dateFormat, timeIntervals} = this._o;
        const ref = React.createRef();

        console.log('>>> startDate', startDate);

        return (
            <div className="datepickers">
                <div className="datepicker-col">
                    <DatePicker dateFormat={dateFormat}
                                ref={ref}
                                selected={startDate}
                                onChange={this.handleDateStartChange}
                                minDate={minDate}
                                todayButton="Vandaag"
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                xxx-shouldCloseOnSelect={false}
                                customInput={<DateCustomInput ref={ref}/>}
                    />
                    <DatePicker
                        selected={startDate}
                        onChange={this.handleTime}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={timeIntervals}
                        timeCaption={APP_VERBALS.timeCaption}
                        dateFormat="HH:mm"
                    />
                </div>
                <div className="datepicker-col">
                    <DatePicker dateFormat={APP_SETTINGS.dateFormat}
                                ref={ref}
                                selected={endDate}
                                onChange={this.handleDateEndChange}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                customInput={<DateCustomInput ref={ref}/>}
                    />
                </div>

            </div>
        );
    }
}

export default Datepicker;