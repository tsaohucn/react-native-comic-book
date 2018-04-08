import React , { Component } from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback,
  Platform 
} from 'react-native'
import PropTypes from 'prop-types'
import ScreenBrightness from 'react-native-screen-brightness'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import SliderBar from './SliderBar'
import ChapterBar from './ChapterBar'
import ConfigBar from './ConfigBar'
import OptionBar from './OptionBar'

export default class CoomicBookToolBar extends Component {

  constructor(props) {
    super(props)
    this.animatedTopBarY = new Animated.Value(hideTopBarY, { useNativeDriver: true })
    this.animatedOptionBarY =  new Animated.Value(hideOptionBarY, { useNativeDriver: true })
    this.animatedBottomBarY = new Animated.Value(hideBottomBarY, { useNativeDriver: true })
    this.animatedSliderBarY = new Animated.Value(hideSliderBarY, { useNativeDriver: true })
    this.animatedChapterBarX =  new Animated.Value(hideChapterBarX, { useNativeDriver: true })
    this.animatedConfigBarY =  new Animated.Value(hideConfigBarY, { useNativeDriver: true })
    this.toolBarIsShow = false
    this.optionBarIsShow = false
    this.chapterBarIsShow = false
    this.sliderBarIsShow = false
    this.configBarIsShow = false
  }

  showToolBar = () => {
    Animated.parallel([
      Animated.timing(this.animatedTopBarY,{
        toValue: showTopBarY,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedBottomBarY,{
        toValue: showBottomBarY,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(result => {
      if (result.finished) {
        this.toolBarIsShow = true
      }
    })    
  }

  showOptionBar = () => {
    Animated.parallel([
      Animated.timing(this.animatedTopBarY,{
        toValue: hideTopBarY,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedBottomBarY,{
        toValue: hideBottomBarY,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedOptionBarY,{
        toValue: showOptionBarY,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(result => {
      if (result.finished) {
        this.toolBarIsShow = false
        this.optionBarIsShow = true
      } 
    })    
  }

  showChapterBar = () => {
    Animated.parallel([
      Animated.timing(this.animatedTopBarY,{
        toValue: hideTopBarY,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedBottomBarY,{
        toValue: hideBottomBarY,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedChapterBarX,{
        toValue: showChapterBarX,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(result => {
      if (result.finished) {
        this.toolBarIsShow = false
        this.chapterBarIsShow = true
      } 
    })    
  }

  showSliderBar = () => {
    Animated.parallel([
      Animated.timing(this.animatedTopBarY,{
        toValue: hideTopBarY,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedBottomBarY,{
        toValue: hideBottomBarY,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedSliderBarY,{
        toValue: showSliderBarY,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(result => {
      if (result.finished) {
        this.toolBarIsShow = false
        this.sliderBarIsShow = true
      } 
    })
  }

  showConfigBar = () => {
    Animated.parallel([
      Animated.timing(this.animatedTopBarY,{
        toValue: hideTopBarY,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedBottomBarY,{
        toValue: hideBottomBarY,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedConfigBarY,{
        toValue: showConfigBarY,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(result => {
      if (result.finished) {
        this.toolBarIsShow = false
        this.configBarIsShow = true
      } 
    })
  }

  hideTopBottomBar = () => {
    Animated.parallel([
      Animated.timing(this.animatedTopBarY,{
        toValue: hideTopBarY,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedBottomBarY,{
        toValue: hideBottomBarY,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(result => {
      if (result.finished) {
        this.toolBarIsShow = false
      }
    })
  }

  hideOptionBar = () => {
    Animated.timing(this.animatedOptionBarY,{
      toValue: hideOptionBarY,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.optionBarIsShow = false
      } 
    })    
  }

  hideChapterBar = () => {
    Animated.timing(this.animatedChapterBarX,{
      toValue: hideChapterBarX,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.chapterBarIsShow = false
      } 
    })     
  }

  hideSliderBar = () => {
    Animated.timing(this.animatedSliderBarY,{
      toValue: hideSliderBarY,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.sliderBarIsShow = false
      } 
    })
  }

  hideConfigBar = () => {
    Animated.timing(this.animatedConfigBarY,{
      toValue: hideConfigBarY,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.configBarIsShow = false
      } 
    })
  }

  toolBarResponse = (showToolBar,afterResponse) => {
    if (this.toolBarIsShow) {
      this.hideTopBottomBar()
    } else if (this.sliderBarIsShow) {
      this.hideSliderBar()
    } else if (this.chapterBarIsShow) {
      this.hideChapterBar()
    } else if (this.configBarIsShow) {
      this.hideConfigBar()
    } else if (this.optionBarIsShow) {
      this.hideOptionBar()
    } else {
      if (afterResponse) {
        afterResponse()
      } else {
        showToolBar && this.showToolBar()
      }
    }
  }

  onClickOptionBar = () => {
    this.showOptionBar()
  }

  onClickChapterBar = () => {
    this.showChapterBar()
  }

  onClickSliderBar = () => {
    this.showSliderBar()
  }

  onClickConfigBar = () => {
    if (Platform.OS === 'android') {
      ScreenBrightness.getAppBrightness()
      .then(brightness => {
        if (brightness >= 0 && brightness <= 1) {
          this.ConfigBar.setValue(brightness,this.showConfigBar)
        } else {
          ScreenBrightness.getBrightness()
          .then(brightness => {
            this.ConfigBar.setValue(brightness/255,this.showConfigBar)
          })
        }
      })
    } else {
      ScreenBrightness.getBrightness()
      .then(brightness => {
        this.ConfigBar.setValue(brightness,this.showConfigBar)
      })
    }    
  }

  onLightValueChange = value => {
    if (Platform.OS === 'android') {
      ScreenBrightness.setAppBrightness(value)
    } else {
      ScreenBrightness.setBrightness(value)
    }
  }

  render() {
    return(
      <View style={styles.view}>
        <TopBar
          onClickBackArrow={this.props.onClickBackArrow}
          animatedTopBarY={this.animatedTopBarY}
          onClickOptionBar={this.onClickOptionBar}
        />
        <OptionBar
          animatedOptionBarY={this.animatedOptionBarY}
        />
        <BottomBar
          animatedBottomBarY={this.animatedBottomBarY}
          onClickChapterBar={this.onClickChapterBar}
          onClickSliderBar={this.onClickSliderBar}
          onClickConfigBar={this.onClickConfigBar}
        />
        <ChapterBar
          chapter={this.props.chapter}
          onClickChapterItem={this.props.onClickChapterItem}
          animatedChapterBarX={this.animatedChapterBarX}
        />
        <SliderBar
          chapter={this.props.chapter}
          onClickPreviousChapter={this.props.onClickPreviousChapter}
          onClickNextChapter={this.props.onClickNextChapter}
          onSlidingComplete={this.props.onSlidingComplete}
          animatedSliderBarY={this.animatedSliderBarY}
          //minimumValue={0}
          //maximumValue={this.props.totalPageCount - 1}
        />
        <ConfigBar
          ref={ref => this.ConfigBar = ref}
          animatedConfigBarY={this.animatedConfigBarY}
          onLightValueChange={this.onLightValueChange}
        />
      </View>
    )
  }
}

CoomicBookToolBar.propTypes = {
  chapter: PropTypes.array,
  onClickBackArrow: PropTypes.func,
  onClickChapterItem: PropTypes.func
}

CoomicBookToolBar.defaultProps = {
  chapter: []
}

const { width, height } = Dimensions.get('window')

const showTopBarY = Platform.OS === 'android' ? 0 : 0

const showBottomBarY = Platform.OS === 'android' ? 0 : height

const showOptionBarY = Platform.OS === 'android' ? 0 : height

const showChapterBarX = Platform.OS === 'android' ? 0 : width

const showSliderBarY = Platform.OS === 'android' ? 0 : height

const showConfigBarY = Platform.OS === 'android' ? 0 : height

const hideTopBarY = Platform.OS === 'android' ? -50 : -50

const hideOptionBarY = Platform.OS === 'android' ? 100 : height+100

const hideBottomBarY = Platform.OS === 'android' ? 50 : height+50

const hideChapterBarX = Platform.OS === 'android' ? width*2/3 : width*5/3

const hideSliderBarY = Platform.OS === 'android' ? 50 : height+50

const hideConfigBarY = Platform.OS === 'android' ? height/2 : height*3/2

const styles = StyleSheet.create({
  view: {
    ...Platform.select({
      ios: {
        position: 'absolute',
        backgroundColor: 'transparent'
      },
      android: {
        position: 'absolute',
        height,
        width
      }
    })
  }
})