import React from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback 
} from 'react-native'
import PropTypes from "prop-types"
import { Icon } from 'react-native-elements'

const TopBar = ({ title, animatedTopBarY, onClickBackArrow, onClickOptionBar }) => (
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
    <Text numberOfLines={1} style={styles.iconText}>{title}</Text>
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
)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  iconText: {
    width: width*0.7,
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

TopBar.propTypes = {
  title: PropTypes.string,
  animatedTopBarY: PropTypes.instanceOf('Animated'),
  onClickBackArrow: PropTypes.func,
  onClickOptionBar: PropTypes.func
};

TopBar.defaultProps = {
  animatedTopBarY: 0
};

export default TopBar