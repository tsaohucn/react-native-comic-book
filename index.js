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
import CoomicBookToolBar from './CoomicBookToolBar'
import ComicBookImage from './ComicBookImage'

export default class ComicBook extends PureComponent {

  constructor(props) {
    super(props)
    this.scrollOffset = 0
    this.pageNumber = 0
    this.contentHeight = height
    this.scaleImageHeightArray = new Array() // [{scaleImageHeight: value, scaleImageHeightOffset: value}]
    this.scaleImageHeightOffset = 0
    this.FlatList = null
    this.state = {
      isLoading: true
    }
  }

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

  scrollToTop = () => {
    const scrollOffset = this.scrollOffset - height/3 < 0 ? 0 : this.scrollOffset - height/3
    this.FlatList.scrollToOffset({offset: scrollOffset, animated: true })    
  }

  scrollToBottom = () => {
    const scrollOffset = this.scrollOffset + height/3 > this.contentHeight ? this.contentHeight :this.scrollOffset + height/3
    this.FlatList.scrollToOffset({offset: scrollOffset, animated: true})    
  }

  onScrollBeginDrag = () => {
    this.CoomicBookToolBar.toolBarResponse()
  }

  onScroll= ({nativeEvent}) => {
    this.scrollOffset = nativeEvent.contentOffset.y
    this.contentHeight = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    const itemsLength = viewableItems.length
    if (itemsLength > 0) {
      this.pageNumber = viewableItems[viewableItems.length -1].key
    }
  }

  getItemLayout = (data, index) => {
    if (index >= 0) {
      return { length: this.scaleImageHeightArray[index].scaleImageHeight, offset: this.scaleImageHeightArray[index].scaleImageHeightOffset - this.scaleImageHeightArray[0].scaleImageHeightOffset, index }
    } else {
      return { length: 0, offset: 0, index }
    }
  }

  renderItem = ({ item, index }) => 
    <ComicBookImage
      scaleImageHeight={this.scaleImageHeightArray[index].scaleImageHeight}
      source={{uri: item.uri}}
    />

  onDoubleClick = () => {
    this.CoomicBookToolBar.toolBarResponse(false)
  }

  onPinchStart = () => {
    this.CoomicBookToolBar.toolBarResponse(false)
  }

  onSingleClickTopArea = () => {
    this.CoomicBookToolBar.toolBarResponse(false,this.scrollToTop)
  }

  onSingleClickMiddleArea = () => {
    this.CoomicBookToolBar.toolBarResponse(true)
  }

  onSingleClickBottomArea = () => {
    this.CoomicBookToolBar.toolBarResponse(false,this.scrollToBottom)
  }

  onClickChapterItem = pageNumber => {
    this.CoomicBookToolBar.hideChapterBar()
    this.FlatList.scrollToIndex({animated: false, index: pageNumber - 1})
  }

  onSlidingComplete = page => {
    this.FlatList.scrollToIndex({animated: false, index: pageNumber})
  }

  onClickPreviousChapter = () => {
    console.warn('onClickPreviousChapter')
  }

  onClickNextChapter = () => {
    console.warn('onClickNextChapter')
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
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
                  this.FlatList = ref.getFlatList()
                }
              }}
              data={this.props.data}
              initialNumToRender={this.props.startPageNumber -1}
              initialScrollIndex={this.props.startPageNumber -1}
              renderItem={this.renderItem}
              getItemLayout={this.getItemLayout}
              onPinchStart={this.onPinchStart}
              onDoubleClick={this.onDoubleClick}
              onSingleClickTopArea={this.onSingleClickTopArea}
              onSingleClickMiddleArea={this.onSingleClickMiddleArea}
              onSingleClickBottomArea={this.onSingleClickBottomArea}
              onScrollBeginDrag={this.onScrollBeginDrag}
              onScroll={this.onScroll}
              onViewableItemsChanged={this.onViewableItemsChanged}
            />
            <CoomicBookToolBar 
              ref= { ref => this.CoomicBookToolBar = ref }
              chapter={this.props.chapter}
              onClickBackArrow={this.props.onClickBackArrow}
              onClickChapterItem={this.onClickChapterItem}
              onSlidingComplete={this.onSlidingComplete}
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
  startPageNumber: PropTypes.number
}

ComicBook.defaultProps = {
  data: [],
  chapter: []
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
