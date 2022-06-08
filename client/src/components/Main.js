import React from "react"

const listArr = [
  "Was first released in 2013",
  "Was originally created by Jordan Walke",
  "Has well over 100K stars on GitHub",
  "Is maintained by Facebook",
  "Powers thousands of enterprise apps, including mobile apps"
]

export default function Main() {
  return (
    <main>
      <h1 className="main-title">Fun facts about React</h1>
      <ul className="main-facts">
        {listArr.map((list) => { return <li>{list}</li> })}
      </ul>
    </main>
  )
}