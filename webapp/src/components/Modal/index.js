import React from 'react'
import { node, bool, string } from 'prop-types'

import ReactModal from 'react-modal'

import style from './style.css'

const Modal = (props) => {
  const {
    children,
    isOpen,
    overlayClick,
    label,
  } = props

  return (
    <ReactModal
      isOpen={isOpen}
      role="dialog"
      shouldCloseOnOverlayClick={overlayClick}
      parentSelector={() => document.body}
      overlayClassName={style.overlay}
      className={style.modal}
      contentLabel={label}
    >
      {children}
    </ReactModal>
  )
}

Modal.propTypes = {
  children: node.isRequired,
  isOpen: bool.isRequired,
  overlayClick: bool,
  label: string.isRequired,
}

Modal.defaultProps = {
  overlayClick: true,
}

export default Modal
