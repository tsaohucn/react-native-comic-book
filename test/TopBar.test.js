// __tests__/TopBar.js
import 'react-native'
import React from 'react'
import TopBar from '../CoomicBookTool/TopBar'

import renderer from 'react-test-renderer'

jest.mock('react-native-elements', () => {
	return {
		Icon: 'Icon'
	}
})

describe('Testing TopBar component', () => {

	it('renders correctly with no props', () => {
		const props = {

		}
	  const tree = renderer.create(
	    <TopBar {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

	it('renders correctly with animatedTopBarY value', () => {
		const props = {
			animatedTopBarY: 100
		}
	  const tree = renderer.create(
	    <TopBar {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

})