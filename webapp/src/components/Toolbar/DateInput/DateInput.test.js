import React from 'react'
import { mount } from 'enzyme'

import DateInput from './index'

describe('DatePicker', () => {
  it('should mount', () => {
    const onChange = jest.fn()

    mount(
      <DateInput
        presets={[]}
        onChange={onChange}
      />
    )
  })
})
