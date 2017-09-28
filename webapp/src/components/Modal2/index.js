import React from 'react'
import { node } from 'prop-types'

import Dialog from 'react-toolbox/lib/dialog'

import Button from '../Button'

import style from './style.css'

export default class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
    }

    this.handleToggleModal = this.handleToggleModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleToggleModal () {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  handleCloseModal () {
    this.setState({
      isOpen: false,
    })
  }

  render () {
    const {
      isOpen,
    } = this.state

    const {
      children,
    } = this.props

    return (
      <div className={style.root}>
        <Button onClick={this.handleToggleModal}>Adicionar Transação</Button>
        <Dialog
          actions={[
            { label: 'Cancel', onClick: this.handleToggleModal },
            { label: 'Save', onClick: this.handleCloseModal },
          ]}
          active={isOpen}
          title="My Modal"
        >
          <div>
            <Button onClick={this.handleCloseModal}>Close Modal</Button>
          </div>
          {children}
        </Dialog>
      </div>
    )
  }
}

Modal.propTypes = {
  children: node.isRequired,
}
