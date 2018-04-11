import React , { Component } from 'react'
import { Switch } from 'react-native'

export default class ComicBookSwitch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: true,
    }
  }

  onValueChange = () => {
    this.setState({
      value: !this.state.value
    })
  }

  render() {
    return(
      <Switch
        value={this.state.value}
        onValueChange={this.onValueChange}
      />
    )
  }
}

