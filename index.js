import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native'
import InteractiveFlatList from 'react-native-interactive-flatList'
import { Icon } from 'react-native-elements'
import ComicBookImage from './ComicBookImage'
import ComicBookSlider from './ComicBookSlider'

export default class ComicBook extends Component {

  constructor(props) {
    super(props)
    this.scrollOffset = 0
    this.contentHeight = height
    this.animatedTopToolBarY = new Animated.Value(-50, { useNativeDriver: true })
    this.animatedBottomToolBarY = new Animated.Value(50, { useNativeDriver: true })
    this.animatedSliderBarY = new Animated.Value(50, { useNativeDriver: true })
    this.animatedChapterBarX =  new Animated.Value(chapterBarWidth, { useNativeDriver: true })
    this.animatedConfigBarY =  new Animated.Value(configBarHeight, { useNativeDriver: true })
    this.animatedOptionBarY =  new Animated.Value(100, { useNativeDriver: true })
    this.toolBarIsShow = false
    this.sliderBarIsShow = false
    this.chapterBarIsShow = false
    this.configBarIsShow = false
    this.optionBarIsShow = false
  }

  onScroll= ({nativeEvent}) => {
    this.scrollOffset = nativeEvent.contentOffset.y
    this.contentHeight = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height
  }

  ref = ref => this.FlatList = ref.getFlatList()

  scrollTop = () => {
    const scrollOffset = this.scrollOffset - height/3 < 0 ? 0 : this.scrollOffset - height/3
    this.FlatList.scrollToOffset({
      offset: scrollOffset,
      animated: true
    })    
  }

  scrollBottom = () => {
    const scrollOffset = this.scrollOffset + height/3 > this.contentHeight ? this.contentHeight :this.scrollOffset + height/3
    this.FlatList.scrollToOffset({
      offset: scrollOffset,
      animated: true
    })    
  }

  showToolBar = () => {
    Animated.parallel([
      Animated.timing(this.animatedTopToolBarY,{
        toValue: 0,
        duration: 200
      }),
      Animated.timing(this.animatedBottomToolBarY,{
        toValue: 0,
        duration: 200
      })
    ]).start(result => {
      if (result.finished) {
        this.toolBarIsShow = true
      }
    })    
  }

  hideToolBar = () => {
    Animated.parallel([
      Animated.timing(this.animatedTopToolBarY,{
        toValue: -50,
        duration: 200
      }),
      Animated.timing(this.animatedBottomToolBarY,{
        toValue: 50,
        duration: 200
      })
    ]).start(result => {
      if (result.finished) {
        this.toolBarIsShow = false
      }
    })
  }

  showSliderBar = () => {
    Animated.timing(this.animatedSliderBarY,{
      toValue: 0,
      duration: 200
    }).start(result => {
      if (result.finished) {
        this.sliderBarIsShow = true
      } 
    })
  }

  hideSliderBar = () => {
    Animated.timing(this.animatedSliderBarY,{
      toValue: 50,
      duration: 200
    }).start(result => {
      if (result.finished) {
        this.sliderBarIsShow = false
      } 
    })
  }

  showChapterBar = () => {
    Animated.timing(this.animatedChapterBarX,{
      toValue: 0,
      duration: 200
    }).start(result => {
      if (result.finished) {
        this.chapterBarIsShow = true
      } 
    })    
  }

  hideChapterBar = () => {
    Animated.timing(this.animatedChapterBarX,{
      toValue: chapterBarWidth,
      duration: 200
    }).start(result => {
      if (result.finished) {
        this.chapterBarIsShow = false
      } 
    })     
  }

  showConfigBar = () => {
    Animated.timing(this.animatedConfigBarY,{
      toValue: 0,
      duration: 200
    }).start(result => {
      if (result.finished) {
        this.configBarIsShow = true
      } 
    })
  }

  hideConfigBar = () => {
    Animated.timing(this.animatedConfigBarY,{
      toValue: configBarHeight,
      duration: 200
    }).start(result => {
      if (result.finished) {
        this.configBarIsShow = false
      } 
    })
  }

  showOptionBar = () => {
    Animated.timing(this.animatedOptionBarY,{
      toValue: 0,
      duration: 200
    }).start(result => {
      if (result.finished) {
        this.optionBarIsShow = true
      } 
    })  	
  }

  hideOptionBar = () => {
    Animated.timing(this.animatedOptionBarY,{
      toValue: 100,
      duration: 200
    }).start(result => {
      if (result.finished) {
        this.optionBarIsShow = false
      } 
    })  	
  }

  renderItem = ({ item }) => 
    <ComicBookImage
      resizeMode={'contain'} 
      style={{width, height: width, backgroundColor: 'black'}}
      source={{uri: item.uri}}
    />

  renderTopToolBar = () =>  
    <Animated.View style={[styles.topToolBar,{
      transform: [
        { translateY: this.animatedTopToolBarY  }
      ]}]}
    >
      <TouchableWithoutFeedback
        onPress={this.props.onClickBackArrow} 
      >
        <Icon
          iconStyle={styles.topToolBarLeftIcon}
          name='arrow-left'
          type='material-community'
          color='white'
        />
      </TouchableWithoutFeedback>
      <Text style={styles.titleText}>{'第一話'}</Text>
      <TouchableWithoutFeedback
        onPress={this.onClickOptionBar} 
      >
        <Icon
          iconStyle={styles.topToolBarRightIcon}
          name='dots-horizontal'
          type='material-community'
          color='white'
        />
      </TouchableWithoutFeedback>
    </Animated.View>

  renderBottomToolBar = () => 
    <Animated.View style={[styles.bottomToolBar,{
      transform: [
        { translateY: this.animatedBottomToolBarY }
      ]}]}
    >
      <View style={styles.bottomToolBarView}>
        <TouchableWithoutFeedback
          onPress={() => console.warn('發彈幕')} 
        >
          <View style={styles.iconView}>
            <Icon
              name='radio-tower'
              type='material-community'
              color='white'
            />
            <Text style={styles.iconText}>發彈幕</Text> 
          </View> 
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.onClickChapterBar} 
        >
          <View style={styles.iconView}>
            <Icon
              name='view-headline'
              type='material-community'
              color='white'
            />
            <Text style={styles.iconText}>目錄</Text> 
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.onClickSliderBar} 
        >
          <View style={styles.iconView}>
            <Icon
              name='toggle-switch'
              type='material-community'
              color='white'
            />
            <Text style={styles.iconText}>進度</Text> 
          </View>
        </TouchableWithoutFeedback> 
        <TouchableWithoutFeedback
          onPress={() => console.warn('夜間')} 
        >
          <View style={styles.iconView}>
            <Icon
              name='shield-half-full'
              type='material-community'
              color='white'
            />
            <Text style={styles.iconText}>夜間</Text> 
          </View> 
        </TouchableWithoutFeedback> 
        <TouchableWithoutFeedback
          onPress={this.onClickConfigBar} 
        >
          <View style={styles.iconView}>
            <Icon
              name='video-input-component'
              type='material-community'
              color='white'
            />
            <Text style={styles.iconText}>設定</Text> 
          </View>
        </TouchableWithoutFeedback> 
      </View>
    </Animated.View>


  renderSliderBar = () => 
    <Animated.View style={[styles.sliderBarView,{
      transform: [
        { translateY: this.animatedSliderBarY }
      ]}]}
    >
    	<TouchableWithoutFeedback
    		onPress={() => {console.warn('上一話')}}
    	>
	    	<View style={styles.pagefirst}>
		      <Icon
		        name='page-first'
		        type='material-community'
		        color='white'
		      />
	      </View>
      </TouchableWithoutFeedback>
      <View style={styles.progressSliderView}>
      	<ComicBookSlider style={styles.progressSlider}/>
      </View>
    	<TouchableWithoutFeedback
    		onPress={() => {console.warn('下一話')}}
    	>
	    	<View style={styles.pagelast}>
		      <Icon
		        name='page-last'
		        type='material-community'
		        color='white'
		      />
	       </View>
       </TouchableWithoutFeedback>
    </Animated.View>

  renderChapterBar = () => 
    <Animated.View style={[styles.chapterBar,{
      transform: [
        { translateX: this.animatedChapterBarX }
      ]}]}
    >
      <FlatList
        data={this.props.chapter}
        renderItem={({ item }) => 
          <View style={styles.chapterBarItemView}>
            <Text style={styles.chapterBarItemText}>{item.title}</Text>
          </View>
        }
      />
    </Animated.View> 

  renderConfigBar = () => 
    <Animated.View style={[styles.configBar,{
      transform: [
        { translateY: this.animatedConfigBarY }
      ]}]}
    >
    	<View style={styles.configBarItemView}>
    		<View style={styles.lightTextView}>
    			<Text style={styles.titleText}>亮度調節</Text>
    		</View>
    		<View style={styles.decagram}>
	        <Icon
	          name='decagram'
	          type='material-community'
	          color='white'
	        />
        </View>
        <View style={styles.lightSliderView}>
    			<ComicBookSlider style={styles.lightSlider}/>
    		</View>
    		<View style={styles.decagramoutline}>
	        <Icon
	          name='decagram-outline'
	          type='material-community'
	          color='white'
	        />
        </View>
    	</View>
    	<View style={styles.configBarItemView}/>
    	<View style={styles.configBarItemView}/>
    	<View style={styles.configBarItemView}/>
    </Animated.View>

   renderOptionBar= () => 
    <Animated.View style={[styles.optionBar,{
      transform: [
        { translateY: this.animatedOptionBarY }
      ]}]}
    >
	    <View style={styles.optionBarItemView}>
	      <TouchableWithoutFeedback
	        onPress={() => console.warn('下載')} 
	       >
	        <View style={styles.iconView}>
	          <Icon
	              name='arrow-down-bold-circle-outline'
	              type='material-community'
	              color='white'
	            />
	            <Text style={styles.iconText}>下載</Text> 
	        </View> 
	      </TouchableWithoutFeedback>
	      <TouchableWithoutFeedback
	        onPress={() => console.warn('詳情')} 
	       >
	        <View style={styles.iconView}>
	          <Icon
	              name='content-copy'
	              type='material-community'
	              color='white'
	            />
	            <Text style={styles.iconText}>詳情</Text> 
	        </View> 
	      </TouchableWithoutFeedback>
	      <TouchableWithoutFeedback
	        onPress={() => console.warn('評論')} 
	       >
	        <View style={styles.iconView}>
	          <Icon
	              name='comment-processing-outline'
	              type='material-community'
	              color='white'
	            />
	            <Text style={styles.iconText}>評論</Text> 
	        </View> 
	      </TouchableWithoutFeedback>
	      <TouchableWithoutFeedback
	        onPress={() => console.warn('分享')} 
	       >
	        <View style={styles.iconView}>
	          <Icon
	              name='share'
	              type='material-community'
	              color='white'
	            />
	            <Text style={styles.iconText}>分享</Text> 
	        </View> 
	      </TouchableWithoutFeedback>
	    </View>
     	<View style={styles.optionBarItemView}>
	      <TouchableWithoutFeedback
	        onPress={() => console.warn('收藏')} 
	       >
	        <View style={styles.iconView}>
	          <Icon
	              name='star-circle'
	              type='material-community'
	              color='white'
	            />
	            <Text style={styles.iconText}>收藏</Text> 
	        </View> 
	      </TouchableWithoutFeedback>
	      <TouchableWithoutFeedback
	        onPress={() => console.warn('投月票')} 
	       >
	        <View style={styles.iconView}>
	          <Icon
	              name='ticket'
	              type='material-community'
	              color='white'
	            />
	            <Text style={styles.iconText}>投月票</Text> 
	        </View> 
	      </TouchableWithoutFeedback>
	      <TouchableWithoutFeedback
	        onPress={() => console.warn('標籤')} 
	       >
	        <View style={styles.iconView}>
	          <Icon
	              name='bookmark'
	              type='material-community'
	              color='white'
	            />
	            <Text style={styles.iconText}>標籤</Text> 
	        </View> 
	      </TouchableWithoutFeedback>
	      <TouchableWithoutFeedback>
	        <View style={styles.iconView}>
	        </View> 
	      </TouchableWithoutFeedback>
     	</View>
    </Animated.View>

  onSingleClickTopArea = () => {
    if (this.toolBarIsShow) {
      this.hideToolBar()
    } else {
      if (this.sliderBarIsShow) {
        this.hideSliderBar()
      } else if (this.chapterBarIsShow) {
        this.hideChapterBar()
      } else if (this.configBarIsShow) {
        this.hideConfigBar()
      } else if (this.optionBarIsShow) {
      	this.hideOptionBar()
      }
    }
    this.scrollTop()
  }

  onSingleClickMiddleArea = () => {
    if (this.toolBarIsShow) {
      this.hideToolBar()
    } else {
      if (this.sliderBarIsShow) {
        this.hideSliderBar()
      } else if (this.chapterBarIsShow) {
        this.hideChapterBar()
      } else if (this.configBarIsShow) {
        this.hideConfigBar()
      } else if (this.optionBarIsShow) {
      	this.hideOptionBar()
      }
      else {
        this.showToolBar()
      }
    }
  }

  onSingleClickBottomArea = () => {
    if (this.toolBarIsShow) {
      this.hideToolBar()
    } else {
      if (this.sliderBarIsShow) {
        this.hideSliderBar()
      } else if (this.chapterBarIsShow) {
        this.hideChapterBar()
      } else if (this.configBarIsShow) {
        this.hideConfigBar()
      } else if (this.optionBarIsShow) {
      	this.hideOptionBar()
      }
    }
    this.scrollBottom()
  }

  onScrollBeginDrag = () => {
    if (this.toolBarIsShow) {
      this.hideToolBar()
    } else {
      if (this.sliderBarIsShow) {
        this.hideSliderBar()
      } else if (this.chapterBarIsShow) {
        this.hideChapterBar()
      } else if (this.configBarIsShow) {
        this.hideConfigBar()
      } else if (this.optionBarIsShow) {
      	this.hideOptionBar()
      }
    }
  }

  onClickSliderBar = () => {
    this.hideToolBar()
    this.showSliderBar()
  }

  onClickChapterBar = () => {
    this.hideToolBar()
    this.showChapterBar()
  }

  onClickConfigBar = () => {
    this.hideToolBar()
    this.showConfigBar()
  }

  onClickOptionBar = () => {
  	this.hideToolBar()
  	this.showOptionBar()
  }

  render() {
    return (
      <View style={styles.view}>
        <InteractiveFlatList
          ref={this.ref}
          data={this.props.data}
          renderItem={this.renderItem}
          onSingleClickTopArea={this.onSingleClickTopArea}
          onSingleClickMiddleArea={this.onSingleClickMiddleArea}
          onSingleClickBottomArea={this.onSingleClickBottomArea}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScroll={this.onScroll}
        />
          { this.renderTopToolBar() }
          { this.renderBottomToolBar() }
          { this.renderSliderBar() }
          { this.renderChapterBar() }
          { this.renderConfigBar() }
          { this.renderOptionBar() }
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

const chapterBarWidth = width*2/3

const configBarHeight = height*1/3

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  titleText: {
    color: 'white'
  },
  iconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    color: 'white'
  },
  topToolBar: {
    position: 'absolute', 
    top: 0,
    height: 50,
    width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topToolBarLeftIcon: {
    paddingLeft: 10
  },
  topToolBarRightIcon: {
    paddingRight: 10
  },
  bottomToolBar: {
    position: 'absolute', 
    height: 50,
    width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    bottom: 0    
  },
  bottomToolBarView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  sliderBarView: {
    position: 'absolute', 
    height: 50,
    width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  chapterBar: {
    position: 'absolute', 
    top: 0,
    right: 0,
    height,
    width: chapterBarWidth,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    paddingLeft: 10
  },
  chapterBarItemView: {
    height: height/9,
    borderBottomColor: 'rgba(192,192,192,0.3)',
    borderBottomWidth: 0.3,
    justifyContent: 'center'
  },
  chapterBarItemText: {
    fontSize: 15,
    color: 'white'
  },
  configBar: {
    position: 'absolute', 
    height: configBarHeight,
    width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    bottom: 0     
  },
  configBarItemView: {
  	flex: 1,
  	flexDirection: 'row',
  	alignItems: 'center',
  	paddingLeft: 10,
  	paddingRight: 10
  },
  optionBar: {
    position: 'absolute', 
    height: 100,
    width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    bottom: 0   	
  },
  optionBarItemView: {
  	flex: 1,
  	flexDirection: 'row'
  },
  lightTextView: {
  	flex: 2
  },
  decagram: {
  	flex: 1
  },
  lightSliderView: {
  	flex: 7
  },
  decagramoutline: {
  	flex: 1
  },
  lightSlider: {
  	width: width*4/7
  },
  pagefirst: {
  	flex: 1
  },
  pagelast: {
  	flex: 1
  },
  progressSliderView: {
  	flex: 6
  },
  progressSlider: {
  	width: width*5/7
  }
})