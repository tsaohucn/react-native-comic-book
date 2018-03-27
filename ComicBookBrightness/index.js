import React , { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import DeviceBrightness from 'react-native-device-brightness'

export default class ComicBookBrightness extends Component {

  constructor(props) {
    super(props)
    this.state = {
      britness: 0,
    }
  }

  onBrightness = () => {
    if (this.state.britness === 0) {
      DeviceBrightness.setBrightnessLevel(0.2)
      this.setState({
        britness: 1
      })
    } else {
      DeviceBrightness.setBrightnessLevel(0.9)
      this.setState({
        britness: 0
      })    
    }
  }

  render() {
    return(
        <TouchableWithoutFeedback
          onPress={this.onBrightness} 
        >
          <View style={styles.iconView}>
            <Icon
              name='shield-half-full'
              type='material-community'
              color='white'
            />
            <Text style={styles.iconText}>{this.state.britness == 0 ? '夜間' : '日間'}</Text> 
          </View> 
        </TouchableWithoutFeedback> 
    )
  }
}

const styles =  StyleSheet.create({ 
  iconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    color: 'white'
  }
})

