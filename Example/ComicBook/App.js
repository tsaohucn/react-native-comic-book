import React, { Component } from 'react'
import { 
  View, 
  Text,
  Image,
  Button,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition'
import ComicBook from 'react-native-comic-book'
import LoadingImage from './LoadingImage'

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.home}>
        <Text>Home</Text>
        <Button
          title="Go To ComicBook"
          onPress={() => this.props.navigation.navigate('ComicBook')}
        />
      </View>
    );
  }
}

class ComicBookScreen extends Component {

  constructor(props) {
    super(props)
    this.length = new Array
    this.offset = new Array
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    // this part may exist some issue on ios now
    // https://github.com/facebook/react-native/pull/18875
    const scaleImageHeightPromise = content.map(async (ele,index) => {
      let scaleImageHeight = width
      await Image.getSize(ele.uri,(imageWidth, imageHeight) => {
        if (imageWidth && imageHeight) {
          scaleImageHeight = width*imageHeight/imageWidth
          console.log(scaleImageHeight)
        }
      },() => {
        scaleImageHeight = width
      })
      return scaleImageHeight
    })
    
    Promise.all(scaleImageHeightPromise).then(value => {
      this.length = value
      let offset = 0
      this.offset = this.length.map(lenght => {
        offset += lenght
        return offset
      })
      this.offset.unshift(0)
      this.setState({
        isLoading: false
      })
    }).catch(err => {
      alert(err)
    })
  }

  onEndComicBook = (pageNumber) =>  {
    console.log(pageNumber)
  }

  onClickBackArrow = () => {
    this.props.navigation.goBack()
  }

  noPreviousChapter = () => {
    console.log('沒有上一回')
  }

  noNextChapter = () => {
    console.log('沒有下一回')
  }

  noPreviousPageNumber = () => {
    console.log('沒有上一頁')
  }

  noNextPageNumber = () => {
    console.log('沒有下一頁')
  }

  renderContent = ({ item, index }) => 
    <LoadingImage
      width={width}
      height={this.length[index]}
      source={{uri: item.uri}}
    />

  getContentLayout = (data, index) => {
    if (index >= 0) {
      return { length: this.length[index], offset: this.offset[index], index }
    } else {
      return { length: 0, offset: 0, index } 
      // Add this line because initialPageNumber will cause index < 0 bug now
      // https://github.com/facebook/react-native/issues/18743
    }
  }

  render() {
    return (
      <View style={styles.comicbook}>
        {
          this.state.isLoading ? 
          <ActivityIndicator
            style={styles.activityIndicator}
            size={'large'}
            color={'white'}
          /> :
          <ComicBook
            onClickBackArrow={this.onClickBackArrow}
            onEndComicBook={this.onEndComicBook}
            noPreviousChapter={this.noPreviousChapter}
            noNextChapter={this.noNextChapter}
            noPreviousPageNumber={this.noPreviousPageNumber}
            noNextPageNumber={this.noNextPageNumber}
            content={content}
            renderContent={this.renderContent}
            getContentLayout={this.getContentLayout}
            initialPageNumber={5}
            chapter={chapter}
          />
        }
      </View>
    )
  }
}

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    ComicBook: {
      screen: ComicBookScreen,
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig: getSlideFromRightTransition
  }
)

const { width, heigth } = Dimensions.get("window")

const content = Array(500).fill().map((e,index) => {

  const randomWidth = getRandomArbitrary(200,500).toFixed(0)
  const randomHeight = getRandomArbitrary(200,500).toFixed(0)

  return({ 
    key: index.toString(),
    uri: 'https://via.placeholder.com/' + randomWidth + 'x' + randomHeight
    //uri: 'https://picsum.photos/'+ randomWidth + '/' + randomHeight + '?image=' + index,
  })
})

const chapter = [
  { pageNumber: 20, title: '戰役' },
  { pageNumber: 133, title: '精氣' },
  { pageNumber: 100, title: '鎮寢之寶' },
  { pageNumber: 93, title: '夢中人' },
  { pageNumber: 45, title: '飛來豔福' },
  { pageNumber: 198, title: '馬克思主義哲學' },
  { pageNumber: 267, title: '演員的自我修飾' },
  { pageNumber: 356, title: '天降之物' },
  { pageNumber: 462, title: '亞拉那一卡？' },
  { pageNumber: 410, title: '相遇' }
]

const styles = { 
  home: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  comicbook: {
    flex: 1,
    backgroundColor: '#000000'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center'
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}