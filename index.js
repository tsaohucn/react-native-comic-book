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
  }

  componentWillUnmount() {
    this.props.onEndComicBook && this.props.onEndComicBook(this.pageNumber)
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      this.pageNumber = parseInt(viewableItems[0].key) + 1
      this.CoomicBookTool.syncPageNumber(this.pageNumber)
    }
  }

  onScrollBeginDrag = () => {
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
    this.CoomicBookTool.toolAnimation({
      showNavigationBar: false,
      onAnimationComplete: this.goToNextPageNumber
    })
  }

  onClickChapterItem = pageNumber => {
    this.CoomicBookTool.toolAnimation({
      showNavigationBar: false
    })
    this.InteractiveFlatList.scrollToIndex({
      animated: false, 
      index: pageNumber - 1
    })    
  }

  onProgressComplete = pageNumber => {
    this.InteractiveFlatList.scrollToIndex({
      animated: false, 
      index: pageNumber - 1
    }) 
  }

  onClickPreviousChapter = pageNumber => {
    if (pageNumber) {
      this.InteractiveFlatList.scrollToIndex({
        animated: false, 
        index: pageNumber - 1
      })
    } else {
      this.props.noPreviousChapter && this.props.noPreviousChapter()
    }
  }

  onClickNextChapter = pageNumber => { 
    if (pageNumber) {
      this.InteractiveFlatList.scrollToIndex({
        animated: false, 
        index: pageNumber - 1
      })
    } else {
      this.props.noNextChapter && this.props.noNextChapter()
    }
  }

  goToPreviousPageNumber = () => {
    const previousPageNumber = this.pageNumber - 1
    if (previousPageNumber < 1) {
      this.props.noPreviousPageNumber && this.props.noPreviousPageNumber()
    } else {
      this.InteractiveFlatList.scrollToIndex({
        animated: true, 
        index: previousPageNumber - 1
      })
    }
  }

  goToNextPageNumber = () => {
    const nextPageNumber = this.pageNumber + 1
    if (nextPageNumber > this.finalPageNumber) {
      this.props.noNextPageNumber && this.props.noNextPageNumber()
    } else {
      this.InteractiveFlatList.scrollToIndex({
        animated: true, 
        index: nextPageNumber - 1
      })
    }
  }

  render() { 

    this.pageNumber = this.props.startPageNumber
    this.finalPageNumber = this.props.content.length

    return (
      <View style={styles.view}>
        <InteractiveFlatList
          ref={ ref => this.InteractiveFlatList = ref.getFlatList()}
          onPinchStart={this.onPinchStart}
          onDoubleClick={this.onDoubleClick}
          onSingleClickTopArea={this.onSingleClickTopArea}
          onSingleClickMiddleArea={this.onSingleClickMiddleArea}
          onSingleClickBottomArea={this.onSingleClickBottomArea}
          onViewableItemsChanged={this.onViewableItemsChanged}
          onScrollBeginDrag={this.onScrollBeginDrag}
          initialScrollIndex={this.props.initialPageNumber -1}
          data={this.props.content}
          renderItem={this.props.renderContent}
          getItemLayout={this.props.getContentLayout}
        />
        <CoomicBookTool 
          ref= { ref => this.CoomicBookTool = ref }
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
  initialPageNumber: PropTypes.number,
  renderContent: PropTypes.func.isRequired,
  getContentLayout: PropTypes.func.isRequired,
  content: PropTypes.array,
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
  startPageNumber: 1
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
