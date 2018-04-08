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

const ChapterBar = ({ animatedChapterBarX, onClickChapterItem, chapter }) => (
  <Animated.View style={[styles.chapterBarAnimated,{
    transform: [
      { translateX: animatedChapterBarX }
    ]}]}
  >
    <FlatList
      data={chapter}
      renderItem={({ item }) => 
        <TouchableWithoutFeedback
          onPress={() => {
            onClickChapterItem && onClickChapterItem(item.pageNumber)
          }}
        >
          <View style={styles.chapterBarView}>
            <Text style={styles.chapterBarText}>{item.title}</Text>
          </View>
        </TouchableWithoutFeedback>
      }
    />
  </Animated.View>
)

const { width, height } = Dimensions.get('window')

const chapterBarWidth = width*2/3

const styles = StyleSheet.create({
  chapterBarAnimated: {
    position: 'absolute', 
    top: 0,
    right: 0,
    height,
    width: chapterBarWidth,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    paddingLeft: 10
  },
  chapterBarView: {
    height: height/9,
    borderBottomColor: 'rgba(192,192,192,0.3)',
    borderBottomWidth: 0.3,
    justifyContent: 'center'
  },
  chapterBarText: {
    fontSize: 15,
    color: 'white'
  }
})

export default ChapterBar