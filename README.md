`react-native link react-native-vector-icons`

`react-native link react-native-screen-brightness`

III (**Android**). Follow the steps below:

**IMPORTANT:** If you use one of the *native navigation libraries* (e.g. [wix/react-native-navigation](https://github.com/wix/react-native-navigation)), you should follow [this separate guide](NATIVE_NAVIGATORS.md) to get gesture handler library set up on Android. Ignore the rest of this step – it only applies to RN apps that use standard Android project layout.

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

III (**iOS**). There is no additional config required to be done on iOS except from what follows in the next steps.


*** Example

```React
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