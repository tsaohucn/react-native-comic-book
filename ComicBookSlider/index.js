import React , { Component } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { Slider } from 'react-native-elements'

export default class ComicBookSlider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      opacity: 0
    }
  }

  onSlidingStart = value => {
    this.setState({
      opacity: 1
    })
    this.props.onSlidingStart && this.props.onSlidingStart(value)
  }

  onValueChange = value => {
    this.setState({value})
    this.props.onValueChange && this.props.onValueChange(value)
  }

  onSlidingComplete = value => {
    this.setState({
      opacity: 0
    }) 
    this.props.onSlidingComplete && this.props.onSlidingComplete(value)
  }

  setValue = value => {
    this.setState({value})    
  }

  render() {
    return(
      <View style={styles.renderSliderBar}>
       { this.props.showIndicator && Platform.OS === 'ios' &&
          <View style={[styles.indicator,{opacity: this.state.opacity}]}>
            <Text style={styles.text}>第一話</Text>
            <Text style={styles.text}>{(this.state.value + 1) + '/' + (this.props.maximumValue + 1)}</Text>
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
    top:-60,
    left: 7,
    width: 60,
    height: 55
  },
  trackStyle: {
    //height: 2,
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