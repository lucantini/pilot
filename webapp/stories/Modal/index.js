import React, { Component } from 'react'

import { storiesOf } from '@storybook/react'

import IconAddPhoto from 'react-icons/lib/md/add-a-photo'

import Modal from '../../src/components/Modal'
import Modal2 from '../../src/components/Modal2'

import {
  Card,
  CardContent,
  CardTitle,
  CardActions,
} from '../../src/components/Card'
import Button from '../../src/components/Button'

class ModalWithState extends Component {
  constructor () {
    super()

    this.state = {
      isOpen: false,
    }

    this.handleToggleModal = this.handleToggleModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleToggleModal () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleCloseModal () {
    this.setState({ isOpen: false })
  }

  render () {
    return (
      <div>
        {/* call to action to open the modal */}
        <Button
          variant="dashed"
          color="silver"
          onClick={this.handleToggleModal}
        >
          <IconAddPhoto /> Add Photo
        </Button>

        {/* modal content definition */}
        <Modal
          label="Create a Transaction"
          isOpen={this.state.isOpen}
        >
          <Card>
            <CardTitle icon={<IconAddPhoto />}>Add Photo</CardTitle>
            <CardContent>
              This is the modal Content with React Modal module
            </CardContent>
            <CardActions>
              <Button color="red" variant="dashed">Cancel</Button>
              <Button color="green-primary" variant="dashed">Confirm</Button>
            </CardActions>
          </Card>
        </Modal>
      </div>
    )
  }
}

storiesOf('Modal', module)
  .add('react-modal', () => (
    <ModalWithState />
  ))
  .add('react-toolbox', () => (
    <Modal2>This is the modal Content with React Toolbox dialog</Modal2>
  ))
