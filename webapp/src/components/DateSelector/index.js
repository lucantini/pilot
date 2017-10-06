import React, { Component } from 'react'
import {
  func,
  string,
  arrayOf,
  shape,
} from 'prop-types'

import { DayPickerRangeController } from 'react-dates'

import { is } from 'ramda'

import IconArrowLeft from 'react-icons/lib/fa/angle-left'
import IconArrowRight from 'react-icons/lib/fa/angle-right'

import shortid from 'shortid'
import moment from 'moment'

import 'react-dates/css/styles.scss'

import Button from '../Button'

import style from './style.css'
import './react-dates.scss'

const START_DATE = 'startDate'


export default class DateSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      preset: null,
      dates: { start: null, end: null },
      focusedInput: START_DATE,
    }

    this.instanceId = `dateselector-${shortid()}`

    this.handleFocusChange = this.handleFocusChange.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentWillReceiveProps ({ presets }) {
    if (presets && presets.length > 0) {
      const { key, date } = presets[0]
      this.handleDatesChange(date(), key)
    }
  }

  handleFocusChange (focusedInput) {
    if (focusedInput === null) {
      this.setState({
        focusedInput: START_DATE,
      })

      return
    }

    this.setState({ focusedInput })
  }

  handleDatesChange (dates, presetKey) {
    if (is(Number, dates)) {
      const preset = presetKey || (dates > 1 ? 'range' : 'day')

      this.setState({
        dates: {
          start: moment().add(-dates, 'day').startOf('day'),
          end: moment().endOf('day'),
        },
        preset,
      })

      return
    }

    const { startDate: start, endDate: end } = dates

    const preset = presetKey || 'range'

    this.setState({
      dates: { start, end },
      preset,
    })
  }

  handleConfirm () {
    this.props.onDatesChange(this.state.dates)
  }

  handleCancel () {
    this.props.onCancel()
  }

  renderPreset ({ title, key, date }) {
    const { preset } = this.state

    const group = `${this.instanceId}-presets`
    const selectedId = `${this.instanceId}-preset-${preset}`
    const id = `${this.instanceId}-preset-${key}`

    return (
      <li>
        <input
          type="radio"
          name={group}
          id={id}
          onClick={() => this.handleDatesChange(date(), key)}
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
          <ol>
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
    return (
      <div className="ReactDates-overrides">
        <DayPickerRangeController
          numberOfMonths={2}
          daySize={40}
          focusedInput={this.state.focusedInput}
          onFocusChange={this.handleFocusChange}
          navPrev={<IconArrowLeft />}
          navNext={<IconArrowRight />}
          customArrowIcon={<i className={style.calendarCustomArrow} />}
          horizontalMargin={24 / 2}
          startDate={this.state.dates.start}
          endDate={this.state.dates.end}
          onDatesChange={this.handleDatesChange}
        />
      </div>
    )
  }

  renderActions () {
    const { start, end } = this.state.dates

    const daysCount = end ? end.diff(start, 'days') : 0

    return (
      <div className={style.actions}>
        <caption>
          {daysCount === 0 ? 'Nenhum dia ou período selecionado' : null}
          {daysCount === 1 ? `${daysCount} dia selecionado` : null}
          {daysCount > 1 ? `${daysCount} dias selecionados` : null}
        </caption>
        <Button
          variant="clean"
          color="gray"
          size="small"
          onClick={this.handleCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="clean"
          size="small"
          onClick={this.handleConfirm}
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
          {this.renderPresets(this.props.presets)}
          <li>
            <h2>Personalizado:</h2>
            <ol>
              {this.renderPreset({
                key: 'single',
                title: 'Dia',
                date: () => 1,
              })}
              {this.renderPreset({
                key: 'range',
                title: 'Período',
                date: () => 7,
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
  onDatesChange: func,
  onCancel: func,
  presets: arrayOf(shape({
    key: string,
    title: string,
    date: string,
    items: arrayOf({
      title: string,
      date: func,
    }),
  })),
}

DateSelector.defaultProps = {
  onDatesChange: () => undefined,
  onCancel: () => undefined,
  presets: [],
}

