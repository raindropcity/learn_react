import React from "react";

export default function Search(props) {
  

  return (
    <form className="search-input" onSubmit={props.handleSubmitSearch}>
      <label htmlFor="search">
        <input type="text" placeholder="Search Bistro here" id="search" name="search" value={props.inputData.search} onChange={props.handleOnChange} />
      </label>
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  )
}