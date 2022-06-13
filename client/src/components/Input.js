import React from "react"
import axios from "axios"

export default function Input() {
  const [inputData, setInputData] = React.useState({
    bistroName: "",
    bistroCategory: "",
    bistroLocation: "",
    bistroPhone: "",
    googleMapURL: "",
    bistroRating: "",
    description: "",
    bistroPicture: ""
  })

  const [warningOrNot, setWarningOrNot] = React.useState({
    bistroName: false,
    bistroCategory: false,
    bistroLocation: false,
    bistroPhone: false,
    googleMapURL: false,
    bistroRating: false,
    description: false,
    bistroPicture: false
  })

  function handleChangeData(event) {
    setInputData((prevObj) => {
      //使用解構賦值將event.target中的屬性各自宣告為變數
      const { name, type, value, checked } = event.target
      return {
        ...prevObj,
        [name]: type === "checkbox" ? checked : value
        // 這邊的[]叫做computed property 允許用變數當作物件的key
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    // 宣告newInputData，內容是inputData透過onChange事件蒐集而來的使用者輸入內容，後續會做為axios.post的參數，傳遞到後端去存進資料庫
    const newInputData = {
      bistroName: inputData.bistroName,
      bistroCategory: inputData.bistroCategory,
      bistroLocation: inputData.bistroLocation,
      bistroPhone: inputData.bistroPhone,
      googleMapURL: inputData.googleMapURL,
      bistroRating: inputData.bistroRating,
      description: inputData.description,
      bistroPicture: inputData.bistroPicture
    }

    // 每當按下submit按鈕時，都將warningOrNot重新賦值為預設的樣子。後續會以warningOrNot來決定是否render出警告語
    setWarningOrNot({
      bistroName: false,
      bistroCategory: false,
      bistroLocation: false,
      bistroPhone: false,
      googleMapURL: false,
      bistroRating: false,
      description: false,
      bistroPicture: false
    })

    // 使用axios將form資料POST到後端，後端透過express與mongoose將資料存入資料庫
    axios.post('https://still-escarpment-13575.herokuapp.com/bistro/recommend', newInputData)
      .then((theResponseFromBackend) => {
        console.log(theResponseFromBackend.data)
        // POST資料去後端之後，清除form裡面的value
        setInputData({
          bistroName: "",
          bistroCategory: "",
          bistroLocation: "",
          bistroPhone: "",
          googleMapURL: "",
          bistroRating: "",
          description: "",
          bistroPicture: ""
        })

        alert('Your loved Bistro information has been submitted! Once it gets through the investigation, we will put it on the site!')
      })
      .catch((AxiosError) => {
        console.log(AxiosError)
        // 若axios有catch到錯誤，重新以errorMsgObj的內容賦值warningOrNot。
        // errorMsgObj為我自己在後端建立的物件，內容是express-validator驗證到輸入內容有誤時所輸出的message，並透過res.json()將errorMsgObj傳到前端的AxiosError物件中
        setWarningOrNot((prev) => {
          return {
            ...prev,
            ...AxiosError.response.data.errorMsgObj
          }
        })
      })
  }

  return (
    <div className="recommend-con">
      <form className="rec-form" action="/bistro/recommend" method="POST">
        <legend>Recommend your loved Bistro</legend>

        <input type="text" name="bistroName" id="bistroName" placeholder="Bistro Name" onChange={handleChangeData} value={inputData.bistroName} required />
        {warningOrNot.bistroName && <p className="warning">{warningOrNot.bistroName}</p>}

        <input type="text" name="bistroCategory" placeholder="Bistro Category (ex: 日本料理)" onChange={handleChangeData} value={inputData.bistroCategory} required />
        {warningOrNot.bistroCategory && <p className="warning">{warningOrNot.bistroCategory}</p>}

        <input type="text" name="bistroLocation" placeholder="Bistro Location (Address)" onChange={handleChangeData} value={inputData.bistroLocation} required />
        {warningOrNot.bistroLocation && <p className="warning">{warningOrNot.bistroLocation}</p>}

        <input type="text" name="bistroPhone" placeholder="Bistro Phone (Optional)" onChange={handleChangeData} value={inputData.bistroPhone} />

        <input type="text" name="googleMapURL" placeholder="GoogleMap URL" onChange={handleChangeData} value={inputData.googleMapURL} />
        {warningOrNot.googleMapURL && <p className="warning">{warningOrNot.googleMapURL}</p>}

        <input type="number" name="bistroRating" placeholder="Bistro Rating (1.0 ~ 5.0)" onChange={handleChangeData} value={inputData.bistroRating} required />
        {warningOrNot.bistroRating && <p className="warning">{warningOrNot.bistroRating}</p>}

        <input type="text" name="bistroPicture" placeholder="Bistro Picture URL" onChange={handleChangeData} value={inputData.bistroPicture} required />
        {warningOrNot.bistroPicture && <p className="warning">{warningOrNot.bistroPicture}</p>}

        <textarea name="description" placeholder="Description for this Bistro(max words: 175)..." onChange={handleChangeData} value={inputData.description} required />
        {warningOrNot.description && <p className="warning">{warningOrNot.description}</p>}

        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}


// 以下為各種input type在React中建構的練習

/* <label htmlFor="isFriendly">
          <input type="checkbox" id="isFriendly" name="isFriendly" onChange={handleChangeData} checked={inputData.isFriendly} />
          Are you friendly?
        </label>

        <fieldset>
          <legend>How old are you?</legend>
          <label htmlFor="teenager">
            <input type="radio" id="teenager" name="age" value="teenager" onChange={handleChangeData} checked={inputData.age === "teenager"} />
            lower than 18
          </label>
          <label htmlFor="adult">
            <input type="radio" id="adult" name="age" value="adult" onChange={handleChangeData} checked={inputData.age === "adult"} />
            higher or equal 18
          </label>
        </fieldset>

        <label htmlFor="selectColor">
          Select your favorite color
          <br />
          <select id="selectColor" name="selectColor" value={inputData.selectColor} onChange={handleChangeData}>
            <option value="">-- choose --</option>
            <option value="red" >red</option>
            <option value="blue">blue</option>
            <option valeu="balck">black</option>
          </select>
        </label>
        <br /> */