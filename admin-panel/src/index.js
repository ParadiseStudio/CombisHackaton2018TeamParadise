import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import preset from 'jss-preset-default'
import jss from 'jss'
jss.setup(preset())

ReactDOM.render(<App />, document.getElementById('root'))
