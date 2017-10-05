import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Tag from '../../src/components/Tag'

storiesOf('Tags', module)
  .add('default', () => (
    <Tag text="Curta aqui" />
  ))
