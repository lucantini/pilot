import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import stylesheet from './style.css'


function Button (
  { disabled, onClick, variant, base, color, size, children, type }
) {
  const buttonClasses = classNames(
    stylesheet.button,
    stylesheet[variant],
    stylesheet[`${base}-${variant}`],
    stylesheet[`${base}-${color}`],
    stylesheet[size]
  )

  return (
    <button
      disabled={disabled}
      className={buttonClasses}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    'flat', 'gradient', 'outline', 'clean', 'block',
  ]),
  base: PropTypes.oneOf([
    'dark', 'light',
  ]),
  color: PropTypes.oneOf([
    'green-primary', 'green-secondary', 'green-contrast', 'green-accent',
    'silver', 'plumb', 'yellow', 'red', 'blue',
    'purple', 'purple-accent', 'pink', 'pink-accent',
  ]),
  size: PropTypes.oneOf([
    'micro', 'tiny', 'small', 'medium', 'large',
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  onClick: null,
  variant: 'flat',
  base: 'light',
  color: 'green-primary',
  size: 'medium',
  type: 'button',
  disabled: false,
}

export default Button
