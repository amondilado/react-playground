import React from "react";
// import TimePicker from "../time-picker/time-picker.component";
import DatePicker from "react-datepicker";
import {addDays, isAfter, addHours, setHours, setMinutes} from "date-fns";
import {utils_extend} from '../../utils/utils';
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.styles.scss";

// TODO
// . Props drilling
// . Remove time picker component
// . Set initial time base on set interval
// . Disable time options
// . Disable past time options: excludeTimes

// Of interest: https://reactdatepicker.com/#example-calendar-container

// Issues:
// . Time format in options: https://github.com/Hacker0x01/react-datepicker/issues/1785

const APP_SETTINGS = window['APP_SETTINGS'] || {};
const APP_VERBALS = window['APP_VERBALS'] || {};
const currentDate = new Date('2020-02-24T19:50'); // TODO

const DateCustomInput = React.forwardRef((props, ref) => (
    <button className="datepicker-button" ref={ref} type="button" onClick={props.onClick}>
        <span className="icon" aria-hidden="true">&#8987;</span>
        {props.value}
    </button>
));

class Datepicker extends React.Component {
    _defaults = {
        dateFormat: 'MM/dd/yyyy',
        // displayFormat: {"day": "D", "top": "MMM", "bottom": "YYYY"},
        locale: 'en',
        dateStart: currentDate,
        dateEnd: addDays(currentDate, 1),
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

    getClosestInterval = (date, interval) => {
        // Safari issue: new Date(defaults.timezone) >> Invalid date
        const rm = (Math.ceil(date.getMinutes() / interval) * interval) % 60;

        console.log('___GET_ClosestInterval: ', date,' rm:',rm);
        return rm === 0 ? 0 : rm;
    };

    getTimeInterval = d => {
        const _d = d,//new Date('2020-02-24T16:50:09'),
              _minutesToAdd = this.getClosestInterval(_d, this._o['timeIntervals']);

        console.log('___GET_TimeInterval _minutesToAdd:', _minutesToAdd,'\n d:',_d);

        _d.setMinutes(_minutesToAdd);
        return _minutesToAdd ? _d : addHours(_d,1);
    };

    updateDateEnd = (ds, de) => {
        console.log('___updateDateEnd ds, de: ',ds, de);
        if (isAfter(ds.getDay(), de)) {
            this.setState({
                endDate: addDays(ds, 1)
            });
        }
    };

    calcExcludedTimes = (date, interval) => {
        const _array = [],
              intervals = [0,15,30,45], // TODO
              minutes = date.getMinutes(),
              selectedTimeSlot = minutes ? intervals.indexOf(minutes) - 1 : 0;

        date.setSeconds(0);

        for(var i = 0; i < date.getHours(); i++) {
            for(var j = 0, l = intervals.length; j < l; j++) {
                if(l === j && selectedTimeSlot === intervals[j]) {
                    break;
                }
                _array.push(setHours(setMinutes(date, intervals[j]), i));
            }
        }
        return _array;
    };

    initDates = () => {
        const {minDate, startDate, endDate, timeStart, timeEnd} = this.state;
        const _o = this._o;

        let _min,
            _start = startDate,
            _end = endDate,
            _ts = timeStart.split(':'),
            _te = timeEnd.split(':'),
            _tmin = currentDate.getHours() + _o.timeMin;

        console.log('\n_tmin: ',_tmin);

        _min = this.getTimeInterval(minDate);

        if(24 < _tmin) {
            addDays(_min, 1);
            _tmin = _tmin - 24;
        }

        _min.setHours(_tmin);
        console.log('_min: ',_min, '\n_tmin: ',_tmin);

        _start.setHours(_ts[0] ,_ts[1]);
        _end.setHours(_te[0],_te[1]);
        console.log('_start: ',_start, '_end: ',_end);

        if (isAfter(_min, _start)) {
            _start = _min;
            console.log('\nNew d: ',_start);
        }

        this.setState({minDate: _min});
        this.setState({startDate: _start});
        // TODO Review
        this.setState({endDate: _end});
        this.updateDateEnd(_start, _end);

        // TODO excludeTimes
        _o.timeStartExcluded = this.calcExcludedTimes(_start, _o.timeIntervals);
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

    handleTimeStartChange = date => {
        console.log('handleTimeStartChange selectedIndex: ', date);
        this.setState({
            startDate: date
        });
    };

    handleTimeEndChange = date => {
        console.log('handleTimeEndChange selectedIndex: ', date);
        this.setState({
            endDate: date
        });
    };

    componentWillMount() {
        const {minDate, startDate, endDate} = this.state;
        // Normalize data
        // 1. Time
        console.log('componentWillMount');
        // 2. Date
        this.initDates();

    }

    render() {
        const ref = React.createRef();
        const {minDate, startDate, endDate} = this.state;
        const {dateFormat, timeIntervals, timeStartExcluded} = this._o;

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
                        onChange={this.handleTimeStartChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={timeIntervals}
                        timeCaption={APP_VERBALS.timeCaption}
                        excludeTimes={timeStartExcluded}
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
                    <DatePicker
                        selected={endDate}
                        onChange={this.handleTimeEndChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={timeIntervals}
                        timeCaption={APP_VERBALS.timeCaption}
                        dateFormat="HH:mm"
                    />
                </div>

            </div>
        );
    }
}

export default Datepicker;