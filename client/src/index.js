// 引用App.js所匯整完成的parent component。之後index.html會去引用index.js，即可於瀏覽器render前端畫面
import React from 'react'
import ReactDOM from "react-dom"
import App from './App'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
