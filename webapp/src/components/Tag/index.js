import React from 'react'
import PropTypes from 'prop-types'

import style from './style.css'

const Tag = ({ text }) => (
  <div className={style.tag}>
    {text}
  </div>
)

Tag.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Tag
