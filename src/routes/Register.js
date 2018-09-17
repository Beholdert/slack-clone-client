import React from 'react';
import { Form, Message, Button, Container, Header } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';

class Register extends React.Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onClick = async () => {
    this.setState({
      usernameError: '',
      passwordError: '',
      emailError: ''
    });

    const { username, email, password } = this.state;

    console.log(this.state);
    const response = await this.props.mutate({
      variables: { username, email, password }
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
      console.log(this.state);
    }
    console.log(response);
  };

  render() {
    const errorList = [];

    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError
    } = this.state;

    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text textAlign="center">
        <Form>
          <Header as="h2">Register</Header>
          <Form.Field>
            <input
              error={!!usernameError}
              name="username"
              onChange={this.onChange}
              placeholder="Username"
              value={username}
              fluid
            />
          </Form.Field>
          <Form.Field>
            <input
              error={!!emailError}
              name="email"
              onChange={this.onChange}
              placeholder="Email"
              value={email}
              fluid
            />
          </Form.Field>
          <Form.Field>
            <input
              error={!!passwordError}
              name="password"
              onChange={this.onChange}
              placeholder="Password"
              value={password}
              fluid
              type="password"
            />
          </Form.Field>
          {usernameError || emailError || passwordError ? (
            <Message error header="There were some errors" list={errorList} />
          ) : null}
          <Button onClick={this.onClick} primary>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $password: String!, $email: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
