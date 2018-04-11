import React from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback 
} from 'react-native'
import { Icon } from 'react-native-elements'
import ComicBookBrightness from './ComicBookBrightness'

const BottomBar = ({animatedBottomBarY, onClickChapterBar, onClickProgressBar, onClickConfigBar }) => (
  <Animated.View style={[styles.bottomToolBarAnimated,{
    transform: [
      { translateY: animatedBottomBarY }
      ]}]}
    >
      <TouchableWithoutFeedback>
        <View style={styles.bottomToolBarIconView}>
          <Icon
            name='radio-tower'
            type='material-community'
            color='white'
          />
          <Text style={styles.iconText}>發彈幕</Text> 
        </View> 
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={onClickChapterBar} 
      >
        <View style={styles.bottomToolBarIconView}>
          <Icon
            name='view-headline'
            type='material-community'
            color='white'
          />
          <Text style={styles.iconText}>目錄</Text> 
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={onClickProgressBar} 
      >
        <View style={styles.bottomToolBarIconView}>
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
        onPress={onClickConfigBar} 
      >
        <View style={styles.bottomToolBarIconView}>
          <Icon
            name='video-input-component'
            type='material-community'
            color='white'
          />
        <Text style={styles.iconText}>設定</Text> 
      </View>
    </TouchableWithoutFeedback> 
  </Animated.View>
)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  iconText: {
    color: 'white'
  },
  bottomToolBarAnimated: {
    position: 'absolute',
    bottom: 0,
    width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  bottomToolBarIconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default BottomBar