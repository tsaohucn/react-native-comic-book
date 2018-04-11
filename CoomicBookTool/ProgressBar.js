import React, { Component } from 'react'
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


export default class ProgressBar extends Component {
  constructor(props) {
    super(props)
    this.pageNumber = null
    this.previousChapterPageNumber = null
    this.nextChapterPageNumber = null
    this.lastChapter = null
  }

  receivePageNumber = pageNumber => {
    if (pageNumber !=this.pageNumber) {
      this.pageNumber = pageNumber
      this.getChapterPageNumber()
    }
  }

  getChapterPageNumber = () => {
    const pageNumbers = this.props.chapter.map(ele => ele.pageNumber)
    const nextChapterPageNumbers = pageNumbers.filter(pageNumber => pageNumber > this.pageNumber)
    const previousChapterPageNumbers = pageNumbers.filter(pageNumber => pageNumber <= this.pageNumber)
    this.previousChapterPageNumber = previousChapterPageNumbers[previousChapterPageNumbers.length - 1]
    if (nextChapterPageNumbers.length > 0) {
      this.nextChapterPageNumber = nextChapterPageNumbers[0]
      const maximumValue = this.nextChapterPageNumber - this.previousChapterPageNumber - 1
      const chapter =  pageNumbers.indexOf(this.previousChapterPageNumber) + 1
      if (chapter != this.lastChapter) {
        this.ComicBookSlider.setChapterMaximumValue(maximumValue,chapter)
        this.ComicBookSlider.setValue(0)
      } else {
        this.ComicBookSlider.setValue(this.pageNumber - this.previousChapterPageNumber)
      }
      this.lastChapter = chapter
    } else {
      this.nextChapterPageNumber = this.props.finalPageNumber
      const maximumValue = this.nextChapterPageNumber - this.previousChapterPageNumber
      const chapter =  pageNumbers.indexOf(this.previousChapterPageNumber) + 1
      this.ComicBookSlider.setChapterMaximumValue(maximumValue,chapter)
      this.ComicBookSlider.setValue(this.pageNumber - this.previousChapterPageNumber)
      this.lastChapter = chapter
    }
  }

  onClickPreviousChapter = () => {
    this.pageNumber && this.props.onClickPreviousChapter && this.props.onClickPreviousChapter(this.previousChapterPageNumber)
  }

  onClickNextChapter = () => {
    this.pageNumber && this.props.onClickNextChapter && this.props.onClickNextChapter(this.nextChapterPageNumber)
  }

  onProgressComplete = value => {
    if (this.pageNumber) {
      const pageNumber = this.previousChapterPageNumber + value
      this.props.onProgressComplete && this.props.onProgressComplete(pageNumber)
    }
  }

  render() {
    return(
      <Animated.View style={[styles.progressBarAnimated,{
        transform: [
          { translateY: this.props.animatedProgressBarY }
        ]}]}
      >
        <TouchableWithoutFeedback
          onPress={this.onClickPreviousChapter}
        >
          <View style={styles.iconView}>
            <Icon
              name='page-first'
              type='material-community'
              color='white'
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.ComicBookSliderView}>
          <ComicBookSlider 
            ref={ref => this.ComicBookSlider = ref}
            showIndicator
            style={styles.ComicBookSlider}
            onSlidingComplete={this.onProgressComplete}
            step={1}
            maximumValue={this.nextChapterPageNumber - this.previousChapterPageNumber - 1}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={this.onClickNextChapter}
        >
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
  }

}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  progressBarAnimated: {
    position: 'absolute',
    bottom: 0,
    width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  ComicBookSliderView: {
    flex: 6,
  },
  ComicBookSlider: {
    width: width*5/7
  },
  iconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})