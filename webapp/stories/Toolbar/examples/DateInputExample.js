import React from 'react'

import moment from 'moment'

import DateInput from '../../../src/components/Toolbar/DateInput'
import Toolbar from '../../../src/components/Toolbar'

import presets from '../../../src/shared/date-presets'

class DateInputExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      date: null,
    }

    this.handleDatesChange = this.handleDatesChange.bind(this)
  }

  handleDatesChange (date) {
    this.setState({ date })
  }

  render () {
    return (
      <Toolbar>
        <DateInput
          initialDate={{
            start: moment(),
            end: moment().subtract(10, 'days'),
          }}
          presets={presets}
          onChange={this.handleDatesChange}
          active={this.state.date}
        />
      </Toolbar>
    )
  }
}

export default DateInputExample
