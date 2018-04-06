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

const TopBar = ({ animatedTopBarY, onClickBackArrow, onClickOptionBar }) => (
  <View>
  <Animated.View style={[styles.topToolBarAnimated,{
    transform: [
      { translateY: animatedTopBarY  }
    ]}]}
  >
    <TouchableWithoutFeedback
      onPress={onClickBackArrow} 
    >
      <View style={styles.topToolBarIconView}>
        <Icon
          iconStyle={styles.topToolBarIcon}
          name='arrow-left'
          type='material-community'
          color='white'
        />
      </View>
    </TouchableWithoutFeedback>
    <Text style={styles.iconText}>{'第一話'}</Text>
    <TouchableWithoutFeedback
      onPress={onClickOptionBar} 
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
  </View>
)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  iconText: {
    color: 'white'
  },
  topToolBarAnimated: {
    position: 'absolute',
    top: 0,
    width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  topToolBarIconView: {
    height: 50,
    justifyContent: 'center'
  },
  topToolBarIcon: {
    paddingLeft: 10,
     paddingRight: 10
  }
})

export default TopBar