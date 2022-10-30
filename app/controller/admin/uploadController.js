const S3 = require('aws-sdk/clients/s3')
const express = require('express')
const router = express.Router()
const ULID = require('ulid')

const genUniqueKey = () => ULID.ulid()

const { BUCKET, AWS_ACCESS_KEY, AWS_SECRET_KEY, REGION } = process.env

const s3 = new S3({
  region: REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
})

router.get('/', async (req, res) => {
  const fileExtension = req.query['file-extension']
  const fileType = req.query['file-type']
  const fileName = `${genUniqueKey()}${fileExtension}`
  const s3Params = {
    Bucket: BUCKET,
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
      url: `https://${BUCKET}.s3.amazonaws.com/${fileName}`,
    }
    res.write(JSON.stringify(returnData))
    res.end()
  })
})

module.exports = router
