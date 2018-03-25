import React , { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Slider } from 'react-native-elements'

export default class ComicBookSlider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  render() {
    return(
      <View style={styles.renderSliderBar}>
        <Slider
          style={this.props.style}
          trackStyle={styles.trackStyle}
          value={this.state.value}
          onValueChange={(value) => {
            this.setState({value})
          }} 
          minimumTrackTintColor={'white'}
          maximumTrackTintColor={'grey'}
          thumbTintColor={'white'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  trackStyle: {
    height: 2
  },
  renderSliderBar: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }  
})