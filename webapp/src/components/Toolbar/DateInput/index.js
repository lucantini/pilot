import React from 'react'
import shortid from 'shortid'
import {
  invoker,
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

const DATE_MASK = 'L'

const formatMoment = invoker(1, 'format')(DATE_MASK)

const textToMoment = ({ start, end }) => ({
  start: start ? moment(start, DATE_MASK).startOf('day') : null,
  end: end ? moment(end, DATE_MASK).endOf('day') : null,
})

const momentToText = ({ start, end }) => ({
  start: start ? start.format(DATE_MASK) : '',
  end: end ? end.format(DATE_MASK) : '',
})


const isEndInputShown = (dates) => {
  const { start, end } = textToMoment(dates)

  if (start === end) {
    return false
  }

  if (start.isSame(end, 'day')) {
    return false
  }

  const now = moment()

  if (now.isSame(start, 'day') && now.isSame(end, 'day')) {
    return false
  }

  return true
}

class DateInput extends React.Component {
  constructor (props) {
    super(props)

    const {
      initialDates,
    } = props

    this.state = {
      dates: {},
      confirmedDates: {},
      focusedInput: 'startDate',
      showDateSelector: false,
    }

    if (initialDates.start) {
      this.state.dates.start = formatMoment(initialDates.start)
    }

    if (initialDates.end) {
      this.state.dates.end = formatMoment(initialDates.end)
    }

    this.name = shortid.generate()

    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleClickOutside () {
    if (this.state.showDateSelector) {
      this.handleCancel()
    }
  }

  handleInputChange (input, event) {
    const { value } = event.target
    const { start, end } = this.state.dates

    if (start === end) {
      const dates = {
        start: value,
        end: value,
      }

      this.setState({ dates })
      this.props.onChange(textToMoment(dates))

      return
    }

    const inputLens = lensPath(['dates', input])
    const state = set(inputLens, value, this.state)

    this.setState(state)
    this.props.onChange(textToMoment(state))
  }

  handleDatesChange (dates) {
    this.setState({
      dates: momentToText(dates),
    })
  }

  handleConfirm (dates) {
    this.setState({
      showDateSelector: false,
      confirmedDates: dates,
    })

    this.props.onChange(dates)
  }

  handleCancel () {
    const { initialDates } = this.props
    const { confirmedDates } = this.state
    let datesText

    if (confirmedDates.start && confirmedDates.end) {
      datesText = momentToText(confirmedDates)
    } else {
      datesText = momentToText(initialDates)
    }

    const datesMoment = textToMoment(datesText)

    this.setState({
      showDateSelector: false,
      dates: datesText,
    })

    this.props.onChange(datesMoment)
  }

  handleFocusChange (focusedInput) {
    this.setState({ focusedInput })
  }

  render () {
    const {
      dates,
      showDateSelector,
    } = this.state

    const {
      active,
    } = this.props

    const mask = moment().format(DATE_MASK).replace(/\d/g, '1')

    return (
      <div className={getInputClasses(showDateSelector, active)}>
        <div
          className={classNames(style.flex, style.label)}
        >
          <div className={style.icon}>
            <IconCalendar />
          </div>

          <MaskedInput
            mask={mask}
            size="8"
            onFocus={() =>
              this.setState({ showDateSelector: true, focusedInput: 'startDate' })}
            onBlur={() => console.log('Shouldnt it close the Picker?')}
            className={classNames(
              style.input,
              {
                [style.show]: this.state.showDateSelector,
                [style.hide]: !this.state.showDateSelector,
              }
            )}
            placeholderChar=" "
            name="startDate"
            onChange={value => this.handleInputChange('start', value)}
            placeholder="Inicio"
            value={dates.start}
            id={`${this.name}-startDate`}
          />

          <label
            htmlFor={`${this.name}-startDate`}
            className={classNames(
              style.initialPlaceholder,
              {
                [style.show]: !this.state.showDateSelector,
                [style.hide]: this.state.showDateSelector,
              }
            )}
          >
            Selecione um dia ou periodo
          </label>

          <div className={classNames(style.separator, toolItemStyle.separator)} />

          {isEndInputShown(dates)
            ? <MaskedInput
              mask={mask}
              size="8"
              onFocus={() =>
                this.setState({ showDateSelector: true, focusedInput: 'endDate' })}
              onBlur={() => console.log('Shouldnt it close the Picker?')}
              className={style.input}
              placeholderChar=" "
              name="endDate"
              onChange={value => this.handleInputChange('end', value)}
              placeholder="Fim"
              value={dates.end}
            />
            : null
          }
        </div>

        {showDateSelector ?
          <div className={style.absolutePosition}>
            <DateSelector
              dates={textToMoment(this.state.dates)}
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
  onChange: func.isRequired,
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
