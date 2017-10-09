import React from 'react'

import { storiesOf } from '@storybook/react'

import { action } from '@storybook/addon-actions'

import DateSelector from '../../src/components/DateSelector'

import style from './style.css'

const presets = [
  {
    title: 'Ultimos:',
    items: [
      {
        key: 'last-7',
        title: '7 dias',
        date: () => 7,
      },
      {
        key: 'last-15',
        title: '15 dias',
        date: () => 15,
      },
      {
        key: 'last-30',
        title: '30 dias',
        date: () => 30,
      },
      {
        key: 'last-60',
        title: '60 dias',
        date: () => 60,
      },
    ],
  },
]


storiesOf('DateSelector', module)
  .add('All types', () => (
    <div className={style.container}>
      <DateSelector
        presets={presets}
        onSubmit={action('onSubmit')}
        onCancel={action('onCancel')}
      />
    </div>
  ))
