import React from 'react'

import { storiesOf } from '@storybook/react'

import Modal from '../../src/components/Modal'

storiesOf('Modal', module)
  .add('react-modal', () => (
    <Modal>This is the modal Content</Modal>
  ))
