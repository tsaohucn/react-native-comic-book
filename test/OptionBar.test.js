// __tests__/OptionBar.js
import 'react-native'
import React from 'react'
import OptionBar from '../CoomicBookTool/OptionBar'

import renderer from 'react-test-renderer'

jest.mock('react-native-elements', () => {
	return {
		Icon: 'Icon'
	}
})

describe('Testing OptionBar component', () => {

	it('renders correctly with no props', () => {
		const props = {

		}
	  const tree = renderer.create(
	    <OptionBar {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

	it('renders correctly with animatedOptionBarY value', () => {
		const props = {
			animatedOptionBarY: 100
		}
	  const tree = renderer.create(
	    <OptionBar {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

})