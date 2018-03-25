import React , { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Slider } from 'react-native-elements'

export default class ComicBookSlider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      display: 'none'
    }
  }

  onSlidingStart = () => {
    this.setState({
      display: null
    })
  }

  onValueChange = value => {
    this.setState({value})
    this.props.onValueChange && this.props.onValueChange(value)
  }

  onSlidingComplete = value => {
    this.setState({
      display: 'none'
    }) 
    this.props.onSlidingComplete && this.props.onSlidingComplete(value)
  }

  render() {
    return(
      <View style={styles.renderSliderBar}>
        { this.props.showIndicator &&
          <View display={this.state.display} style={styles.indicator}>
            <Text style={styles.text}>第一話</Text>
            <Text style={styles.text}>{this.state.value + '/' + this.props.maximumValue}</Text>
          </View>
        }
        <Slider
          {...this.props}
          trackStyle={styles.trackStyle}
          value={this.state.value}
          onSlidingStart={this.onSlidingStart}
          onValueChange={this.onValueChange} 
          onSlidingComplete={this.onSlidingComplete}
          minimumTrackTintColor={'white'}
          maximumTrackTintColor={'grey'}
          thumbTintColor={'white'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)', 
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    top: -60,
    left: 7,
    width: 60,
    height: 55
  },
  trackStyle: {
    height: 2
  },
  renderSliderBar: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }  
})