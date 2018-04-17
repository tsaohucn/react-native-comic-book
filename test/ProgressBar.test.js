// __tests__/ProgressBar.js
import 'react-native'
import React from 'react'
import ProgressBar from '../CoomicBookTool/ProgressBar'

import renderer from 'react-test-renderer'

jest.mock('react-native-elements', () => {
	return {
		Icon: 'Icon',
		Slider: 'Slider'
	}
})

describe('Testing ProgressBar component', () => {

	it('renders correctly with no props', () => {
		const props = {

		}
	  const tree = renderer.create(
	    <ProgressBar {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

	it('renders correctly with animatedProgressBarY value', () => {
		const props = {
			animatedProgressBarY: 100
		}
	  const tree = renderer.create(
	    <ProgressBar {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

/*
	it('test component method', () => {

	  const wrapper = renderer.create(
	    <ProgressBar/>
	   )
		wrapper.instance().onValueChange()

	})*/

})