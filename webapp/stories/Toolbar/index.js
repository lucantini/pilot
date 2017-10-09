import React, { Component } from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

// TODO: move those to examples too.
import './DateRange'
import './SearchField'

import DateInputExample from './examples/DateInputExample'

storiesOf('Toolbar', module)
  .add('DateInput', () => (
    <DateInputExample />
  ))
