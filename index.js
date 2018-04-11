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
import ComicBookImage from './ComicBookImage'

export default class ComicBook extends PureComponent {

  constructor(props) {
    super(props)
    this.scrollOffset = 0
    this.pageNumber = null
    this.isScroll = false
    this.contentHeight = height
    this.scaleImageHeightArray = new Array() // [{scaleImageHeight: value, scaleImageHeightOffset: value}]
    this.scaleImageHeightOffset = 0
    this.InteractiveFlatList = null
    this.state = {
      isLoading: true
    }
  }

  // life cycle

  componentDidMount() {
    const scaleImageHeightArray = this.props.data.map(async (ele,index) => {
      let scaleImageHeight = width
      if (ele.imageHeight && ele.imageWidth) {
        scaleImageHeight = width*ele.imageHeight/ele.imageWidth
      } else {
        await Image.getSize(ele.uri,(imageWidth, imageHeight) => {
          if (imageWidth && imageHeight) {
            scaleImageHeight = width*imageHeight/imageWidth
          }
        },() => {
          scaleImageHeight = width
        })
      }
      this.scaleImageHeightOffset += scaleImageHeight
      return {scaleImageHeight: scaleImageHeight, scaleImageHeightOffset: this.scaleImageHeightOffset}
    })
    Promise.all(scaleImageHeightArray).then(value => {
      this.scaleImageHeightArray = value
    }).then(() => {
      this.setState({
        isLoading: false
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentWillUnmount() {
    this.props.onEndComicBook && this.props.onEndComicBook(this.pageNumber)
  }

  renderItem = ({ item, index }) => 
    <ComicBookImage
      scaleImageHeight={this.scaleImageHeightArray[index].scaleImageHeight}
      source={{uri: item.uri}}
    />

  onLayout = () => {
    this.pageNumber = this.props.startPageNumber
  }

  getItemLayout = (data, index) => {
    if (index >= 0) {
      return { length: this.scaleImageHeightArray[index].scaleImageHeight, offset: this.scaleImageHeightArray[index].scaleImageHeightOffset - this.scaleImageHeightArray[0].scaleImageHeightOffset, index }
    } else {
      return { length: 0, offset: 0, index }
    }
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      if (this.isScroll) {
        this.pageNumber = parseInt(viewableItems[0].key) + 1
      }
      this.CoomicBookTool.receivePageNumber(this.pageNumber)
    }
  }

  // Motion

  onScrollBeginDrag = () => {
    this.isScroll = true
    this.CoomicBookTool.receiveAnimationEvent({
      showNavigationBar: false
    })
  }

  onScroll= ({nativeEvent}) => {
    // 可以換到onLayout？
    this.scrollOffset = nativeEvent.contentOffset.y
    this.contentHeight = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height
  }

  onScrollEndDrag = ({nativeEvent}) => {
    //console.log(nativeEvent)
  }

  onMomentumScrollEnd = () => {
    this.isScroll = false
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
      onEndreceiveAnimationEvent: this.rollUp
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
      onEndreceiveAnimationEvent: this.rollDown
    })
  }

  onClickChapterItem = pageNumber => {
    this.CoomicBookTool.receiveAnimationEvent({
      showNavigationBar: false
    })
    this.jumpToPage(pageNumber)
  }

  onProgressComplete = pageNumber => {

    this.jumpToPage(pageNumber)
  }

  onClickPreviousChapter = pageNumber => {
    this.jumpToPage(pageNumber)
  }

  onClickNextChapter = pageNumber => {    
    if (this.props.chapter[this.props.chapter.length -1]) {
      const lastPageNumber = this.props.chapter[this.props.chapter.length -1].pageNumber
      if (lastPageNumber && (pageNumber >= lastPageNumber)) {
        alert('已是最後一話')
      } else {
        this.jumpToPage(pageNumber)
      }
    }
  }

  // function

  rollUp = () => {
    const scrollOffset = this.scrollOffset - height/3 < 0 ? 0 : this.scrollOffset - height/3
    this.InteractiveFlatList.scrollToOffset({offset: scrollOffset, animated: true })
  }

  rollDown = () => {
    const scrollOffset = this.scrollOffset + height/3 > this.contentHeight ? this.contentHeight :this.scrollOffset + height/3
    this.InteractiveFlatList.scrollToOffset({offset: scrollOffset, animated: true})
  }

  jumpToPage = pageNumber => {
    this.pageNumber = pageNumber
    this.InteractiveFlatList.scrollToIndex({animated: false, index: this.pageNumber - 1})    
  }

  render() {    
    return (
      <View style={styles.view}>
        { this.state.isLoading ? 
          <View style={styles.view}>
            <ActivityIndicator
              style={styles.activityIndicator}
              size="large" 
              color="white"
            /> 
          </View> 
          :  
          <View style={styles.view}> 
            <InteractiveFlatList
              ref={ ref => {
                if (ref) {
                  this.InteractiveFlatList = ref.getFlatList()
                }
              }}
              data={this.props.data}
              initialNumToRender={this.props.startPageNumber -1}
              initialScrollIndex={this.props.startPageNumber -1}
              renderItem={this.props.renderItem ? this.props.renderItem : this.renderItem}
              getItemLayout={this.getItemLayout}
              onPinchStart={this.onPinchStart}
              onDoubleClick={this.onDoubleClick}
              onSingleClickTopArea={this.onSingleClickTopArea}
              onSingleClickMiddleArea={this.onSingleClickMiddleArea}
              onSingleClickBottomArea={this.onSingleClickBottomArea}
              onScrollBeginDrag={this.onScrollBeginDrag}
              onScroll={this.onScroll}
              onViewableItemsChanged={this.onViewableItemsChanged}
              onLayout={this.onLayout}
              onScrollEndDrag={this.onScrollEndDrag}
              onMomentumScrollEnd={this.onMomentumScrollEnd}
            />
            <CoomicBookTool 
              ref= { ref => this.CoomicBookTool = ref }
              chapter={this.props.chapter}
              finalPageNumber={this.props.data.length}
              onClickBackArrow={this.props.onClickBackArrow}
              onClickChapterItem={this.onClickChapterItem}
              onProgressComplete={this.onProgressComplete}
              onClickPreviousChapter={this.onClickPreviousChapter}
              onClickNextChapter={this.onClickNextChapter}
            />
          </View>     
        }
      </View>
    )
  }
}

ComicBook.propTypes = {
  data: PropTypes.array,
  chapter: PropTypes.array,
  onClickBackArrow: PropTypes.func,
  onEndComicBook: PropTypes.func,
  renderItem: PropTypes.func,
  startPageNumber: PropTypes.number
}

ComicBook.defaultProps = {
  data: [],
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
