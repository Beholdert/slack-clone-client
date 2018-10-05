import React from 'react';
import { Button, Input, Form, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';

import findIndex from 'lodash/findIndex';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import { allTeamsQuery } from '../graphql/team';

const AddChannelModal = ({
  values,
  open,
  onClose,
  isSubmitting,
  handleSubmit,
  handleChange
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.name}
            name="name"
            fluid
            placeholder="Channel name"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Button onClick={onClose} fluid disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            primary
            fluid
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Create Channel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      setSubmitting(true);
      await mutate({
        variables: { teamId, name: values.name },
        optimisticResponse: {
          __typename: 'Mutation',
          createChannel: {
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name
            }
          }
        }
      });
    }
  })
)(AddChannelModal);
