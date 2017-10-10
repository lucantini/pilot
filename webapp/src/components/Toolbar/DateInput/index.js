import React from 'react'
import shortid from 'shortid'
import {
  lensPath,
  set,
} from 'ramda'

import {
  func,
  shape,
  arrayOf,
  string,
  bool,
  instanceOf,
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

const shouldShowEndInput = preset => !['today', 'single'].includes(preset)

const getEndInputClasses = preset =>
  classNames(style.inputWrap, {
    [style.separator]: shouldShowEndInput(preset),
  })

const DATE_MASK = 'DD-MM-YYYY'

class DateInput extends React.Component {
  constructor (props) {
    super(props)

    const {
      initialDates,
    } = props

    this.state = {
      dates: { start: initialDates.start, end: initialDates.end },
      focusedInput: 'startDate',
      showDateSelector: false,
      preset: (initialDates.start && initialDates.end) ? 'range' : 'today',
    }

    this.name = shortid.generate()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleClickOutside () {
    this.setState({
      showDateSelector: false,
    })
  }

  handleInputChange (input, event) {
    const { value } = event.target
    const date = moment(value, DATE_MASK)

    if (!date.isValid()) {
      return
    }

    const inputLens = lensPath(['dates', input])
    const state = set(inputLens, date, this.state)

    this.setState(state)
  }

  handleDatesChange ({ start, end, preset }) {
    this.setState({
      dates: { start, end },
      preset,
    })
  }

  handleConfirm (dd) {
    console.log(dd, this)
  }

  handleFocusChange (focusedInput) {
    this.setState({ focusedInput })
  }

  render () {
    const {
      dates,
      showDateSelector,
      preset,
    } = this.state

    const {
      active,
    } = this.props

    return (
      <div className={getInputClasses(showDateSelector, active)}>
        <label
          className={style.flex}
          htmlFor={this.name}
        >
          <span className={style.icon}>
            <IconCalendar />
          </span>

          <div className={style.flex}>
            <div className={style.inputWrap}>
              <MaskedInput
                mask="11-11-1111"
                onFocus={() =>
                  this.setState({ showDateSelector: true, focusedInput: 'startDate' })}
                className={style.input}
                placeholderChar=" "
                name="startDate"
                onChange={value => this.handleInputChange('start', value)}
                placeholder={!dates.start && !dates.end ? 'Selecione um dia ou periodo' : 'Inicio'}
                value={dates.start && dates.start.format(DATE_MASK)}
              />
            </div>

            {!['today', 'single'].includes(preset) ?
              <div className={getEndInputClasses(preset)}>
                <MaskedInput
                  mask="11-11-1111"
                  onFocus={() =>
                    this.setState({ showDateSelector: true, focusedInput: 'endDate' })}
                  className={style.input}
                  placeholderChar=" "
                  name="endDate"
                  onChange={value => this.handleInputChange('end', value)}
                  placeholder="Fim"
                  value={dates.end && dates.end.format(DATE_MASK)}
                />
              </div>
              : null
            }
          </div>
        </label>

        {showDateSelector ?
          <div className={style.absolutePosition}>
            <DateSelector
              dates={this.state.dates}
              onChange={this.handleDatesChange}
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
              onFocusChange={this.handleFocusChange}
              focusedInput={this.state.focusedInput}
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
  active: bool.isRequired,
  initialDates: shape({
    start: instanceOf(moment),
    end: instanceOf(moment),
  }),
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

DateInput.defaultProps = {
  initialDates: {
    start: null,
    end: null,
  },
}

export default clickOutside(DateInput)
