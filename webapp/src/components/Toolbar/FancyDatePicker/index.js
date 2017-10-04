import React from 'react'
import shortid from 'shortid'
import {
  is,
} from 'ramda'

import {
  func,
  bool,
} from 'prop-types'

import moment from 'moment'

import {
  DateRangePicker,
} from 'react-dates'

import IconCalendar from 'react-icons/lib/fa/calendar'

import style from './style.css'
import toolItemStyle from '../style.css'
import './react-dates.scss'

class DatePicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      startDate: null,
      endDate: null,
      focusedInput: 'startDate',
    }

    this.name = shortid.generate()

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    const response = {
      value,
    }

    if (is(Number, value)) {
      response.start = moment().add(-value, 'day').startOf('day')
      response.end = moment().endOf('day')
    }

    this.setState({
      value,
    })

    this.props.onChange(response)
  }

  render () {
    const {
      disabled,
    } = this.props

    return (
      <div className={toolItemStyle.root}>
        <label
          className={style.label}
          htmlFor={this.name}
        >
          <span className={style.icon}>
            <IconCalendar />
          </span>

          <div>
            <DateRangePicker
              disabled={disabled}
              daySize={40}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
              renderCalendarInfo={() => <div>What?</div>}
              customArrowIcon={<i className={style.calendarCustomArrow} />}
            />
          </div>
        </label>
      </div>
    )
  }
}

DatePicker.propTypes = {
  onChange: func.isRequired,
  disabled: bool,
}

DatePicker.defaultProps = {
  disabled: false,
}

export default DatePicker
