import React from 'react';
import { extendObservable } from 'mobx';
import { Form, Button, Message, Container, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onClick = async () => {
    this.emailError = '';
    this.passwordError = '';
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password }
    });

    const { ok, token, refreshToken, errors } = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.push('/view_team');
    } else {
      errors.forEach(e => {
        this[`${e.path}Error`] = e.message;
      });
    }

    console.log(response);
  };

  render() {
    const { email, password, emailError, passwordError } = this;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text textAlign="center">
        <Form>
          <Header as="h2">Login</Header>
          <Form.Field>
            <Form.Input
              error={!!emailError}
              name="email"
              onChange={this.onChange}
              placeholder="Email"
              value={email}
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Form.Input
              name="password"
              onChange={this.onChange}
              placeholder="Password"
              value={password}
              type="password"
            />
          </Form.Field>
          <Button onClick={this.onClick} primary>
            Submit
          </Button>
        </Form>
        {emailError || passwordError ? (
          <Message error header="There were some errors" list={errorList} />
        ) : null}
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
