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

    this.dateSelectorId = `dateselector-${shortid()}`

    this.handleFocusChange = this.handleFocusChange.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentWillReceiveProps ({ presets }) {
    if (presets && presets.length > 0) {
      this.setState({ preset: presets[0].title })
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

  handleDatesChange (dates) {
    if (is(Number, dates)) {
      this.setState({
        dates: {
          start: moment().add(-dates, 'day').startOf('day'),
          end: moment().endOf('day'),
        },
      })

      return
    }

    const { startDate: start, endDate: end } = dates

    this.setState({ dates: { start, end } })
  }

  handlePresetChange (preset, callback) {
    this.setState({ preset })
    callback()
  }

  handleConfirm () {
    this.props.onDatesChange(this.state.dates)
  }

  handleCancel () {
    this.props.onCancel()
  }

  renderPreset ({ title, onClick }) {
    const name = `${this.dateSelectorId}-radiogroup`
    const id = `${this.dateSelectorId}-radio-id-${title}`
    const { preset } = this.state

    return (
      <li>
        <input
          type="radio"
          name={name}
          id={id}
          onClick={evt => this.handlePresetChange(title, onClick, evt)}
          checked={preset === title}
        />
        <label htmlFor={id}>
          {title}
        </label>
      </li>
    )
  }

  renderPresets (presets) {
    return presets.map(({ date, items, title }) => {
      if (items) {
        return (
          <ol>
            <h2>{title}</h2>
            {this.renderPresets(items)}
          </ol>
        )
      }

      return this.renderPreset({
        onClick: () => this.handleDatesChange(date()),
        title,
      })
    })
  }


  render () {
    return (
      <div className={`ReactDates-overrides ${style.container}`}>
        <div className={style.sidebar}>
          <ol>
            {this.renderPresets(this.props.presets)}
            <li>
              <h2>Personalizado:</h2>
              <ol>
                {this.renderPreset({
                  title: 'Dia',
                  onClick: () => this.handleDatesChange(1),
                })}
                {this.renderPreset({
                  title: 'Período',
                  onClick: () => this.handleDatesChange(7),
                })}
              </ol>
            </li>
          </ol>
        </div>
        <div className={style.stage}>
          <div>
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
          <div className={style.actions}>
            <caption>
              {this.state.dates.end
                ? `${this.state.dates.end.diff(this.state.dates.start, 'days')} `
                : '0 '
              }
              dias selecionados
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
        </div>
      </div>
    )
  }
}

DateSelector.propTypes = {
  onDatesChange: func,
  onCancel: func,
  presets: arrayOf(shape({
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

