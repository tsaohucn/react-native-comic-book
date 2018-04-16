### react-native-comic-book
<img src="https://lh3.googleusercontent.com/Uag0Nn375R4gxegCHjgwM5PXDMbOrSJtuo163rwfqzqOcupNgWnVRsbABtENibzbyutcmO9_XS0ApIwhq0-TpTD6mg4TyLV1eyyWTzDWKH3sIcUy1MneaMKo-SndCxmmPWOEZF2as8UEWbVjBPqmYxmxVNgNh9H8ssubYoA12KYZMfBsH_rXWUaPc2_UdwZ0fiXxDH4gmsmJC-KZeFZAvaGc1Z99--LENktK1mpSoK2vlHcNYrWFOsGDAbzOomNxkn9AI5-CPbxjehD5pHpncB_59_5fmdJKepJseTfcilslD-aA9rLhliEcq6gFhl0P9aPf-8p03ddjJiUs5ENUbNcxehEIzhfzglVP_Mnm1QORmWNQRjxmtL625wfujf3PLO-EmdIjW6hoB7M5Gx2phAqS5Jo3pYvNckJercGG5-qL7oWrqaH6s-JWwiq2qjt7c0Uf5AhOUCXGhseMYdEqxDQeVS31ZHYE4nq61xjA7GHSE4dtQjhc--Yb23X9YZg2dz3wn-lwGUi435tj6K8QTNXzDNZY4uLgeuf0icZEH-CTPYHbvCYSUwdzBK2Bf2KlWaPImqdLcZ44EHSTMXssRHi0oRq9zd_4ybuy6Q=w375-h667-no" width="200"> <img src="https://lh3.googleusercontent.com/332itAwnKxwvOwbZCAZeiAGtM7WqT2XF7UVvTfQI5K7n6kklegrSFQHaQS2Ocx5n9Laks2AvhFjMV_K0RJwuCsakBusaOClEocnpjmRoLaR3Vo0g_4zyKu9uzxVxzazBmdwbPaMn8lLBTv89w0gLg1qMcfZbE35VTE1FAY3fCZv9KqYh20K9Xg88OWxgumecl57kgW1XXUjkAaRGJIyU3zWO5e3QtG-tfcLdJqVXc6pmsvNPOf1wC7hKuCW7hbxRd3sNqshPS5TB6_6Ogxtsg6PlmQ0M-3qoeTQFYtOKyWrAg2GYY6BKeIDjn5BqiDyz9F9p19fpcFi-ej0iEVd20KSd75NhhivAz-7mLi-CQpNH_MdHxgSqzYpUzns7Qd0q4JnsucCBVdafmRhhMfLb1CCOVDKdVh90eTTEwNDfiBHUENohZHomkJOaN4XX6nUKbIsp7Y7Kbs6n_XQ0oEkEmX7eDogQj52dL_5aFmTXZJsLbRTokYLjzc6yM2WGj8A9Cxoc9_6k9zCmyl7fpUhJBKbye9Ha8GugyIH8OUHkhdqNW-Hcm5cjRrXEZwBpmMEYzP-DmPfmSOqPE37eJAftPnmj5lcNMd_j9xDVFw=w573-h1019-no" width="200"> <img src="https://lh3.googleusercontent.com/J5Rgn2_0ZYnpIm2Ud6pG3hP5WsHW0hcHE4hj0zr4qmQxrkix62FkgzWFQbZAIuPRPorWGiAvNt0NyqkMiVERjuEdxkbTyLOLFjkBG_43YkuiSPF820nRwWKCUrrz8DuymuAHSj29c6KCj8olkzt6Oj0Y-sMUlRZpaB1Lugl3rvZ16s4d87WV-1zDT7ZvJ7pwgNTImIvTaSMjiR8ujnYwbh8zApzNARmAzOjqv3F_AJJJej0JqmCuGR97kVNi3upZpK3s9dojrEPKtGx98lQbL6-9qpuC0_jStxAGAvaUrLPe_fMHFOPHYR6PIOBXW3cTqDZBcCFAtfvk4L_t-9x210cdkHqmJb_Owci0e1HX5wqcicg8OlKOHE4O2QOyhFaAz7HXqe-QtEecAcnxboQFmkqctCWHwjxBtv2eoV1y_16fu4RjTLBeISjD5qW8KtZAYKTGjkGkAu-SHnfA6R_KRsB0YaOVGmAjOmaDApBz7hr8hwPQ6YqMOOncY-c749XP3RNBsAO1LugwuqHiTEpw-aL35pP9dxDzHvYQ0Qho7LKX1aEkbxsNwK8tFP205CibUGdmDGOtmbEIQEvBBNULT0HdlBZ7Nx9IpDELxg=w573-h1019-no" width="200">
## Installation
1. Run`npm install git+http://192.168.0.200/xc/react-native-comic-book.git --save`

2. react-native-comic-book use some native library so that you have to link **those library below** before you use react-native-comic-book

	`react-native link react-native-vector-icons`
	
	`react-native link react-native-screen-brightness`
	
	`react-native link react-native-gesture-handler`
	
3. Open your MainActivity.java to change the code to below

	```java
	import com.facebook.react.ReactActivityDelegate;
	import com.facebook.react.ReactRootView;
	import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
	
	public class MainActivity extends ReactActivity {
	
	  // Add the following method to your main activity class
	  @Override
	  protected ReactActivityDelegate createReactActivityDelegate() {
	    return new ReactActivityDelegate(this, getMainComponentName()) {
	      @Override
	      protected ReactRootView createRootView() {
	        return new RNGestureHandlerEnabledRootView(MainActivity.this);
	      }
	    };
	  }
	}
	```
4. Open your MainApplication.java to change the code to below
	```Java
	  new ScreenBrightnessPackage(1)
	```
	
## API

 Props | Description | Type | Default
------ | ------ | ------ | ------
onClickBackArrow | Fired after you click back-arrow icon | function | none
onEndComicBook | Fired after end of your comic-book | function | none
noPreviousChapter | Fired when you click `PreviousChapter` button but there's no any previous chapter | function | none
noNextChapter | Fired when you click `NextChapter` button but there's no any next chapter | function | none
noPreviousPageNumber | Fired when you click `TopArea` to page up but it's alerady in the first page with no previous page | function | none
noNextPageNumber | Fired when you click `BottomArea` to page down but it's alerady in the last page with no next page | function | none
initialPageNumber| Initial page number of your comic-book | Integer | 1
chapter | Chapter structure of your comic-book | Array[object] | []
content | Content of your comic-book | Array[object] | []
renderContent`required` | How to render your content | function | none
getContentLayout`required` | Layout of your content | function | none

## Array[object]

- chapter : `[{ pageNumber: (Int)(Reuired)(Unique), title: (String)(Option) }]`
  - pageNumber : pageNumber of this chapter
  - title : title of this chapter

- content : `[{ key: (String)(Reuired)(Unique), ...other }]`
  - key : unique string key
  - ...other : It depends on your renderContent function that how do you render your each item

## Remember custom your renderContent and getContentLayout at same time

- The props as same as `renderItem` `getItemLayout` of FlatList

```JSX
renderContent = ({ item, index }) => {
  // return your content render
}

getContentLayout = (data, index) => { 
  // return your content layout
  if (index >= 0) {
    return { length: `your item length of this index`, offset: `your item offset of this index`, index }
  } else {
    return { length: 0, offset: 0, index } 
    // Add this line because initialPageNumber will cause index < 0 bug now
    // https://github.com/facebook/react-native/issues/18743
  }
}
```

## Usage example

- Novel

```JSX
import React, { Component } from 'react'
import { 
  View, 
  Text,
  Button,
  Dimensions
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition'
import ComicBook from 'react-native-comic-book'

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
    <View style={styles.content}>
      <View style={styles.pageNumber}>
        <Text>{index + 1}</Text>
      </View>
      <View style={styles.novel}>
        <Text>{item.novel}</Text>
      </View>
    </View>

  getContentLayout = (data, index) => ({ length: 500, offset: 500*index, index })

  render() {
    return (
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
        initialPageNumber={30}
        chapter={chapter}
      />
    );
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

const content = Array(100).fill().map((e,index) => ({
  key: index.toString(),
  novel: '你的小說內容'
}))

const chapter = [
  { pageNumber: 76, title: '戰役' },
  { pageNumber: 5, title: '精氣' },
  { pageNumber: 29, title: '鎮寢之寶' },
  { pageNumber: 16, title: '夢中人' },
  { pageNumber: 39, title: '飛來豔福' },
  { pageNumber: 26, title: '馬克思主義哲學' },
  { pageNumber: 69, title: '演員的自我修飾' },
  { pageNumber: 48, title: '天降之物' },
  { pageNumber: 95, title: '亞拉那一卡？' },
  { pageNumber: 89, title: '相遇' }
]

const styles = { 
  home: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: 'white', 
    height: 500
  },
  pageNumber: {
    flex: 1
  },
  novel: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  } 
}
```

- ComicBook

```JSX
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
```