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

```Javascript
import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import ComicBook from 'react-native-comic-book'

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  onClickBackArrow = () => {
    console.log('返回')
  }

  onEndComicBook = (pageNumber) => {
    console.log(pageNumber)
  }

  render() {
    return (
      <ComicBook
        onClickBackArrow={this.onClickBackArrow}
        onEndComicBook={this.onEndComicBook}
        startPageNumber={30}
        chapter={chapter}
        data={data}
      />
    )
  }
}

const { width, height } = Dimensions.get('window')

const newWidth = width.toFixed(0)

const data = Array(100).fill().map((e,index) => ({ 
	key: index.toString(),
	uri: 'https://picsum.photos/'+ newWidth + '/' + newWidth + '?image=' + index,
	imageHeight: newWidth,
	imageWidth: newWidth
}))

const chapter = [
  { chapter: '1', pageNumber: 1, title: '1-1.精氣' },
  { chapter: '2', pageNumber: 11, title: '2-2.鎮寢之寶' },
  { chapter: '3', pageNumber: 16, title: '3-4.夢中人' },
  { chapter: '4', pageNumber: 26, title: '4-4.馬克思主義哲學' },
  { chapter: '5', pageNumber: 39, title: '5-5.飛來豔福' },
  { chapter: '6', pageNumber: 48, title: '6-6.天降之物' },
  { chapter: '7', pageNumber: 69, title: '7-7.演員的自我修飾' },
  { chapter: '8', pageNumber: 89, title: '8-8.相遇' },
  { chapter: '9', pageNumber: 95, title: '9-9.亞拉那一卡？' }
]
```

```javascript
import React, { Component } from 'react'
import ComicBook from 'react-native-comic-book'

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  onClickBackArrow = () => {
    console.log('返回')
  }

  onEndComicBook = (pageNumber) => {
    console.log(pageNumber)
  }

  render() {
    return (
      <ComicBook
        onClickBackArrow={this.onClickBackArrow}
        onClickBackArrow={this.onClickBackArrow}
        onEndComicBook={this.onEndComicBook}
        startPageNumber={3}
        chapter={chapter}
        data={data}
      />
    )
  }
}

const data = [
  { key: '1', uri: 'https://attach.setn.com/newsimages/2017/08/12/1007275-XXL.jpg' },
  { key: '2', uri: 'https://images.900.tw/upload_file/41/content/d3c75448-590a-564b-7a69-48efdd127efc.png' },
  { key: '3', uri: 'https://pic.pimg.tw/leo96628/1453875282-2133772788_n.jpg?v=1453875697' },
  { key: '4', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCuHPWyQMdppcxHtB4t-1sfjjcaxsFZ83jrgrHeCieuAy16PFDjA' },
  { key: '5', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFOCawkKUoECSPBmrdaUQkSzcAyzAtTtqrip5OPO6xfNGYYBEb' },
  { key: '6', uri: 'https://img.chinatimes.com/newsphoto/2017-05-25/656/a19a00_p_02_02.jpg' },
  { key: '7', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0mIVh-vZL8YX7XK9OBGSfxQS5_-6aI0kksUDIRkfD4_56QQOKSw' },
  { key: '8', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRXjGshChW7BLaqJ0QYVMHkUufM5udR1w8uD-yEjiGhpJK5-Rs' },
  { key: '9', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8eo8HBDp121_uEyFArtVhuUbgc3lHg1aeYUUGAbFIZsn9inWO' }
]

const chapter = [
  { chapter: '1', pageNumber: 1, title: '1-1.精氣' },
  { chapter: '2', pageNumber: 6, title: '2-2.鎮寢之寶' }
]
```