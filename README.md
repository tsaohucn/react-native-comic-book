### react-native-comic-book
![Demo](https://lh3.googleusercontent.com/QUbhogCPxIDorIxm4RIm4qc9YOz9IP8uOWac0o28iv9g8Wz8GIrSpNW6QSATLPlYNDhqPWt2BY3kJ0PerSX8e7psTpb4XyG9LrJCztTwL2bAP-iTBc6OPJNioh34vfnzU83JoeR7pCXAVWkP532_0Dwr5BcvoUPmpMuPtGGS1A1jmjQ5SuzkTSqR6MXnmAsUGlLtsYCSds1LON049D7sRUKKl2ejabnyt8GYsguedkIxDc1m-fR3lx08muusoVDGxytvHut0NOHQPt0rt1FtD3KPI-Rj9xr-H5x5fQyyV2rwrX0f-2bBKz3lG19hZl_6ZxJfVVt1QoyxwSzq1-O4oPdUOSeHV9ieA-TE24eCmHbD0MGHgvkofNJeRu6PDn2ikQhFzd_PmGarWhdgG8QYrWzsMlQE_hJa18Mt4IghR6ArZQI7Y9v4IMnufb-da1WCPDegY131j5LYtugcevJtFR2Ya-eGIk1685NwVioiIY5g-c6Otp0WR1eS7W0KctznugFal-xHV7mw3w3yDCrb377CWqgepHc2kCr2FeFfnUZZ_dlYO99uGdudwWbRp_HyxmMdhG_ci08hJGjd1PhzwpYx_1gEdh-TsZmE1MdylIesILnwRoVREzez-v23SPWZVBLvMcfYYPC46Rd52OAYd_0KW15BJBY=w573-h1019-no)

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

```Javascript
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

```javascript

```

## Custom Your renderContent and getContentLayout at same time

- The props as same as `renderItem` `getItemLayout` of FlatList

```javascript
  renderContent = ({ item, index }) => {
    // return your content render
  }

  getContentLayout = (data, index) => { 
    // return your content layout
  }
```