import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/Button'

import style from './style.css'

const Tag = ({ text, size }) => (
  <div>
    <Button
      variant="dashed"
      color="silver"
      size={size}
      className={style.tag}
    >
      {text}
    </Button>
  </div>
)

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf([
    'micro', 'tiny', 'small', 'medium', 'large',
  ]),
}

Tag.defaultProps = {
  size: 'micro',
}

export default Tag
