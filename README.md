`react-native link react-native-vector-icons`

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