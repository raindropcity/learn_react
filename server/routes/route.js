const express = require('express')
const Routes = express.Router()
const { check, validationResult } = require('express-validator')
// const multer = require('multer')
// const upload = multer()
const sharp = require('sharp')
const Recommend = require('../models/recommend')

const expressValidatorStrategy = [
  check('bistroName').trim().notEmpty().withMessage('Bistro Name is required.'),

  check('bistroCategory').trim().notEmpty().withMessage('Bistro Category is required.'),

  check('bistroLocation').trim().notEmpty().withMessage('Bistro Location is required.'),

  check('googleMapURL').trim().isURL().withMessage('please text the url of Google map.'),

  check('bistroRating').trim().notEmpty().withMessage('Bistro Rating is required.').bail().isNumeric().withMessage('please show the rating within number 1 ~ 5.').bail().isFloat({ min: 1.0, max: 5.0 }).withMessage('the number of rating must within 1 ~ 5.'),

  check('description').trim().notEmpty().withMessage('Description is required.').bail().isLength({ min: 1, max: 175 }).withMessage('number of words must within 1 ~ 175.'),

  check('bistroPicture').trim().notEmpty().withMessage('Bistro Picture is required.').bail().isURL().withMessage('please text the url of Bistro Picture.').bail()
    .custom((value) => {
      const picOrNot = value.toLowerCase().includes('jpg') || value.toLowerCase().includes('jpeg') || value.toLowerCase().includes('png')
      if (!picOrNot) throw new Error('please provide jpg, jpeg or png URL.')
    })
]

// The middleware express.json() is going to parse the request coming from the frontend.
Routes.post('/bistro/recommend', express.json(), expressValidatorStrategy, (req, res) => {
  const { bistroName, bistroCategory, bistroLocation, bistroPhone, googleMapURL, bistroRating, description, bistroPicture
  } = req.body

  // 控制使用者傳入的圖片尺寸
  if (bistroPicture) {
    sharp(bistroPicture)
      .resize({ width: 600, height: 400 })
      .toBuffer()
  }

  // 建立一個後續要存入mongodb的instance，若通過express-validator驗證，後面會用save()來將這些資料存進資料庫
  const inputedBistroInfo = new Recommend({
    bistroName,
    bistroCategory,
    bistroLocation,
    bistroPhone,
    googleMapURL,
    bistroRating,
    description,
    bistroPicture
  })

  // express-validator驗證
  const errorOfValidation = validationResult(req)
  if (!errorOfValidation.isEmpty()) {
    const errorArr = errorOfValidation.array()
    const errorMsgObj = {}
    errorArr.forEach((element) => {
      errorMsgObj[`${element.param}`] = element.msg
      //使用Object的括弧記法將errorOfValidation.array()中的param與msg提取出來，裝進新的物件中
    })
    // res.json()能傳遞物件型別的資料到前端
    return res.status(422).json({
      success: false,
      errorMsgObj: errorMsgObj
    })
  }

  // 將通過express-validator驗證的資料存進資料庫
  inputedBistroInfo.save((error) => {
    if (error) {
      // res.send()傳遞字串到前端
      res.status(400).send('error')
    }
    else {
      res.status(200).send('data saved')
    }
  })
})

module.exports = Routes