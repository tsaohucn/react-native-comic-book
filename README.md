### react-native-comic-book
<img src="https://lh3.googleusercontent.com/Uag0Nn375R4gxegCHjgwM5PXDMbOrSJtuo163rwfqzqOcupNgWnVRsbABtENibzbyutcmO9_XS0ApIwhq0-TpTD6mg4TyLV1eyyWTzDWKH3sIcUy1MneaMKo-SndCxmmPWOEZF2as8UEWbVjBPqmYxmxVNgNh9H8ssubYoA12KYZMfBsH_rXWUaPc2_UdwZ0fiXxDH4gmsmJC-KZeFZAvaGc1Z99--LENktK1mpSoK2vlHcNYrWFOsGDAbzOomNxkn9AI5-CPbxjehD5pHpncB_59_5fmdJKepJseTfcilslD-aA9rLhliEcq6gFhl0P9aPf-8p03ddjJiUs5ENUbNcxehEIzhfzglVP_Mnm1QORmWNQRjxmtL625wfujf3PLO-EmdIjW6hoB7M5Gx2phAqS5Jo3pYvNckJercGG5-qL7oWrqaH6s-JWwiq2qjt7c0Uf5AhOUCXGhseMYdEqxDQeVS31ZHYE4nq61xjA7GHSE4dtQjhc--Yb23X9YZg2dz3wn-lwGUi435tj6K8QTNXzDNZY4uLgeuf0icZEH-CTPYHbvCYSUwdzBK2Bf2KlWaPImqdLcZ44EHSTMXssRHi0oRq9zd_4ybuy6Q=w375-h667-no" width="100"><img src="https://lh3.googleusercontent.com/332itAwnKxwvOwbZCAZeiAGtM7WqT2XF7UVvTfQI5K7n6kklegrSFQHaQS2Ocx5n9Laks2AvhFjMV_K0RJwuCsakBusaOClEocnpjmRoLaR3Vo0g_4zyKu9uzxVxzazBmdwbPaMn8lLBTv89w0gLg1qMcfZbE35VTE1FAY3fCZv9KqYh20K9Xg88OWxgumecl57kgW1XXUjkAaRGJIyU3zWO5e3QtG-tfcLdJqVXc6pmsvNPOf1wC7hKuCW7hbxRd3sNqshPS5TB6_6Ogxtsg6PlmQ0M-3qoeTQFYtOKyWrAg2GYY6BKeIDjn5BqiDyz9F9p19fpcFi-ej0iEVd20KSd75NhhivAz-7mLi-CQpNH_MdHxgSqzYpUzns7Qd0q4JnsucCBVdafmRhhMfLb1CCOVDKdVh90eTTEwNDfiBHUENohZHomkJOaN4XX6nUKbIsp7Y7Kbs6n_XQ0oEkEmX7eDogQj52dL_5aFmTXZJsLbRTokYLjzc6yM2WGj8A9Cxoc9_6k9zCmyl7fpUhJBKbye9Ha8GugyIH8OUHkhdqNW-Hcm5cjRrXEZwBpmMEYzP-DmPfmSOqPE37eJAftPnmj5lcNMd_j9xDVFw=w573-h1019-no" width="100"><img src="https://lh3.googleusercontent.com/J5Rgn2_0ZYnpIm2Ud6pG3hP5WsHW0hcHE4hj0zr4qmQxrkix62FkgzWFQbZAIuPRPorWGiAvNt0NyqkMiVERjuEdxkbTyLOLFjkBG_43YkuiSPF820nRwWKCUrrz8DuymuAHSj29c6KCj8olkzt6Oj0Y-sMUlRZpaB1Lugl3rvZ16s4d87WV-1zDT7ZvJ7pwgNTImIvTaSMjiR8ujnYwbh8zApzNARmAzOjqv3F_AJJJej0JqmCuGR97kVNi3upZpK3s9dojrEPKtGx98lQbL6-9qpuC0_jStxAGAvaUrLPe_fMHFOPHYR6PIOBXW3cTqDZBcCFAtfvk4L_t-9x210cdkHqmJb_Owci0e1HX5wqcicg8OlKOHE4O2QOyhFaAz7HXqe-QtEecAcnxboQFmkqctCWHwjxBtv2eoV1y_16fu4RjTLBeISjD5qW8KtZAYKTGjkGkAu-SHnfA6R_KRsB0YaOVGmAjOmaDApBz7hr8hwPQ6YqMOOncY-c749XP3RNBsAO1LugwuqHiTEpw-aL35pP9dxDzHvYQ0Qho7LKX1aEkbxsNwK8tFP205CibUGdmDGOtmbEIQEvBBNULT0HdlBZ7Nx9IpDELxg=w573-h1019-no" width="100">
## Installation
1. Run `npm install git+http://192.168.0.200/xc/react-native-comic-book.git --save`
2. react-native-comic-book use some native library so that you have to link **those library below** before you use react-native-comic-book

`react-native link react-native-vector-icons`

`react-native link react-native-screen-brightness`

`react-native link react-native-gesture-handler`

**IMPORTANT：**

Only for Android, react-native-gesture-handler have to do some addition manually installation below, you could reference this [link](https://github.com/kmagiera/react-native-gesture-handler) to get more detail.

Update your main activity (or wherever you create an instance of `ReactActivityDelegate`), so that it overrides the method responsible for creating `ReactRootView` instance. Then use a root view wrapper provided by this library:
```java
// Don't forget imports
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
## API

 Props | Description | Type 
------ | ------ | ------
onClickBackArrow | fired after you click back-arrow icon | function
onEndComicBook | fired after end of your comic-book | function
startPageNumber| initial page-number of your comic-book | Integer
chapter | chapter structure of your comic-book | Array[object]
data | content of your comic-book | Array[object]
renderItem | how to render your comic-book | function
getItemLayout | your comic-book itemLayout | function

- chapter : `[{ chapter: (String)(Reuired), pageNumber: (String)(Reuired), title: (String)(Reuired) }]`
  - chapter : number of this chapter
  - pageNumber : pageNumber of this chapter
  - title : title of this chapter

- data : `[{ key: (String)(Reuired), uri: (String)(Reuired),imageHeight: (Int)(Option),(Int)(Option) }]`
	- key : unique key
	- uri : uri of your image
	- imageHeight : height of your image
	- imageWidth : width of your image

	 
## Usage example

1. Novel Example

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
    borderBottomWidth: 1, 
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

2. ComicBook Example

```JSX

```

## Remember custom your renderContent and getContentLayout at same time

- The props as same as `renderItem` `getItemLayout` of FlatList

```JSX
  renderContent = ({ item, index }) => {
    // return your content render
  }

  getContentLayout = (data, index) => { 
    // return your content layout
  }
```