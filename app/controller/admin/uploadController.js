const aws = require('aws-sdk')
const express = require('express')
const router = express.Router()

const removeVietnameseFromString = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  str = str.toLowerCase()
  str = str
    .replace(/[&]/g, '-and-')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/[-]+/g, '-')
    .replace(/-$/, '')
  return str
}

router.get('/', async (req, res) => {
  const s3 = new aws.S3()
  const fileName = getFileName(req.query['file-name'])
  const fileType = req.query['file-type']
  const s3Params = {
    Bucket: process.env.BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  }

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(`getSignedUrl error: `, err)
      return res.end()
    }
    const returnData = {
      signedRequest: data,
      url: `https://${process.env.BUCKET}.s3.amazonaws.com/${fileName}`,
    }
    res.write(JSON.stringify(returnData))
    res.end()
  })
})

const getFileName = (fileName) => {
  const removedFileName = removeDiacritics(fileName)
  const fileExtension = removedFileName.split('.').pop()
  const extendFileName = removedFileName.split('.').shift() + '-' + Date.now()
  return `${extendFileName}.${fileExtension}`
}

const removeDiacritics = (string) =>
  removeVietnameseFromString(string).split(' ').join('-')

module.exports = router
