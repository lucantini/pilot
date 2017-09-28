import React from 'react'

import { storiesOf } from '@storybook/react'

import Modal from '../../src/components/Modal'
import Modal2 from '../../src/components/Modal2'

storiesOf('Modal', module)
  .add('react-modal', () => (
    <Modal>This is the modal Content with React Modal module</Modal>
  ))
  .add('react-toolbox', () => (
    <Modal2>This is the modal Content with React Toolbox dialog</Modal2>
  ))
