import React from 'react';
import { Form, Message, Button, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreateTeam extends React.Component {
  componentWillUnmount() {
    console.log('unmount');
  }
  state = {
    name: '',
    nameError: ''
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onClick = async () => {
    const { name } = this.state;

    try {
      const {
        data: {
          createTeam: {
            team: { id }
          }
        }
      } = await this.props.mutate({
        variables: { name }
      });

      console.log(id);
      this.props.history.push(`/view_team/${id}`);
    } catch (error) {
      console.log(error);
      this.props.history.push('/login');
    }
  };

  render() {
    const errorList = [];

    const { name, nameError } = this.state;

    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container text textAlign="center">
        <Form>
          <Header as="h2">Create Team</Header>
          <Form.Field error={!!nameError}>
            <input
              name="name"
              onChange={this.onChange}
              placeholder="name"
              value={name}
            />
          </Form.Field>
          <Button onClick={this.onClick} primary>
            Submit
          </Button>
        </Form>
        {nameError ? (
          <Message error header="There were some errors" list={errorList} />
        ) : null}
      </Container>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(CreateTeam);
