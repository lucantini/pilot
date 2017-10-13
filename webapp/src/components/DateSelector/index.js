import React, { Component } from 'react'
import {
  func,
  string,
  arrayOf,
  shape,
} from 'prop-types'

import {
  momentObj,
} from 'react-moment-proptypes'

import {
  DayPickerRangeController,
  DayPickerSingleDateController,
} from 'react-dates'

import {
  is,
} from 'ramda'

import IconArrowLeft from 'react-icons/lib/fa/angle-left'
import IconArrowRight from 'react-icons/lib/fa/angle-right'

import shortid from 'shortid'
import moment from 'moment'

import 'react-dates/css/styles.scss'

import Button from '../Button'

import style from './style.css'
import './react-dates.scss'

const START_DATE = 'startDate'

const calculatePreset = (dates, presetKey) => {
  if (is(Number, dates)) {
    if (dates === 0) {
      return 'single'
    }

    return 'range'
  }

  if (presetKey || !dates) {
    return presetKey || 'range'
  }

  if (moment.isMoment(dates)) {
    return moment().isSame(dates, 'day') ? 'today' : 'single'
  }

  if (dates.start && dates.end) {
    const { start, end } = dates
    const now = moment()

    if (now.isSame(start, 'day') && now.isSame(end, 'day')) {
      return 'today'
    }

    if (start.isSame(end, 'day')) {
      return 'single'
    }
  }

  return 'range'
}

const normalizeDates = (dates) => {
  if (is(Number, dates)) {
    if (dates <= 0) {
      return {
        start: moment().add(dates, 'day').startOf('day'),
        end: moment().endOf('day'),
      }
    }

    return {
      start: moment().startOf('day'),
      end: moment().add(dates, 'day').endOf('day'),
    }
  }

  if (!dates) {
    return { start: null, end: null }
  }

  if (moment.isMoment(dates)) {
    return {
      start: dates.startOf('day'),
      end: dates.endOf('day'),
    }
  }

  const normal = {
    start: null,
    end: null,
  }

  if (dates.start) {
    normal.start = dates.start.startOf('day')
  }

  if (dates.end) {
    normal.end = dates.end.endOf('day')
  }

  if (dates.startDate) {
    normal.start = dates.startDate.startOf('day')
  }

  if (dates.endDate) {
    normal.end = dates.endDate.endOf('day')
  }

  return normal
}


export default class DateSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      preset: calculatePreset(props.dates),
    }

    this.instanceId = `dateselector-${shortid.generate()}`

    this.handleFocusChange = this.handleFocusChange.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handlePresetChange = this.handlePresetChange.bind(this)
  }

  handleFocusChange (focusedInput) {
    this.props.onFocusChange(focusedInput || START_DATE)
  }

  handleDatesChange (dates) {
    const normalizedDates = normalizeDates(dates)
    const preset = calculatePreset(normalizedDates)

    this.setState({ preset })
    this.props.onChange(normalizedDates)
  }

  handlePresetChange (dates, key) {
    const normalizedDates = normalizeDates(dates)

    this.setState({
      preset: key,
      dates: normalizedDates,
    })

    this.props.onChange(normalizedDates)
  }

  handleCancel () {
    this.props.onCancel()
  }

  handleConfirm () {
    const dates = normalizeDates(this.props.dates)
    this.props.onConfirm(dates)
  }

  renderPreset ({ title, key, date }) {
    const { preset } = this.state

    const group = `${this.instanceId}-presets`
    const selectedId = `${this.instanceId}-preset-${preset}`
    const id = `${this.instanceId}-preset-${key}`

    return (
      <li key={`${key}${title}`}>
        <input
          type="radio"
          name={group}
          id={id}
          onClick={() => this.handlePresetChange(date(), key)}
          checked={selectedId === id}
        />
        <label htmlFor={id}>
          {title}
        </label>
      </li>
    )
  }

  renderPresets (presets) {
    return presets.map(({ date, items, key, title }) => {
      if (items) {
        return (
          <ol key={`${key}${title}`}>
            <h2>{title}</h2>
            {this.renderPresets(items)}
          </ol>
        )
      }

      return this.renderPreset({
        date,
        title,
        key,
      })
    })
  }

  renderPicker () {
    const {
      preset,
    } = this.state

    const {
      focusedInput,
    } = this.props

    const {
      start,
      end,
    } = this.props.dates || {}

    return (
      <div className="ReactDates-overrides">
        {['single', 'today'].includes(preset)
          ? (
            <DayPickerSingleDateController
              numberOfMonths={2}
              daySize={40}
              navPrev={<IconArrowLeft />}
              navNext={<IconArrowRight />}
              date={start}
              onDateChange={this.handleDatesChange}
            />
          ) : (
            <DayPickerRangeController
              numberOfMonths={2}
              daySize={40}
              focusedInput={focusedInput}
              onFocusChange={this.handleFocusChange}
              navPrev={<IconArrowLeft />}
              navNext={<IconArrowRight />}
              startDate={start}
              endDate={end}
              onDatesChange={this.handleDatesChange}
            />
          )
        }
      </div>
    )
  }

  renderActions () {
    const { start, end } = this.props.dates || {}
    const { preset } = this.state

    let daysCount = 0

    if (['single', 'today'].includes(preset)) {
      daysCount = 1
    } else if (end) {
      daysCount = end.diff(start, 'days')
    }

    return (
      <div className={style.actions}>
        <caption>
          {daysCount === 0 ? 'Nenhum dia ou período selecionado' : null}
          {daysCount === 1 ? `${daysCount} dia selecionado` : null}
          {daysCount > 1 ? `${daysCount} dias selecionados` : null}
        </caption>
        <Button
          variant="clean"
          color="silver"
          size="small"
          onClick={() => this.handleCancel()}
        >
          Cancelar
        </Button>
        <Button
          variant="clean"
          size="small"
          onClick={() => this.handleConfirm()}
        >
          Confirmar Período
        </Button>
      </div>
    )
  }

  renderSidebar () {
    return (
      <div className={style.sidebar}>
        <ol>
          {this.renderPreset({
            key: 'today',
            title: 'Hoje',
            date: () => 0,
          })}
          {this.renderPresets(this.props.presets)}
          <li>
            <h2>Personalizado:</h2>
            <ol>
              {this.renderPreset({
                key: 'single',
                title: 'Dia',
                date: () => -1,
              })}
              {this.renderPreset({
                key: 'range',
                title: 'Período',
                date: () => -3,
              })}
            </ol>
          </li>
        </ol>
      </div>
    )
  }

  render () {
    return (
      <div className={style.container}>
        {this.renderSidebar()}
        <div className={style.stage}>
          {this.renderPicker()}
          {this.renderActions()}
        </div>
      </div>
    )
  }
}

DateSelector.propTypes = {
  onConfirm: func,
  onChange: func,
  onCancel: func,
  onFocusChange: func,
  dates: shape({
    start: momentObj,
    end: momentObj,
  }).isRequired,
  focusedInput: string,
  presets: arrayOf(shape({
    key: string,
    title: string,
    date: string,
    items: arrayOf(shape({
      title: string,
      date: func,
    })),
  })),
}

DateSelector.defaultProps = {
  onConfirm: () => undefined,
  onChange: () => undefined,
  onCancel: () => undefined,
  onFocusChange: () => undefined,
  focusedInput: START_DATE,
  presets: [],
}

