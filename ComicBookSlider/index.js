import React , { Component } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
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
          style={styles.slider}
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

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  slider: {
    width: width*0.8
  },
  trackStyle: {
    height: 2
  },
  renderSliderBar: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }  
})