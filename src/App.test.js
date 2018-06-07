import React from 'react';
import ReactDOM from 'react-dom';
import MyiPod from './App/MyiPod';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyiPod />, div);
  ReactDOM.unmountComponentAtNode(div);
});
