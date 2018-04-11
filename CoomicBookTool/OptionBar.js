import React from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback ,
  FlatList
} from 'react-native'
import { Icon } from 'react-native-elements'

const OptionBar = ({animatedOptionBarY}) => (
    <Animated.View style={[styles.optionBarAnimated,{
      transform: [
        { translateY: animatedOptionBarY }
      ]}]}
    >
      <View style={styles.optionBarRaw}>
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
      <View style={styles.optionBarRaw}>
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
)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  iconText: {
    color: 'white'
  },
  optionBarAnimated: {
    position: 'absolute', 
    height: 100,
    width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    bottom: 0     
  },
  optionBarRaw: {
    flex: 1,
    flexDirection: 'row'
  },
  iconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default OptionBar