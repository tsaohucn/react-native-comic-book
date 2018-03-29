import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
} from 'react-native'
import { Icon } from 'react-native-elements'
import ScreenBrightness from 'react-native-screen-brightness'
import InteractiveFlatList from 'react-native-interactive-flatList'
import ComicBookImage from './ComicBookImage'
import ComicBookSlider from './ComicBookSlider'
import ComicBookSwitch from './ComicBookSwitch'
import ComicBookBrightness from './ComicBookBrightness'

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

  ref = ref => this.FlatList = ref.getFlatList()

  getItemLayout = (data, index) => (
    { length: width, offset: width * index, index }
  )

  onScroll= ({nativeEvent}) => {
    this.scrollOffset = nativeEvent.contentOffset.y
    this.contentHeight = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height
  }

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

  scrollIndex = index => {
    this.hideChapterBar()
    this.FlatList.scrollToIndex({animated: false, index: index})
  }

  showToolBar = () => {
    Animated.parallel([
      Animated.timing(this.animatedTopToolBarY,{
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedBottomToolBarY,{
        toValue: 0,
        duration: 200,
        useNativeDriver: true
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
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedBottomToolBarY,{
        toValue: 50,
        duration: 200,
        useNativeDriver: true
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
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.sliderBarIsShow = true
      } 
    })
  }

  hideSliderBar = () => {
    Animated.timing(this.animatedSliderBarY,{
      toValue: 50,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.sliderBarIsShow = false
      } 
    })
  }

  showChapterBar = () => {
    Animated.timing(this.animatedChapterBarX,{
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.chapterBarIsShow = true
      } 
    })    
  }

  hideChapterBar = () => {
    Animated.timing(this.animatedChapterBarX,{
      toValue: chapterBarWidth,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.chapterBarIsShow = false
      } 
    })     
  }

  showConfigBar = () => {
    Animated.timing(this.animatedConfigBarY,{
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.configBarIsShow = true
      } 
    })
  }

  hideConfigBar = () => {
    Animated.timing(this.animatedConfigBarY,{
      toValue: configBarHeight,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.configBarIsShow = false
      } 
    })
  }

  showOptionBar = () => {
    Animated.timing(this.animatedOptionBarY,{
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        this.optionBarIsShow = true
      } 
    })  	
  }

  hideOptionBar = () => {
    Animated.timing(this.animatedOptionBarY,{
      toValue: 100,
      duration: 200,
      useNativeDriver: true
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
        <View style={styles.topToolBarView}>
          <Icon
            iconStyle={styles.topToolBarIcon}
            name='arrow-left'
            type='material-community'
            color='white'
          />
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.titleText}>{'第一話'}</Text>
      <TouchableWithoutFeedback
        onPress={this.onClickOptionBar} 
      >
        <View style={styles.topToolBarView}>
          <Icon
            iconStyle={styles.topToolBarIcon}
            name='dots-horizontal'
            type='material-community'
            color='white'
          />
        </View>
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
          //onPress={} 
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
          <ComicBookBrightness/> 
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
    		onPress={this.previousChapter}
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
      	<ComicBookSlider 
          showIndicator
          style={styles.progressSlider}
          onSlidingComplete={this.onSlidingComplete}
          step={1}
          minimumValue={0}
          maximumValue={this.props.data.length - 1}
        />
      </View>
    	<TouchableWithoutFeedback
    		onPress={this.nextChapter}
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
          <TouchableWithoutFeedback
            onPress={() => {
              this.onClickChapterItem(item)
            }}
          >
            <View style={styles.chapterBarItemView}>
              <Text style={styles.chapterBarItemText}>{item.title}</Text>
            </View>
          </TouchableWithoutFeedback>
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
    			<ComicBookSlider 
            ref={ref => this.lightSlider = ref}
            style={styles.lightSlider}
            //onSlidingStart={this.onLightSlidingStart}
            onValueChange={this.onLightValueChange}
          />
    		</View>
    		<View style={styles.decagramoutline}>
	        <Icon
	          name='decagram-outline'
	          type='material-community'
	          color='white'
	        />
        </View>
    	</View>
    	<View style={styles.configBarItemView}>
        <View style={styles.view}>
          <Text style={styles.titleText}>閱讀模式</Text>
        </View>
        <View style={styles.readStyle}>
          <Icon
            name='book-open'
            type='material-community'
            color='white'
          />
           <Text style={styles.titleText}>普通模式</Text>
        </View>
        <View style={styles.readStyle}>
          <Icon
            name='book-open-page-variant'
            type='material-community'
            color='white'
          />
           <Text style={styles.titleText}>日漫模式</Text>
        </View>
        <View style={styles.readStyle}>
          <Icon
            name='book-open-variant'
            type='material-community'
            color='white'
          />
           <Text style={styles.titleText}>捲軸模式</Text>
        </View>
        <View style={styles.nonReadStyle}/>
      </View>
    	<View style={styles.configBarItemView}>
        <View style={styles.view}>
          <Text style={styles.titleText}>橫豎屏</Text>
        </View>
        <View style={styles.readStyle}>
          <Icon
            name='desktop-mac'
            type='material-community'
            color='white'
          />
           <Text style={styles.titleText}>橫屏</Text>
        </View>
        <View style={styles.readStyle}>
          <Icon
            name='desktop-classic'
            type='material-community'
            color='white'
          />
           <Text style={styles.titleText}>豎屏</Text>
        </View>

        <View style={styles.nonReadStyle}/>
        <View style={styles.nonReadStyle}/>
      </View>
    	<View style={styles.configBarItemView}>
        <View style={styles.view}>
          <Text style={styles.titleText}>顯示單章節評論</Text>
        </View>
        <ComicBookSwitch/>
      </View>
    </Animated.View>

   renderOptionBar= () => 
    <Animated.View style={[styles.optionBar,{
      transform: [
        { translateY: this.animatedOptionBarY }
      ]}]}
    >
	    <View style={styles.optionBarItemView}>
	      <TouchableWithoutFeedback
	        //onPress={} 
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
	        //onPress={} 
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
	        //onPress={} 
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
	        //onPress={} 
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
	        //onPress={} 
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
	        //onPress={} 
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
	        //onPress={} 
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
    } else if (this.sliderBarIsShow) {
      this.hideSliderBar()
    } else if (this.chapterBarIsShow) {
      this.hideChapterBar()
    } else if (this.configBarIsShow) {
      this.hideConfigBar()
    } else if (this.optionBarIsShow) {
      this.hideOptionBar()
    } else {
      this.scrollTop()
    }
  }

  onSingleClickMiddleArea = () => {
    if (this.toolBarIsShow) {
      this.hideToolBar()
    } else if (this.sliderBarIsShow) {
      this.hideSliderBar()
    } else if (this.chapterBarIsShow) {
      this.hideChapterBar()
    } else if (this.configBarIsShow) {
      this.hideConfigBar()
    } else if (this.optionBarIsShow) {
      this.hideOptionBar()
    } else {
      this.showToolBar()
    }
  }

  onSingleClickBottomArea = () => {
    if (this.toolBarIsShow) {
      this.hideToolBar()
    } else if (this.sliderBarIsShow) {
      this.hideSliderBar()
    } else if (this.chapterBarIsShow) {
      this.hideChapterBar()
    } else if (this.configBarIsShow) {
      this.hideConfigBar()
    } else if (this.optionBarIsShow) {
      this.hideOptionBar()
    } else {
      this.scrollBottom()
    }
  }

  onScrollBeginDrag = () => {
    if (this.toolBarIsShow) {
      this.hideToolBar()
    } else if (this.sliderBarIsShow) {
      this.hideSliderBar()
    } else if (this.chapterBarIsShow) {
      this.hideChapterBar()
    } else if (this.configBarIsShow) {
      this.hideConfigBar()
    } else if (this.optionBarIsShow) {
      this.hideOptionBar()
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
    if (Platform.OS === 'android') {
      ScreenBrightness.getAppBrightness()
      .then(brightness => {
        if (brightness >= 0 && brightness <= 1) {
          this.lightSlider.setValue(brightness)
        } else {
          this.lightSlider.setValue(0)
        }
        this.hideToolBar()
        this.showConfigBar()
      })
    } else {
      ScreenBrightness.getBrightness()
      .then(brightness => {
        this.lightSlider.setValue(brightness)
        this.hideToolBar()
        this.showConfigBar()
      })
    }
  }

  onClickOptionBar = () => {
  	this.hideToolBar()
  	this.showOptionBar()
  }

  onClickChapterItem = item => {
    this.scrollIndex(item.startPage - 1)
  }

  onSlidingComplete = value => {
    this.scrollIndex(value)
  }

  previousChapter = () => {
    //console.warn('previousChapter')
  }

  nextChapter = () => {
    //console.warn('nextChapter')
  }

  onLightValueChange = value => {
    if (Platform.OS === 'android') {
      ScreenBrightness.setAppBrightness(value)
    } else {
      ScreenBrightness.setBrightness(value)
    }
  }

  render() {
    return (
      <View style={styles.view}>
        <InteractiveFlatList
          ref={this.ref}
          data={this.props.data}
          renderItem={this.renderItem}
          getItemLayout={this.getItemLayout}
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

const configBarHeight = height*1/2

const styles = StyleSheet.create({
  modal: {
    flex: 1, 
    backgroundColor: 'black',
    justifyContent: 'center', 
    alignItems: 'center' 
  },
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
  topToolBarView: {
    height: 50,
    justifyContent: 'center'
  },
  topToolBarIcon: {
    paddingLeft: 10,
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
  	flex: 1,
    paddingTop: 2
  },
  lightSliderView: {
  	flex: 7,
    paddingTop: Platform.OS === 'android' ? 1 : 0
  },
  decagramoutline: {
  	flex: 1,
    paddingTop: 2
  },
  lightSlider: {
  	width: width*4/7,
  },
  pagefirst: {
  	flex: 1
  },
  pagelast: {
  	flex: 1
  },
  progressSliderView: {
  	flex: 6,
  },
  progressSlider: {
  	width: width*5/7
  },
  readStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 5,
    borderRadius: 5,
    height: configBarHeight/5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nonReadStyle: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'white',
    marginRight: 5,
    borderRadius: 5,
    height: configBarHeight/5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})