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
  bool,
} from 'prop-types'

import moment from 'moment'

import IconCalendar from 'react-icons/lib/fa/calendar'

import MaskedInput from 'react-maskedinput'
import clickOutside from 'react-click-outside'
import classNames from 'classnames'

import DateSelector from '../../DateSelector'

import style from './style.css'
import toolItemStyle from '../style.css'

const getInputClasses = (focused, active) => classNames(
  toolItemStyle.root,
  {
    [toolItemStyle.focused]: focused,
    [toolItemStyle.active]: active,
  }
)

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

  handleClickOutside () {
    this.setState({
      showDateSelector: false,
    })
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

    const {
      active,
    } = this.props

    return (
      <div className={getInputClasses(showDateSelector, active)}>
        <label
          className={style.label}
          htmlFor={this.name}

        >
          <span className={style.icon}>
            <IconCalendar />
          </span>

          <div className={style.flex}>
            <MaskedInput
              mask="11-11-1111"
              onFocus={() => this.setState({ showDateSelector: true })}
              className={style.input}
              placeholderChar=" "
              name="startDate"
              onChange={value => this.handleDateChange('startDate', value)}
              placeholder="Inicio"
            />

            <MaskedInput
              mask="11-11-1111"
              onFocus={() => this.setState({ showDateSelector: true })}
              className={style.input}
              placeholderChar=" "
              name="endDate"
              onChange={value => this.handleDateChange('endDate', value)}
              placeholder="Fim"
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
  active: bool.isRequired,
  presets: arrayOf(shape({
    key: string,
    title: string,
    date: func,
    items: arrayOf(shape({
      title: string,
      date: func,
      key: string,
    })),
  })).isRequired,
}

export default clickOutside(DateInput)
