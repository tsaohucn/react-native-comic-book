import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableWithoutFeedback
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
  }

  showSliderBar = () => {
    if (this.animatedTopToolBarY._value === 0 && this.animatedBottomToolBarY._value === 0) {
      Animated.parallel([
        Animated.timing(this.animatedTopToolBarY,{
          toValue: -50,
          duration: 200
        }),
        Animated.timing(this.animatedBottomToolBarY,{
          toValue: 50,
          duration: 200
        }),
        Animated.timing(this.animatedSliderBarY,{
          toValue: 0,
          duration: 200
        })
      ]).start()
    }    
  }

  renderTopToolBarLeftComponent = () => 
    <TouchableWithoutFeedback
      onPress={() => console.warn('返回')} 
    >
      <Icon
        iconStyle={styles.topLeftIcon}
        name='arrow-left'
        type='material-community'
        color='white'
      />
    </TouchableWithoutFeedback>

    renderTopToolBarRightComponent = () => 
    <TouchableWithoutFeedback
      onPress={() => console.warn('更多選項')} 
    >
      <Icon
        iconStyle={styles.topRightIcon}
        name='dots-horizontal'
        type='material-community'
        color='white'
      />
    </TouchableWithoutFeedback>

  renderBottomToolBarComponent = () => 
    <View style={styles.renderBottomToolBarComponent}>
      <TouchableWithoutFeedback
        onPress={() => console.warn('發彈幕')} 
      >
        <View style={styles.bottomToolBarComponent}>
          <Icon
            name='radio-tower'
            type='material-community'
            color='white'
          />
          <Text style={styles.text}>發彈幕</Text> 
        </View> 
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => console.warn('目錄')} 
      >
        <View style={styles.bottomToolBarComponent}>
          <Icon
            name='view-headline'
            type='material-community'
            color='white'
          />
          <Text style={styles.text}>目錄</Text> 
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={this.showSliderBar} 
      >
        <View style={styles.bottomToolBarComponent}>
          <Icon
            name='toggle-switch'
            type='material-community'
            color='white'
          />
          <Text style={styles.text}>進度</Text> 
        </View>
      </TouchableWithoutFeedback> 
      <TouchableWithoutFeedback
        onPress={() => console.warn('夜間')} 
      >
        <View style={styles.bottomToolBarComponent}>
          <Icon
            name='shield-half-full'
            type='material-community'
            color='white'
          />
          <Text style={styles.text}>夜間</Text> 
        </View> 
      </TouchableWithoutFeedback> 
      <TouchableWithoutFeedback
        onPress={() => console.warn('設定')} 
      >
        <View style={styles.bottomToolBarComponent}>
          <Icon
            name='video-input-component'
            type='material-community'
            color='white'
          />
          <Text style={styles.text}>設定</Text> 
        </View>
      </TouchableWithoutFeedback> 
    </View>

  renderTopToolBar = () =>  
    <Animated.View style={[styles.topTool,{
      transform: [
        { translateY: this.animatedTopToolBarY  }
      ]}]}
    >
      { this.renderTopToolBarLeftComponent() }
      <Text style={styles.text}>{'第一話'}</Text>
      { this.renderTopToolBarRightComponent() }
    </Animated.View>

  renderBottomToolBar = () => 
    <Animated.View style={[styles.bottomTool,{
      transform: [
        { translateY: this.animatedBottomToolBarY }
      ]}]}
    >
      { this.renderBottomToolBarComponent() }
    </Animated.View>


  renderSliderBar = () => 
    <Animated.View style={[styles.bottomTool,{
      transform: [
        { translateY: this.animatedSliderBarY }
      ]}]}
    >
      <ComicBookSlider/>
    </Animated.View>

  onSingleClickTopArea = () => {
    if (this.animatedTopToolBarY._value === 0 && this.animatedBottomToolBarY._value === 0) {
      Animated.parallel([
        Animated.timing(this.animatedTopToolBarY,{
          toValue: -50,
          duration: 200
        }),
        Animated.timing(this.animatedBottomToolBarY,{
          toValue: 50,
          duration: 200
        }),
        Animated.timing(this.animatedSliderBarY,{
          toValue: 50,
          duration: 200
        })
      ]).start()
    }
    const scrollOffset = this.scrollOffset - height/3 < 0 ? 0 : this.scrollOffset - height/3
    this.FlatList.scrollToOffset({
      offset: scrollOffset,
      animated: true
    })
  }

  onSingleClickMiddleArea = () => {
    if (this.animatedTopToolBarY._value === 0 && this.animatedBottomToolBarY._value === 0) {
      Animated.parallel([
        Animated.timing(this.animatedTopToolBarY,{
          toValue: -50,
          duration: 200
        }),
        Animated.timing(this.animatedBottomToolBarY,{
          toValue: 50,
          duration: 200
        }),
        Animated.timing(this.animatedSliderBarY,{
          toValue: 50,
          duration: 200
        })
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(this.animatedTopToolBarY,{
          toValue: 0,
          duration: 200
        }),
        Animated.timing(this.animatedBottomToolBarY,{
          toValue: 0,
          duration: 200
        }),
        Animated.timing(this.animatedSliderBarY,{
          toValue: 50,
          duration: 200
        })
      ]).start()          
    }
  }

  onSingleClickBottomArea = () => {
    if (this.animatedTopToolBarY._value === 0 && this.animatedBottomToolBarY._value === 0) {
      Animated.parallel([
        Animated.timing(this.animatedTopToolBarY,{
          toValue: -50,
          duration: 200,
        }),
        Animated.timing(this.animatedBottomToolBarY,{
          toValue: 50,
          duration: 200
        })
      ]).start() 
    }
    const scrollOffset = this.scrollOffset + height/3 > this.contentHeight ? this.contentHeight :this.scrollOffset + height/3
    this.FlatList.scrollToOffset({
      offset: scrollOffset,
      animated: true
    })
  }

  onScrollBeginDrag = () => {
    if (this.animatedTopToolBarY._value === 0 && this.animatedBottomToolBarY._value === 0) {
      Animated.parallel([
        Animated.timing(this.animatedTopToolBarY,{
          toValue: -50,
          duration: 200,
        }),
        Animated.timing(this.animatedBottomToolBarY,{
          toValue: 50,
          duration: 200,
          })
      ]).start() 
    }
  }

  onScroll= ({nativeEvent}) => {
    this.scrollOffset = nativeEvent.contentOffset.y
    this.contentHeight = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height
  }

  ref = ref => this.FlatList = ref.getFlatList()

  renderItem = ({ item }) => 
    <ComicBookImage
      resizeMode={'contain'} 
      style={{width, height: width, backgroundColor: 'black'}}
      source={{uri: item.uri}}
    />

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
      </View>
    )
  }
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'white'
  },
  renderBottomToolBarComponent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bottomToolBarComponent: {
    height: 50,
    justifyContent: 'center'
  },
  topTool: {
    position: 'absolute', 
    top: 0,
    height: 50,
    width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomTool: {
    position: 'absolute', 
    height: 50,
    width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    bottom: 0    
  },
  topLeftIcon: {
    paddingLeft: 10
  },
  topRightIcon: {
    paddingRight: 10
  }
})