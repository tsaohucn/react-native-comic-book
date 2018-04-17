// __tests__/BottomBar.js
import 'react-native'
import React from 'react'
import BottomBar from '../CoomicBookTool/BottomBar'

import renderer from 'react-test-renderer'

jest.mock('react-native-elements', () => ({
	Icon: 'Icon'
}))

describe('Testing BottomBar component', () => {

	it('renders correctly with no props', () => {
		jest.resetModules()
	  jest.doMock('Platform', () => ({
	    OS: 'android',
	  }))

	  const a = require('Platform').default
		const props = {

		}
	  const tree = renderer.create(
	    <BottomBar {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

	it('renders correctly with animatedBottomBarY value', () => {
		const props = {
			animatedBottomBarY: 100
		}
	  const tree = renderer.create(
	    <BottomBar {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

})