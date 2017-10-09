import React from 'react'

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
          presets={presets}
          onChange={this.handleDatesChange}
        />
      </Toolbar>
    )
  }
}

export default DateInputExample