import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import stylesheet from './style.css'


function Button ({ className, onClick, variant, base, color, size, children, type }) {
  const buttonClasses = classNames(
    className,
    stylesheet.button,
    stylesheet[variant],
    stylesheet[`${base}-${variant}`],
    stylesheet[`${base}-${color}`],
    stylesheet[size]
  )

  return (
    <button className={buttonClasses} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    'flat', 'gradient', 'outline', 'dashed', 'clean', 'block',
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
  className: PropTypes.string,
}

Button.defaultProps = {
  onClick: null,
  variant: 'flat',
  base: 'light',
  color: 'green-primary',
  size: 'medium',
  type: 'button',
  className: null,
}

export default Button
