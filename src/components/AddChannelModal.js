import React from 'react';
import { Button, Input, Form, Modal } from 'semantic-ui-react';

const AddChannelModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input fluid placeholder="Channel name" />
        </Form.Field>
        <Form.Field>
          <Button primary fluid>
            Create Channel
          </Button>
        </Form.Field>
        <Form.Field>
          <Button onClick={onClose} fluid>
            Cancel
          </Button>
        </Form.Field>
      </Form>
    </Modal.Content>
  </Modal>
);

export default AddChannelModal;
