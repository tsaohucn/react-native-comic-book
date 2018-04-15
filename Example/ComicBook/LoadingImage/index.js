import React , { Component } from 'react'
import { 
  View, 
  Image, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native'

const styles = StyleSheet.create({
  sourceImage: {
    position: 'relative',
    resizeMode: 'contain'
  },
  activityIndicator: {
    //flex: 1
  },
  errorImage: {
    resizeMode: 'contain',
  },
  viewImage: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  }
})

export default class LoadingImage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoadStart: false,
      isLoadEnd: false,
      isError: false
    }
  }

  onLoadStart= () => {
    this.setState({
      isLoadStart: true
    })  
  }

  onLoadEnd = () => {
    this.setState({
      isLoadEnd: true
    })  
  }

  onError = () => {
    this.setState({
      isError: true
    })
  }
  
  render() {

    const width = this.props.width
    const height = this.props.height

    return(
      <View style={{width: width,height: height}}>
        <Image
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          onError={this.onError}
          style={[styles.sourceImage,{
            width: width,
            height: height
          }]}
          source={this.props.source}
        />
        { !this.state.isLoadEnd &&
          <View 
            style={styles.viewImage}
          >
            <ActivityIndicator
              style={[styles.activityIndicator,{
                width: width,
                height: height  
              }]}
              size={'large'}
              color={'white'}
            />
          </View>
        }
        {
          this.state.isLoadEnd && this.state.isError &&
          <View 
            style={styles.viewImage}
          >
            <Image
              style={[styles.errorImage,{
                width: width,
                height: height  
              }]}
              source={require('./error.png')}
            />
          </View>
        }
      </View>
    )
  }
}