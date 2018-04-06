import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator
} from 'react-native'
import InteractiveFlatList from 'react-native-interactive-flatList'
import CoomicBookToolBar from './CoomicBookToolBar'
import ComicBookImage from './ComicBookImage'

export default class ComicBook extends Component {

  constructor(props) {
    super(props)
    this.scrollOffset = 0
    this.contentHeight = height
    this.scaleImageHeightArray = new Array // [{scaleImageHeight: value, scaleImageHeightOffset: value}]
    this.scaleImageHeightOffset = 0
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

  scrollToIndex = index => {
    this.CoomicBookToolBar.hideChapterBar()
    this.FlatList.scrollToIndex({animated: false, index: index - 1})
  }

  scrollOnTop = () => {
    const scrollOffset = this.scrollOffset - height/3 < 0 ? 0 : this.scrollOffset - height/3
    this.FlatList.scrollToOffset({
      offset: scrollOffset,
      animated: true
    })    
  }

  scrollOnBottom = () => {
    const scrollOffset = this.scrollOffset + height/3 > this.contentHeight ? this.contentHeight :this.scrollOffset + height/3
    this.FlatList.scrollToOffset({
      offset: scrollOffset,
      animated: true
    })    
  }

  onScrollBeginDrag = () => {
    this.CoomicBookToolBar.toolBarResponse()
  }

  onScroll= ({nativeEvent}) => {
    this.scrollOffset = nativeEvent.contentOffset.y
    this.contentHeight = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height
  }

  getItemLayout = (data, index) => ({ length: this.scaleImageHeightArray[index].scaleImageHeight, offset: this.scaleImageHeightArray[index].scaleImageHeightOffset - this.scaleImageHeightArray[0].scaleImageHeightOffset, index })

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
    this.CoomicBookToolBar.toolBarResponse(false,this.scrollOnTop)
  }

  onSingleClickMiddleArea = () => {
    this.CoomicBookToolBar.toolBarResponse(true)
  }

  onSingleClickBottomArea = () => {
    this.CoomicBookToolBar.toolBarResponse(false,this.scrollOnBottom)
  }

  onClickChapterItem = startPage => {
    this.scrollToIndex(startPage)
  }

  onSlidingComplete = index => {
    this.FlatList.scrollToIndex({animated: false, index: index})
  }

  render() {
    return (
      <View style={styles.view}>
        { this.state.isLoading ? 
          <View style={styles.view}>
            <ActivityIndicator
              style={styles.activityIndicator}
              size="large" 
              color="#0000ff"
            /> 
          </View> 
          :  
          <View style={styles.view}> 
            <InteractiveFlatList
              ref={ ref => this.FlatList = ref.getFlatList() }
              data={this.props.data}
              renderItem={this.renderItem}
              getItemLayout={this.getItemLayout}
              onPinchStart={this.onPinchStart}
              onDoubleClick={this.onDoubleClick}
              onSingleClickTopArea={this.onSingleClickTopArea}
              onSingleClickMiddleArea={this.onSingleClickMiddleArea}
              onSingleClickBottomArea={this.onSingleClickBottomArea}
              onScrollBeginDrag={this.onScrollBeginDrag}
              onScroll={this.onScroll}
            />
            <CoomicBookToolBar 
              ref= { ref => this.CoomicBookToolBar = ref }
              chapter={this.props.chapter}
              onClickBackArrow={this.props.onClickBackArrow}
              onClickChapterItem={this.onClickChapterItem}
              onSlidingComplete={this.onSlidingComplete}
              totalPageCount={this.props.data.length}
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
