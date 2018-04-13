// __tests__/ChapterBar.js
import 'react-native'
import React from 'react'
import ChapterBar from '../CoomicBookTool/ChapterBar'

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ChapterBar />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});