import React, { Component } from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback 
} from 'react-native'
import { Icon, Slider } from 'react-native-elements'

export default class ProgressBar extends Component {

  constructor(props) {
    super(props)
    this.pageNumber = null
    this.previousChapterPageNumber = null
    this.nextChapterPageNumber = null
    this.state = {
      value: 0
    }
  }

  receivePageNumber = pageNumber => {
    this.getChapterPageNumber(pageNumber)
  }

  getChapterPageNumber = pageNumber => {
    const chapterPageNumbers = this.props.chapter.map(ele => ele.pageNumber)
    const previousChapterPageNumbers = chapterPageNumbers.filter(_pageNumber => _pageNumber < pageNumber)
    const nextChapterPageNumbers = chapterPageNumbers.filter(_pageNumber => _pageNumber > pageNumber)
    this.previousChapterPageNumber = previousChapterPageNumbers[previousChapterPageNumbers.length - 1]
    this.nextChapterPageNumber = nextChapterPageNumbers[0]
    this.setState({
      value: pageNumber - 1
    })
  }

  onClickPreviousChapter = () => {
    this.props.onClickPreviousChapter && this.props.onClickPreviousChapter(this.previousChapterPageNumber)
  }

  onClickNextChapter = () => {
    this.props.onClickNextChapter && this.props.onClickNextChapter(this.nextChapterPageNumber)
  }

  onValueChange = value => {
    this.setState({value})
  }

  onSlidingComplete = value => {
    const pageNumber = value + 1
    this.props.onProgressComplete && this.props.onProgressComplete(pageNumber)
  }

  render() {
    return(
      <Animated.View style={[styles.animated,{
        transform: [
          { translateY: this.props.animatedProgressBarY }
        ]}]}
      >
          <View style={styles.columnOne}>
            <View style={styles.indicator}>
              <Text style={styles.text}>{this.state.value + 1 + '/' + this.props.finalPageNumber}</Text>
            </View>
          </View>
          <View style={styles.columnTwo}>
            <TouchableWithoutFeedback
              onPress={this.onClickPreviousChapter}
            >
              <View style={styles.iconView}>
                <Icon
                  name='page-first'
                  type='material-community'
                  color='white'
                  size={30}
                />
              </View>
            </TouchableWithoutFeedback>
              <Slider 
                onSlidingStart={this.onSlidingStart}
                onValueChange={this.onValueChange} 
                onSlidingComplete={this.onSlidingComplete}
                value={this.state.value}
                step={1}
                maximumValue={this.props.finalPageNumber - 1}
                style={styles.slider}
                trackStyle={styles.trackStyle}
                thumbStyle={thumbStyle}
                minimumTrackTintColor={'white'}
                maximumTrackTintColor={'grey'}
                thumbTintColor={'white'}
              />
            <TouchableWithoutFeedback
              onPress={this.onClickNextChapter}
            >
              <View style={styles.iconView}>
                <Icon
                  name='page-last'
                  type='material-community'
                  color='white'
                  size={30}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
      </Animated.View>
    )
  }

}

const { width, height } = Dimensions.get('window')

const thumbStyle = {
  transform: [
    { translateY: -1.5 }
  ]
}

const styles = StyleSheet.create({
  animated: {
    position: 'absolute',
    bottom: 0,
    width,
    height: 100
  },
  columnOne: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnTwo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  slider: {
    width: width*5/7,
    justifyContent: 'center'
  },
  iconView: {
    flex: 1
  },
  text: {
    fontSize: 15,
    color: 'white'
  },
  indicator: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: 80, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    left: width*1/7
  },
  trackStyle: {
    height: 1,
    justifyContent: 'center'
  }
})