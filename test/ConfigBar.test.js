// __tests__/ConfigBar.js
import 'react-native'
import React from 'react'
import ConfigBar from '../CoomicBookTool/ConfigBar'

import renderer from 'react-test-renderer'

jest.mock('react-native-elements', () => {
	return {
		Icon: 'Icon'
	}
})

jest.mock('../CoomicBookTool/ComicBookSlider', () => 'ComicBookSlider')

jest.mock('../CoomicBookTool/ComicBookSwitch', () => 'ComicBookSwitch')

describe('Testing ConfigBar component', () => {

	it('renders correctly with no props', () => {
		const props = {

		}
	  const tree = renderer.create(
	    <ConfigBar {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

	it('renders correctly with animatedConfigBarY value', () => {
		const props = {
			animatedConfigBarY: 100
		}
	  const tree = renderer.create(
	    <ConfigBar {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

})