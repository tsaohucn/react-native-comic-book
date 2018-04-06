import React from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback 
} from 'react-native'
import { Icon } from 'react-native-elements'
import ComicBookSlider from './ComicBookSlider'

const SliderBar = ({ animatedSliderBarY, onSlidingComplete, maximumValue }) => (
  <Animated.View style={[styles.sliderBarAnimated,{
    transform: [
      { translateY: animatedSliderBarY }
    ]}]}
  >
    <TouchableWithoutFeedback>
      <View style={styles.iconView}>
        <Icon
          name='page-first'
          type='material-community'
          color='white'
        />
      </View>
        </TouchableWithoutFeedback>
          <View style={styles.sliderView}>
            <ComicBookSlider 
              showIndicator
              style={styles.slider}
              onSlidingComplete={onSlidingComplete}
              step={1}
              maximumValue={maximumValue}
            />
          </View>
        <TouchableWithoutFeedback>
        <View style={styles.iconView}>
          <Icon
            name='page-last'
            type='material-community'
            color='white'
          />
      </View>
    </TouchableWithoutFeedback>
  </Animated.View>
)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  sliderBarAnimated: {
    position: 'absolute',
    bottom: 0,
    width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  sliderView: {
    flex: 6,
  },
  slider: {
    width: width*5/7
  }
})

export default SliderBar