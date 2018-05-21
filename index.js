import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native'
import PropTypes from 'prop-types'
import InteractiveFlatList from 'react-native-interactive-flatList'
import CoomicBookTool from './CoomicBookTool'

export default class ComicBook extends PureComponent {

  constructor(props) {
    super(props)
    this.InteractiveFlatList = null
    this.CoomicBookTool = null
    this.pageNumber = null
    this.finalPageNumber = null
    this.isScroll = false
  }

  componentWillUnmount() {
    this.props.onEndComicBook && this.props.onEndComicBook(this.pageNumber)
  }

  onLayout = () => {
    this.syncPageNumber(this.pageNumber)
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (this.isScroll) {
      if (viewableItems.length > 0) {
        pageNumber = parseInt(viewableItems[0].key) + 1
        this.syncPageNumber(pageNumber)
      }
    }
  }

  onMomentumScrollBegin = () => {
    console.log('There is bugs on onMomentumScrollBegin now')
  }

  onMomentumScrollEnd = () => {
    console.log('There is bugs on onMomentumScrollEnd now')
  }

  onScrollBeginDrag = () => {
    this.isScroll = true
    this.CoomicBookTool.toolAnimation({
      showNavigationBar: false
    })
  }

  onDoubleClick = () => {
    this.CoomicBookTool.toolAnimation({
      showNavigationBar: false
    })
  }

  onPinchStart = () => {
    this.CoomicBookTool.toolAnimation({
      showNavigationBar: false
    })
  }

  onSingleClickTopArea = () => {
    this.isScroll = false
    this.CoomicBookTool.toolAnimation({
      showNavigationBar: false,
      onAnimationComplete: this.goToPreviousPageNumber
    })
  }

  onSingleClickMiddleArea = () => {
    this.CoomicBookTool.toolAnimation({
      showNavigationBar: true
    })
  }

  onSingleClickBottomArea = () => {
    this.isScroll = false
    this.CoomicBookTool.toolAnimation({
      showNavigationBar: false,
      onAnimationComplete: this.goToNextPageNumber
    })
  }

  onClickChapterItem = pageNumber => {
    this.isScroll = false
    this.CoomicBookTool.toolAnimation({
      showNavigationBar: false
    })
    this.InteractiveFlatList.scrollToIndex({
      animated: true, 
      index: pageNumber - 1
    })
    this.syncPageNumber(pageNumber)
  }

  onProgressComplete = pageNumber => {
    this.isScroll = false
    this.InteractiveFlatList.scrollToIndex({
      animated: true, // 現在填flase會有bug
      index: pageNumber - 1
    })
    this.syncPageNumber(pageNumber)
  }

  onClickPreviousChapter = pageNumber => {
    this.isScroll = false
    if (pageNumber) {
      this.InteractiveFlatList.scrollToIndex({
        animated: true, 
        index: pageNumber - 1
      })
      this.syncPageNumber(pageNumber)
    } else {
      this.props.noPreviousChapter && this.props.noPreviousChapter()
    }
  }

  onClickNextChapter = pageNumber => { 
    this.isScroll = false
    if (pageNumber) {
      this.InteractiveFlatList.scrollToIndex({
        animated: true, 
        index: pageNumber - 1
      })
      this.syncPageNumber(pageNumber)
    } else {
      this.props.noNextChapter && this.props.noNextChapter()
    }
  }

  goToPreviousPageNumber = () => {
    const previousPageNumber = this.pageNumber - 1
    if (previousPageNumber >= 1) {
      this.InteractiveFlatList.scrollToIndex({
        animated: true, 
        index: previousPageNumber - 1
      })
      this.syncPageNumber(previousPageNumber)
    } else {
      this.props.noPreviousPageNumber && this.props.noPreviousPageNumber()
    }
  }

  goToNextPageNumber = () => {
    const nextPageNumber = this.pageNumber + 1
    if (nextPageNumber <= this.finalPageNumber) {
      this.InteractiveFlatList.scrollToIndex({
        animated: true, 
        index: nextPageNumber - 1
      })
      this.syncPageNumber(nextPageNumber)
    } else {
      this.props.noNextPageNumber && this.props.noNextPageNumber()
    }
  }

  syncPageNumber = pageNumber => {
    this.pageNumber = pageNumber
    this.CoomicBookTool.syncPageNumber(this.pageNumber)
  }

  render() { 

    const maxChapterPageNumber = Math.max(...this.props.chapter.map(ele => ele.pageNumber))
    this.finalPageNumber = this.props.content.length
    this.pageNumber = this.props.initialPageNumber
    if (this.pageNumber > this.finalPageNumber) {
      throw 'Your initial page number bigger than your final page number'
    }
    if (maxChapterPageNumber > this.finalPageNumber) {
      throw "There's any chapter page number bigger than your final page number"
    }

    return (
      <View style={styles.view}>
        <InteractiveFlatList
          ref={ ref => {
            if (ref) {
              this.InteractiveFlatList = ref.getFlatList()
            }
          }}
          onPinchStart={this.onPinchStart}
          onDoubleClick={this.onDoubleClick}
          onSingleClickTopArea={this.onSingleClickTopArea}
          onSingleClickMiddleArea={this.onSingleClickMiddleArea}
          onSingleClickBottomArea={this.onSingleClickBottomArea}
          onLayout={this.onLayout}
          onViewableItemsChanged={this.onViewableItemsChanged}
          onScrollBeginDrag={this.onScrollBeginDrag}
          initialScrollIndex={this.pageNumber -1}
          data={this.props.content}
          renderItem={this.props.renderContent}
          getItemLayout={this.props.getContentLayout}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
        />
        <CoomicBookTool 
          ref= { ref => this.CoomicBookTool = ref }
          title={this.props.title}
          onClickChapterItem={this.onClickChapterItem}
          onProgressComplete={this.onProgressComplete}
          onClickPreviousChapter={this.onClickPreviousChapter}
          onClickNextChapter={this.onClickNextChapter}
          finalPageNumber={this.finalPageNumber}
          chapter={this.props.chapter}
          onClickBackArrow={this.props.onClickBackArrow}
        />      
      </View>
    )
  }
}


ComicBook.propTypes = {
  title: PropTypes.string,
  initialPageNumber: PropTypes.number,
  content: PropTypes.array,
  renderContent: PropTypes.func,
  getContentLayout: PropTypes.func,
  chapter: PropTypes.array,
  onClickBackArrow: PropTypes.func,
  onEndComicBook: PropTypes.func,
  noPreviousChapter: PropTypes.func,
  noNextChapter: PropTypes.func,
  noPreviousPageNumber: PropTypes.func,
  noNextPageNumber: PropTypes.func
}

ComicBook.defaultProps = {
  content: [],
  chapter: [],
  initialPageNumber: 1
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#000000'
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
