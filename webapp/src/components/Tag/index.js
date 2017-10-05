import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/Button'

import style from './style.css'

const Tag = ({ text }) => (
  <div>
    <Button
      variant="dashed"
      color="silver"
      size="micro"
      className={style.tag}
    >
      {text}
    </Button>
  </div>
)

Tag.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Tag
