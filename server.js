const express = require('express')
const app = express()
const cors = require('cors')
const Router = require('./server/routes/route')
const PORT = process.env.PORT || 3002
// 引用npm提供的「跨網域存取」middleware。cors (Cross-Origin Resource Sharing)。
// 因前端(React)與後端(自訂API)分屬不同網域，前端需透過cors才可順利呼叫後端API。
app.use(cors())
// express.json()可以在global的地方用app.use()來引用，也可以在路由中個別去引用，在此我選擇在路由中引用
// app.use(express.json())
// 引用 MongoDB 連線設定
require('./server/config/mongoose')
// body-parser.urlencoded()
app.use(express.urlencoded({ extended: true }))

app.use(Router)

// 當環境變數(NODE_ENV)在某個非localhost的主機上時，會被定義。而在雲端主機如heroku上時，會被定義為「production」
// 以下code的意思是，當app運行在heroku上時，去存放在client資料夾中找到build資料夾，提供裡面的靜態檔案 → express.static('client/build') ； res.sendFile()則是代表傳遞/client/build/index.html這個檔案並render出來
// 「if (process.env.NODE_ENV === 'production')」 is a way that we know the app is running on heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`App is now running on http://localhost:${PORT}!`)
})