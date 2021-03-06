import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Form, Segment, Icon} from 'semantic-ui-react'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%'
      }}
    >
      <Segment
        style={{
          margin: '30px',
          width: '50%',
          height: '45%'
        }}
      >
        <Form onSubmit={handleSubmit} name={name}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Email"
              placeholder="Email"
              name="email"
              type="text"
              id="form-input-first-name"
            />
            <Form.Input
              style={{paddingRight: '20px'}}
              fluid
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
            />
          </Form.Group>
          <Button type="submit">{displayName}</Button>
          {error && error.response && <div> {error.response.data} </div>}
          <Button color="google plus">
            <Icon name="google" />

            <a style={{color: 'white'}} href="/auth/google">
              {displayName} with Google
            </a>
          </Button>
        </Form>
      </Segment>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
