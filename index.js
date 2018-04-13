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
    this.pageNumber = null
    this.InteractiveFlatList = null
  }

  componentWillUnmount() {
    this.props.onEndComicBook && this.props.onEndComicBook(this.pageNumber)
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      this.pageNumber = parseInt(viewableItems[0].key) + 1
      this.CoomicBookTool.receivePageNumber(this.pageNumber)
    }
  }

  onScrollBeginDrag = () => {
    this.CoomicBookTool.receiveAnimationEvent({
      showNavigationBar: false
    })
  }

  onDoubleClick = () => {
    this.CoomicBookTool.receiveAnimationEvent({
      showNavigationBar: false
    })
  }

  onPinchStart = () => {
    this.CoomicBookTool.receiveAnimationEvent({
      showNavigationBar: false
    })
  }

  onSingleClickTopArea = () => {
    this.CoomicBookTool.receiveAnimationEvent({
      showNavigationBar: false,
      onEndreceiveAnimationEvent: this.jumpUp
    })
  }

  onSingleClickMiddleArea = () => {
    this.CoomicBookTool.receiveAnimationEvent({
      showNavigationBar: true
    })
  }

  onSingleClickBottomArea = () => {
    this.CoomicBookTool.receiveAnimationEvent({
      showNavigationBar: false,
      onEndreceiveAnimationEvent: this.jumpDown
    })
  }

  onClickChapterItem = pageNumber => {
    this.CoomicBookTool.receiveAnimationEvent({
      showNavigationBar: false
    })
    this.jumpPage(pageNumber)
  }

  onProgressComplete = pageNumber => {
    this.jumpPage(pageNumber)
  }

  onClickPreviousChapter = pageNumber => {
    if (pageNumber) {
      this.jumpPage(pageNumber)
    } else {
      this.props.noPreviousChapter && this.props.noPreviousChapter()
    }
  }

  onClickNextChapter = pageNumber => { 
    if (pageNumber) {
      this.jumpPage(pageNumber)
    } else {
      this.props.noNextChapter && this.props.noNextChapter()
    }
  }

  jumpUp = () => {
    this.jumpPage(this.pageNumber - 1 < 1 ? 1 : this.pageNumber - 1)
  }

  jumpDown = () => {
    this.jumpPage(this.pageNumber + 1 > this.props.content.length ? this.props.content.length : this.pageNumber + 1)
  }

  jumpPage = pageNumber => {
    this.InteractiveFlatList.scrollToIndex({animated: true, index: pageNumber - 1})    
  }

  render() { 

    this.pageNumber = this.props.startPageNumber

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
          onScroll={this.onScroll}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          data={this.props.content}
          renderItem={this.props.renderContent}
          getItemLayout={this.props.getContentLayout}
          initialScrollIndex={this.props.startPageNumber -1}
        />
        <CoomicBookTool 
          ref= { ref => this.CoomicBookTool = ref }
          onClickChapterItem={this.onClickChapterItem}
          onProgressComplete={this.onProgressComplete}
          onClickPreviousChapter={this.onClickPreviousChapter}
          onClickNextChapter={this.onClickNextChapter}
          chapter={this.props.chapter}
          finalPageNumber={this.props.content.length}
          onClickBackArrow={this.props.onClickBackArrow}
        />      
      </View>
    )
  }
}


ComicBook.propTypes = {
  startPageNumber: PropTypes.number,
  content: PropTypes.array,
  renderContent: PropTypes.func,
  getContentLayout: PropTypes.func,
  chapter: PropTypes.array,
  onClickBackArrow: PropTypes.func,
  onEndComicBook: PropTypes.func,
  noPreviousChapter: PropTypes.func,
  noNextChapter: PropTypes.func
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
