import React from 'react'

import { storiesOf } from '@storybook/react'

import { action } from '@storybook/addon-actions'

import DateSelector from '../../src/components/DateSelector'

const presets = [
  {
    title: 'Hoje',
    date: () => 1,
  },
  {
    title: 'Ultimos',
    items: [
      {
        title: '7 dias',
        date: () => 7,
      },
      {
        title: '15 dias',
        date: () => 15,
      },
      {
        title: '30 dias',
        date: () => 30,
      },
      {
        title: '60 dias',
        date: () => 60,
      },
    ],
  },
]


storiesOf('DateSelector', module)
  .add('All types', () => (
    <div>
      <DateSelector
        presets={presets}
        onDatesChange={action('onDatesChange')}
        onCancel={action('onCancel')}
      />
    </div>
  ))
