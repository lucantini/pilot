import React from 'react'

import moment from 'moment'

import DateInput from '../../../src/components/Toolbar/DateInput'
import Toolbar from '../../../src/components/Toolbar'

import presets from '../../../src/shared/date-presets'

class DateInputExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: null,
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
    return (
      <Toolbar>
        <DateInput
          presets={presets}
          initialDates={{ start: moment(), end: moment() }}
          dates={this.state.dates}
          onChange={this.handleDatesChange}
          onFocusChange={this.onFocusChange}
          active={this.state.date}
        />
      </Toolbar>
    )
  }
}

export default DateInputExample
