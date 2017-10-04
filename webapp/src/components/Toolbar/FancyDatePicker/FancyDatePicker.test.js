import React from 'react'
import { mount } from 'enzyme'

import DatePicker from './index'

describe('DatePicker', () => {
  it('should mount', () => {
    const onChange = jest.fn()

    mount(
      <DatePicker onChange={onChange} />
    )
  })
})
