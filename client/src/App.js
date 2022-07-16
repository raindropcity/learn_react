// App.js用來匯整所有的component，export給index.js引用
import React from "react"
import Navbar from "./components/Navbar"
import RandomBtn from "./components/RandomBtn"
import Search from "./components/Search"
import Cards from "./components/Cards"
import Favorite from "./components/Favorite"
import Input from "./components/Input"
import restaurant from "./restaurant"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css' // 背後有webpack，它會把靜態檔案bundle成一個JS檔，所以可以用import的方式引入css檔案

function App() {
  // for favorite list
  const [fav, setFav] = React.useState([])
  // for search input
  const [inputData, setInputData] = React.useState({
    search: ""
  })

  const [searchArr, setSearchArr] = React.useState([])

  function handleOnChange(event) {
    const { name, value } = event.target
    setInputData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
    // setSearchArr([])
  }

  function handleSubmitSearch(event) {
    event.preventDefault()
    setSearchArr(restaurant.filter((element) => element.name.toLowerCase().split(" ").join("").includes(inputData.search.toLowerCase().split(" ").join(""))))
  }

  // 如果searchArr裡面有東西，代表使用者輸入的內容有match到某餐廳，應以searchArr來做map()，render卡片出來
  const renderCards = searchArr.length ? searchArr : restaurant

  // for mainPage render each bistro card
  const card = renderCards.map((bistro) => {
    function handleClickFav() {
      const existOrNot = fav.some((element) => element === bistro.id)
      if (!existOrNot) {
        setFav([...fav, bistro.id])
      }
    }
    return (
      <Cards
        key={bistro.id}
        // name={bistro.name}
        // image={bistro.image}
        // category={bistro.category}
        // rating={bistro.rating}
        // googleMap={bistro.google_map}
        // 直觀的prop寫法是如上的寫法，每一個值都列出來，好處是容易理解，壞處是很冗長。而在Cards.js中引用時，會寫：props.name、props.image...
        // 更簡潔的寫法是直接定一個prop叫做bistro，它的值是map迭代出來的整包「物件」
        // 在Cards.js中引用時，會寫：props.bistro.name、props.bistro.image...
        bistro={bistro}
        fav={fav}
        handleClickFav={handleClickFav}
      />
    )
  })

  const favoriteList = restaurant.filter((filterElement) => {
    return fav.some((someElement) => filterElement.id === someElement)
  })

  const favorite = favoriteList.map((bistro) => {
    function removeBistro() {
      const existOrNot = fav.some((element) => element === bistro.id)
      if (existOrNot) {
        fav.splice(fav.indexOf(bistro.id), 1)
        setFav([...fav])
      }
    }
    return (
      <Favorite
        key={bistro.id}
        bistro={bistro}
        removeBistro={removeBistro}
      />
    )
  })

  return (
    <Router>
      <Navbar setSearchArr={setSearchArr} />
      <Routes>
        <Route path="/bistro"
          element={
            <>
              <div className="top-belt">
                <RandomBtn />
                <Search inputData={inputData} handleOnChange={handleOnChange} handleSubmitSearch={handleSubmitSearch} />
              </div>
              <div className="main-section">{card}</div>
            </>}
        />
        <Route path="/bistro/favorite"
          element={favoriteList.length ? <div className="main-section">{favorite}</div> :
            <h3 className="empty-fav">Waiting for addition . . .</h3>} />
        <Route path="/bistro/recommend" element={<Input />} />
      </Routes>
    </Router>
  )
}

export default App;
