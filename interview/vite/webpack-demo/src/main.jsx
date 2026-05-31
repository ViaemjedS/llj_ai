// import { aMessage } from './a.js';
// import Hello from './Hello.jsx';
// // 引入css 文件
// import './main.css';


// document.getElementById('app').innerHTML = `
//     <h1>Webpack</h1>
//     <p>${aMessage()}</p>
// `

import React from 'react'
import { createRoot } from 'react-dom/client'
import Hello from './Hello.jsx'
import './main.css'

createRoot(document.getElementById('app')).render(
    <Hello />
)
