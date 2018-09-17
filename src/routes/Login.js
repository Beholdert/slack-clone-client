import React from 'react';
import { extendObservable } from 'mobx';
import { Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { gql, graphql } from 'react-apollo';

class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: ''
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onClick = async e => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password }
    });

    const { ok, token, refreshToken } = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }

    console.log(response);
  };

  render() {
    const { email, password } = this;

    return (
      <Container text textAlign="center">
        <Form>
          <Header as="h2">Register</Header>
          <Form.Field>
            <Form.Input
              name="email"
              onChange={this.onChange}
              placeholder="Email"
              value={email}
              fluid
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              name="password"
              onChange={this.onChange}
              placeholder="Password"
              value={password}
              fluid
              type="password"
            />
          </Form.Field>
          <Button onClick={this.onClick} primary>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
