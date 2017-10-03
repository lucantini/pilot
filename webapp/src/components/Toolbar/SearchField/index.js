import React from 'react'
import IconSearch from 'react-icons/lib/md/search'
import {
  func,
  string,
  bool,
} from 'prop-types'

import style from './style.css'
import toolItemStyle from '../style.css'

const SearchField = ({
  disabled,
  onChange,
  value,
}) => (
  <div className={toolItemStyle.root}>
    <span className={style.icon}>
      <IconSearch />
    </span>

    <div className={style.inputWrap}>
      <input
        disabled={disabled}
        onChange={e => !disabled && onChange(e.target.value)}
        value={value}
        className={style.input}
        type="search"
      />
    </div>
  </div>
)

SearchField.propTypes = {
  onChange: func.isRequired,
  value: string.isRequired,
  disabled: bool,
}

SearchField.defaultProps = {
  disabled: false,
}

export default SearchField
