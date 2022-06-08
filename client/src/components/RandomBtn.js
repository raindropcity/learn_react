import React from "react"
// 引用react-router-hash-link模組，此模組支援「在路徑中加入#」，如此才能實現「同一頁面中跳轉」
import { HashLink } from "react-router-hash-link"
import restaurant from "../restaurant"

export default function RandomBtn() {
  const [result, setResult] = React.useState({ text: undefined, href: "" })
  function selectRandomBistro() {
    const ramdomNum = Math.floor(Math.random() * restaurant.length)
    setResult(() => {
      return {
        text: restaurant[ramdomNum].name,
        href: restaurant[ramdomNum].id
      }
    })
  }

  return (
    <div className="select-bistro">
      <button className="random-btn" onClick={selectRandomBistro}>Select random Bistro</button>
      <HashLink to={`/bistro/#${result.href}`} style={{ textDecoration: 'none' }}>
        <h5 title="Click to go to selected Bistro card!">{result.text ? result.text : ""}</h5>
      </HashLink>
    </div>
  )
}