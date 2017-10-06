import React from 'react'
import shortid from 'shortid'
import {
  is,
} from 'ramda'

import {
  func,
  shape,
  arrayOf,
  string,
} from 'prop-types'

import moment from 'moment'

import IconCalendar from 'react-icons/lib/fa/calendar'

import MaskedInput from 'react-maskedinput'

import DateSelector from '../../DateSelector'

import style from './style.css'
import toolItemStyle from '../style.css'

class DateInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      startDate: null,
      endDate: null,
      focusedInput: null,
      showDateSelector: false,
    }

    this.name = shortid.generate()

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange (period, value) {
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
      showDateSelector,
    } = this.state

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
              onFocus={() => this.setState({ showDateSelector: true })}
            />

            <MaskedInput
              mask="11/11/1111"
              name="endDate"
              onChange={value => this.handleDateChange('endDate', value)}
              onFocus={() => this.setState({ showDateSelector: true })}
            />
          </div>
        </label>

        {showDateSelector ?
          <div className={style.absolutePosition}>
            <DateSelector
              onDatesChange={this.handleDatesChange}
              onCancel={this.handleCancel}
              presets={this.props.presets}
            />
          </div>
          : null
        }
      </div>
    )
  }
}

DateInput.propTypes = {
  onChange: func.isRequired,
  presets: arrayOf(shape({
    key: string,
    title: string,
    date: func,
    items: arrayOf({
      title: string,
      date: func,
      key: string,
    }),
  })).isRequired,
}

export default DateInput
