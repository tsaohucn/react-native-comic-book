// __tests__/ProgressBar.js
import 'react-native'
import React from 'react'
import ProgressBar from '../CoomicBookTool/ProgressBar'
import renderer from 'react-test-renderer'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { shallow, mount, render } from 'enzyme'

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


	it('initial state', () => {
		const wrapper = shallow(<ProgressBar/>)
    expect(wrapper.state('value')).toBe(0)
	})

	it('onValueChange', () => {
		const wrapper = shallow(<ProgressBar/>)
    wrapper.instance().onValueChange(20)
		expect(wrapper.state('value')).toBe(20)
	})

	it('getChapterPageNumber', () => {
		const chapter = [
			{ pageNumber: 10, title: '第一章' },
			{ pageNumber: 20, title: '第二章' },
			{ pageNumber: 30, title: '第三章' }
		]

		const wrapper = shallow(<ProgressBar chapter={chapter}/>)
		const instance = wrapper.instance()
    instance.getChapterPageNumber(20)
		expect(instance.previousChapterPageNumber).toBe(10)
		expect(instance.nextChapterPageNumber).toBe(30)
	})

})