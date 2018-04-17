// __tests__/ComicBookSwitch.js
import 'react-native'
import React from 'react'
import ComicBookSwitch from '../CoomicBookTool/ComicBookSwitch'

import renderer from 'react-test-renderer'

describe('Testing ComicBookSwitch component', () => {

	it('renders correctly with no props', () => {
		const props = {

		}
	  const tree = renderer.create(
	    <ComicBookSwitch {...props}/>
	    ).toJSON();
	  expect(tree).toMatchSnapshot();
	})

})