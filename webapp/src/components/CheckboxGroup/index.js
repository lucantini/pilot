import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  append,
  contains,
  equals,
  filter,
  pipe,
  not,
  partial,
  splitEvery,
} from 'ramda'
import Checkbox from '../Checkbox'

import style from './style.css'

class CheckboxGroup extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    const { disabled, values, onChange } = this.props

    if (disabled) return

    const valueIndex = values.indexOf(value)

    const nextValues = valueIndex >= 0
      ? filter(pipe(equals(value), not), values)
      : append(value, values)

    onChange(nextValues)
  }

  render () {
    const {
      disabled,
      name,
      values,
      error,
      success,
      options,
      className,
      columns,
    } = this.props

    const secondaryTextClass = classnames(style.secondaryText, {
      [style.error]: error,
      [style.success]: success,
    })

    const rootClassName = classnames(
      style.root,
      className
    )

    const elementsByColumn = Math.ceil(options.length / columns)

    const optionsSplitted =
      splitEvery(elementsByColumn, options)

    const hashList = list => list.map(({ value }) => `${value}`).join('')

    const checkboxes =
      optionsSplitted.map(list => (
        <div key={hashList(list)}>
          {
            list.map(({ value, label }) => (
              <Checkbox
                key={`${name}-${value}`}
                name={`${name}-${value}`}
                id={`${name}-${value}`}
                value={value}
                label={label}
                checked={contains(value, values)}
                onChange={partial(this.handleChange, [value])}
                disabled={disabled}
              />
            ))
          }
        </div>
      ))

    return (
      <div className={rootClassName}>
        {(success || error) &&
          <p className={secondaryTextClass}>
            {success || error}
          </p>
        }
        <div>
          {checkboxes}
        </div>
      </div>
    )
  }
}

CheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  className: PropTypes.string,
  columns: PropTypes.number,
}

CheckboxGroup.defaultProps = {
  disabled: false,
  error: '',
  success: '',
  className: null,
  columns: 1,
}

export default CheckboxGroup
