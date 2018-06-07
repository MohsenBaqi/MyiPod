import React from 'react';
import ReactDOM from 'react-dom';
import MyiPod from './App/MyiPod';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyiPod />, document.getElementById('myipod-app'));
registerServiceWorker();
