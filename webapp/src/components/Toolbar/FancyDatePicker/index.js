import React from 'react'
import shortid from 'shortid'
import {
  is,
} from 'ramda'

import {
  func,
} from 'prop-types'

import moment from 'moment'

import IconCalendar from 'react-icons/lib/fa/calendar'

import MaskedInput from 'react-maskedinput'

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
      focusedInput: null,
    }

    this.name = shortid.generate()

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange (period, value) {
    console.log(value)

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
            <MaskedInput
              mask="11/11/1111"
              name="startDate"
              onChange={value => this.handleDateChange('startDate', value)}
            />

            <MaskedInput
              mask="11/11/1111"
              name="endDate"
              onChange={value => this.handleDateChange('endDate', value)}
            />
          </div>
        </label>
      </div>
    )
  }
}

DatePicker.propTypes = {
  onChange: func.isRequired,
}

export default DatePicker
