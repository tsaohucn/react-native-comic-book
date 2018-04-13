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
import OptionBar from './OptionBar'
import BottomBar from './BottomBar'
import ChapterBar from './ChapterBar'
import ProgressBar from './ProgressBar'
import ConfigBar from './ConfigBar'

export default class CoomicBookTool extends Component {

  constructor(props) {
    super(props)
    this.animatedTopBarY = new Animated.Value(hideTopBarY, { useNativeDriver: true })
    this.animatedOptionBarY =  new Animated.Value(hideOptionBarY, { useNativeDriver: true })
    this.animatedBottomBarY = new Animated.Value(hideBottomBarY, { useNativeDriver: true })
    this.animatedChapterBarX =  new Animated.Value(hideChapterBarX, { useNativeDriver: true })
    this.animatedProgressBarY = new Animated.Value(hideProgressBarY, { useNativeDriver: true })
    this.animatedConfigBarY =  new Animated.Value(hideConfigBarY, { useNativeDriver: true })
    this.navigationBarIsShow = false
    this.optionBarIsShow = false
    this.progressBarIsShow = false
    this.chapterBarIsShow = false
    this.configBarIsShow = false
  }

  showNavigationBar = () => {
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
        this.navigationBarIsShow = true
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
        this.navigationBarIsShow = false
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
        this.navigationBarIsShow = false
        this.chapterBarIsShow = true
      } 
    })    
  }

  showProgressBar = () => {
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
      Animated.timing(this.animatedProgressBarY,{
        toValue: showProgressBarY,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(result => {
      if (result.finished) {
        this.navigationBarIsShow = false
        this.progressBarIsShow = true
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
        this.navigationBarIsShow = false
        this.configBarIsShow = true
      } 
    })
  }

  hideNavigationBar = () => {
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
        this.navigationBarIsShow = false
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

  hideProgressBar = () => {
    Animated.timing(this.animatedProgressBarY,{
      toValue: hideProgressBarY,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.progressBarIsShow = false
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

  onClickOptionBar = () => {
    this.showOptionBar()
  }

  onClickChapterBar = () => {
    this.showChapterBar()
  }

  onClickProgressBar = () => {
    this.showProgressBar()
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

  receiveAnimationEvent = ({showNavigationBar,onEndreceiveAnimationEvent}) => {
    if (this.navigationBarIsShow) {
      this.hideNavigationBar()
    } else if (this.optionBarIsShow) {
      this.hideOptionBar()
    } else if (this.chapterBarIsShow) {
      this.hideChapterBar()
    } else if (this.progressBarIsShow) {
      this.hideProgressBar()
    } else if (this.configBarIsShow) {
      this.hideConfigBar()
    } else {
      showNavigationBar && this.showNavigationBar()
      onEndreceiveAnimationEvent && onEndreceiveAnimationEvent()
    }
  }

  receivePageNumber = pageNumber => {
    this.ProgressBar.receivePageNumber(pageNumber)
    this.ChapterBar.receivePageNumber(pageNumber)
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
          onClickProgressBar={this.onClickProgressBar}
          onClickConfigBar={this.onClickConfigBar}
        />
        <ChapterBar
          ref={ref => this.ChapterBar = ref}
          chapter={this.props.chapter}
          onClickChapterItem={this.props.onClickChapterItem}
          animatedChapterBarX={this.animatedChapterBarX}
        />
        <ProgressBar
          ref={ref => this.ProgressBar = ref}
          chapter={this.props.chapter}
          finalPageNumber={this.props.finalPageNumber}
          onClickPreviousChapter={this.props.onClickPreviousChapter}
          onClickNextChapter={this.props.onClickNextChapter}
          onProgressComplete={this.props.onProgressComplete}
          animatedProgressBarY={this.animatedProgressBarY}
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

CoomicBookTool.propTypes = {
  chapter: PropTypes.array,
  onClickBackArrow: PropTypes.func,
  onClickChapterItem: PropTypes.func,
  finalPageNumber: PropTypes.number
}

CoomicBookTool.defaultProps = {
  chapter: []
}

const { width, height } = Dimensions.get('window')

const showTopBarY = Platform.OS === 'android' ? 0 : 0

const showBottomBarY = Platform.OS === 'android' ? 0 : height

const showOptionBarY = Platform.OS === 'android' ? 0 : height

const showChapterBarX = Platform.OS === 'android' ? 0 : width

const showProgressBarY = Platform.OS === 'android' ? 0 : height

const showConfigBarY = Platform.OS === 'android' ? 0 : height

const hideTopBarY = Platform.OS === 'android' ? -50 : -50

const hideOptionBarY = Platform.OS === 'android' ? 100 : height+100

const hideBottomBarY = Platform.OS === 'android' ? 50 : height+50

const hideChapterBarX = Platform.OS === 'android' ? width*2/3 : width*5/3

const hideProgressBarY = Platform.OS === 'android' ? 100 : height+100

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