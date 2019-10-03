import React, { Component } from 'react';
import Faker from 'faker';

class FakerBuild extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }

  componentWillMount() {
    for (let i = 0; i < 5; i++) {
      const user = {
        name: Faker.internet.userName(),
        email: Faker.internet.email(),
        avatar: Faker.internet.avatar(),
      }
      this.setState(prevState => ({
        users: [...prevState.users, user],
      }))
    }
  }

  renderUsers(user) {
    return (
      <div style={{ border: 'solid 1px #eee' }}>
        <img src={user.avatar} alt={user.name} width="50" height="50" />
        <h4>Name: {user.name}</h4>
        <h4>Email: {user.email}</h4>
      </div>
    )
  }

  render() {
    return <div>{this.state.users.map(user => this.renderUsers(user))}</div>
  }
}

export default FakerBuild;