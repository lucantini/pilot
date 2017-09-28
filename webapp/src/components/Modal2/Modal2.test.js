import React from 'react'

import { shallow } from 'enzyme'

import Modal from './index'


describe('Modal', () => {
  it('should mount', () => {
    shallow(<Modal>Modal Content</Modal>)
  })
})
