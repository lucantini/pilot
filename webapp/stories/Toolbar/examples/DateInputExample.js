import React from 'react'

import moment from 'moment'

import DateInput from '../../../src/components/Toolbar/DateInput'
import Toolbar from '../../../src/components/Toolbar'

import presets from '../../../src/shared/datePresets'

import rootStyle from '../style.css'

class DateInputExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: {
        start: null,
        end: null,
      },
      focusedInput: 'startDate',
    }

    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
  }

  handleFocusChange (focusedInput) {
    this.setState({ focusedInput })
  }

  handleDatesChange (dates) {
    this.setState({ dates })
  }

  render () {
    const { dates } = this.state
    return (
      <main className={rootStyle.main}>
        <h1>DateInput usage</h1>

        <section>
          <h2>with minimal setup</h2>

          <Toolbar>
            <DateInput
              presets={presets}
              dates={dates}
              onChange={this.handleDatesChange}
              active={dates.start && dates.end}
            />
          </Toolbar>
        </section>

        <section>
          <h2>with initialDates</h2>

          <Toolbar>
            <DateInput
              presets={presets}
              initialDates={{ start: moment(), end: moment() }}
              dates={dates}
              onChange={this.handleDatesChange}
              onFocusChange={this.onFocusChange}
              active={dates.start && dates.end}
            />
          </Toolbar>
        </section>

        <section>
          <h2>with initialDates period</h2>

          <Toolbar>
            <DateInput
              presets={presets}
              initialDates={{ start: moment(), end: moment().subtract(7, 'days') }}
              dates={dates}
              onChange={this.handleDatesChange}
              onFocusChange={this.onFocusChange}
              active={dates.start && dates.end}
            />
          </Toolbar>
        </section>

        <section>
          <h2>with initialDates with null end</h2>

          <Toolbar>
            <DateInput
              presets={presets}
              initialDates={{ start: moment() }}
              dates={dates}
              onChange={this.handleDatesChange}
              onFocusChange={this.onFocusChange}
              active={dates.start && dates.end}
            />
          </Toolbar>
        </section>

        <section>
          <h2>with initialDates all null</h2>

          <Toolbar>
            <DateInput
              presets={presets}
              dates={dates}
              initialDates={{ start: null, end: null }}
              onChange={this.handleDatesChange}
              onFocusChange={this.onFocusChange}
              active={dates.start && dates.end}
            />
          </Toolbar>
        </section>
      </main>
    )
  }
}

export default DateInputExample
