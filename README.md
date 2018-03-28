### react-native-comic-book
![Demo](https://photos.google.com/share/AF1QipOoiSlqVNNzjTSTLKQ-Za2kVLGapkA9LACcmqmLzAgN7_JREJzlr8vztQfOq37RMQ/photo/AF1QipNYfTMeiW1EAK6gZXqD1XC3fv909CgB05HfIp-q?key=ZVRzRFVBSHpEYzFkZUw0N0R6RWlXQnpxMEFDUTRn)

## Installation
1. Run `npm install react-native-comic-book --save`
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
## Example

```Javascript
import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import ComicBook from 'react-native-comic-book'

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  onClickBackArrow = () => {
    console.warn('返回')
  }

  render() {
    return (
      <ComicBook
        data={data}
        chapter={chapter}
        onClickBackArrow={this.onClickBackArrow}
      />
    )
  }
}

const { width, height } = Dimensions.get('window')

const newWidth = width.toFixed(0)

const data = Array(100).fill().map((e,index) => ({ key: index.toString() ,uri: 'https://picsum.photos/'+ newWidth + '/' + newWidth + '?image=' + index}))

const chapter = [
  {key: '1', title: '1-1.精氣', startPage: 1, endPage: 10},
  {key: '2', title: '2-2.鎮寢之寶', startPage: 11, endPage: 15},
  {key: '3', title: '3-4.夢中人', startPage: 16, endPage: 25},
  {key: '4', title: '4-4.馬克思主義哲學', startPage: 26, endPage: 38},
  {key: '5', title: '5-5.飛來豔福', startPage: 39, endPage: 47},
  {key: '6', title: '6-6.天降之物', startPage: 48, endPage: 59},
  {key: '7', title: '7-7.演員的自我修飾', startPage: 69, endPage: 88},
  {key: '8', title: '8-8.相遇', startPage: 89, endPage: 94},
  {key: '9', title: '9-9.亞拉那一卡？', startPage: 95, endPage: 100}
]
```