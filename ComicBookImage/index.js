import React , { Component } from 'react'
import { View, Image, ActivityIndicator, Dimensions, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  view: {
    alignItems: 'center'
  },
  image: {
    position: 'relative',
    resizeMode: 'contain',
    backgroundColor: '#000000'
  },
  stack: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  activityIndicator: {
    position: 'absolute',
    margin: 'auto',
    zIndex: 9,
  },
  errorImage: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 7,
  },
  placeholderImage: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const { width } = Dimensions.get('window')

export default class ComicBookImage extends Component {

  static propTypes = {
    isShowActivity: PropTypes.bool,
  }

  static defaultProps = {
    isShowActivity: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      isError: false
    }
  }

  onError = () => {
    this.setState({
      isError: true
    })
  }

  onLoad = () => {
    this.setState({
      isLoaded: true
    })  
  }

  render() {
    return(
      <View>
        <View style={styles.view}>
          <Image
            onError={this.onError}
            onLoad={this.onLoad}
            style={[styles.image,{
              width,
              height: this.props.scaleImageHeight
            }]}
            source={this.props.source}
          />
          { !this.state.isLoaded &&
          <View 
            style={styles.stack}
          >
            {
              (this.props.isShowActivity && !this.state.isError) &&
              <ActivityIndicator
                style={styles.activityIndicator}
                size={'large'}
                color={'white'}
              />
            }
            {
              this.state.isError && 
              <Image
                style={[styles.errorImage,{
                  width,
                  height: this.props.scaleImageHeight  
                }]}
                source={this.props.errorSource || require('./error.png')}
              />
            }
            <Image
              style={[styles.placeholderImage,{
                width,
                height: this.props.scaleImageHeight  
              }]}
              source={this.props.placeholderSource || require('./placeholder.png')}
            />
          </View>
          }
        </View>
      </View>
    )
  }
}