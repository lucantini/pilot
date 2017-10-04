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

import IconCalendar from 'react-icons/lib/fa/calendar'

import style from './style.css'
import toolItemStyle from '../style.css'

class DatePicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = { value: '' }

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

    const {
      value,
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
            <input
              name={this.name}
              type="date"
              id={this.name}
              value={value}
              disabled={disabled}
              onChange={e => !disabled && this.handleChange(e.target.value)}
              className={style.input}
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
