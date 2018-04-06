import React, { Component } from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback ,
  Platform
} from 'react-native'
import { Icon } from 'react-native-elements'
import ComicBookSlider from './ComicBookSlider'
import ComicBookSwitch from './ComicBookSwitch'

export default class ConfigBar extends Component {

  constructor(props) {
    super(props)
  }

  setValue = (value,done) => {
    this.ComicBookSlider.setValue(value,done)
  }

  render() {
    return (
      <Animated.View style={[styles.configBarAnimated,{
        transform: [
          { translateY: this.props.animatedConfigBarY }
        ]}]}
      >
        <View style={styles.configBarRawView}>
          <View style={styles.lightTextView}>
            <Text style={styles.titleText}>亮度調節</Text>
          </View>
          <View style={styles.decagram}>
            <Icon
              name='decagram'
              type='material-community'
              color='white'
            />
          </View>
          <View style={styles.lightSliderView}>
            <ComicBookSlider 
              ref={ref => this.ComicBookSlider = ref}
              style={styles.lightSlider}
              //onSlidingStart={this.onLightSlidingStart}
              onValueChange={this.props.onLightValueChange}
            />
          </View>
          <View style={styles.decagramoutline}>
            <Icon
              name='decagram-outline'
              type='material-community'
              color='white'
            />
          </View>
        </View>

        <View style={styles.configBarRawView}>
          <View style={styles.configBarItem}>
            <Text style={styles.titleText}>閱讀模式</Text>
          </View>
          <View style={styles.readStyle}>
            <Icon
              name='book-open'
              type='material-community'
              color='white'
            />
            <Text style={styles.titleText}>普通模式</Text>
          </View>
          <View style={styles.readStyle}>
            <Icon
              name='book-open-page-variant'
              type='material-community'
              color='white'
            />
            <Text style={styles.titleText}>日漫模式</Text>
          </View>
          <View style={styles.readStyle}>
            <Icon
              name='book-open-variant'
              type='material-community'
              color='white'
            />
            <Text style={styles.titleText}>捲軸模式</Text>
          </View>

          <View style={styles.nonReadStyle}/>
        </View>

        <View style={styles.configBarRawView}>
          <View style={styles.configBarItem}>
            <Text style={styles.titleText}>橫豎屏</Text>
          </View>
          <View style={styles.readStyle}>
            <Icon
              name='desktop-mac'
              type='material-community'
              color='white'
            />
            <Text style={styles.titleText}>橫屏</Text>
          </View>
          <View style={styles.readStyle}>
            <Icon
              name='desktop-classic'
              type='material-community'
              color='white'
            />
            <Text style={styles.titleText}>豎屏</Text>
          </View>

          <View style={styles.nonReadStyle}/>
          <View style={styles.nonReadStyle}/>
        </View>

        <View style={styles.configBarRawView}>
          <View style={styles.configBarItem}>
            <Text style={styles.titleText}>顯示單章節評論</Text>
          </View>
          <ComicBookSwitch/>
        </View>
      </Animated.View>    
    )  
  }
}

const { width, height } = Dimensions.get('window')

const configBarHeight = height*1/2

const styles = StyleSheet.create({
  configBarAnimated: {
    position: 'absolute', 
    height: configBarHeight,
    width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    bottom: 0
  },
  configBarRawView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  configBarItem: {
    flex: 1
  },
  readStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 5,
    borderRadius: 5,
    height: configBarHeight/5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nonReadStyle: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'white',
    marginRight: 5,
    borderRadius: 5,
    height: configBarHeight/5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: 'white'
  },
  lightTextView: {
    flex: 2
  },
  decagram: {
    flex: 1,
    paddingTop: 2
  },
  decagramoutline: {
    flex: 1,
    paddingTop: 2
  },
  lightSliderView: {
    flex: 7,
    paddingTop: Platform.OS === 'android' ? 1 : 0
  },
  lightSlider: {
    width: width*4/7
  }
})