import React, { Component }  from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback ,
  FlatList
} from 'react-native'

export default class ProgressBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentChapterNumber: null
    }
  }

  receivePageNumber = pageNumber => {
    const chapterPageNumbers = this.props.chapter.map(ele => ele.pageNumber).filter(chapterPageNumber => chapterPageNumber <= pageNumber)
    const currentChapterNumber = chapterPageNumbers[chapterPageNumbers.length - 1]
    if (this.state.currentChapterNumber != currentChapterNumber) {
      this.setState({
        currentChapterNumber: currentChapterNumber
      })
    }
  }

  render() {
    return(
      <Animated.View style={[styles.chapterBarAnimated,{
        transform: [
          { translateX: this.props.animatedChapterBarX }
        ]}]}
      >
        <FlatList
          data={this.props.chapter.sort((a, b) => a.pageNumber - b.pageNumber)}
          keyExtractor={item => item.pageNumber.toString()}
          extraData={this.state.currentChapterNumber}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => 
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.onClickChapterItem && this.props.onClickChapterItem(item.pageNumber)
              }}
            >
              <View style={[styles.chapterBarView,{ backgroundColor: item.pageNumber === this.state.currentChapterNumber ? 'rgba(78, 78, 78, 0.8)' : 'rgba(52, 52, 52, 0.8)' }]}>
                <Text style={styles.chapterBarText}>{item.title}</Text>
                <Text style={styles.chapterBarText}>{item.pageNumber}</Text>
              </View>
            </TouchableWithoutFeedback>
          }
        />
      </Animated.View>
    )
  }
}

const { width, height } = Dimensions.get('window')

const chapterBarWidth = width*2/3

const styles = StyleSheet.create({
  chapterBarAnimated: {
    position: 'absolute', 
    top: 0,
    right: 0,
    height,
    width: chapterBarWidth,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  chapterBarView: {
    height: height/9,
    borderBottomColor: 'rgba(192,192,192,0.3)',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chapterBarText: {
    fontSize: 15,
    color: 'white',
    padding: 10
  }
})