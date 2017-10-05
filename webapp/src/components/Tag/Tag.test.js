import React from 'react'
import { shallow } from 'enzyme'

import Tag from './index'

describe('Tag', () => {
  it('should mount', () => {
    shallow(
      <Tag
        text="hi"
      />
    )
  })

  it('should not call onClick', () => {
    const onClick = jest.fn()

    const component = shallow(
      <Tag
        text="hi"
      />
    )

    component.simulate('click')

    expect(onClick).toHaveBeenCalledTimes(0)
  })
})
