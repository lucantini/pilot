import React from 'react'
import { mount } from 'enzyme'

import DateInput from './index'

import presets from '../../../shared/date-presets'

describe('DatePicker', () => {
  it('should mount', () => {
    const onChange = jest.fn()

    mount(
      <DateInput
        presets={presets}
        onChange={onChange}
      />
    )
  })
})
