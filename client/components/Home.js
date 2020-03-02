import React from 'react'
import {connect} from 'react-redux'

const Home = props => {
  const {user} = props
  return (
    <div>
      <h3>Welcome, {user.email}!</h3>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})
export default connect(mapState)(Home)
