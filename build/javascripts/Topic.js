jQuery(document).ready(function ($) {
  const topicListTable = $('#topic-list-table')
  if (topicListTable && $('div').initDataTable) {
    $('div').initDataTable?.(topicListTable)
  }
})

const topicFields = {
  name: {
    parent: '',
    text: 'Tên topic',
  },
  image: {
    parent: '',
    text: 'Thumbnail',
  },
}

const submitTopic = async (event) => {
  event.preventDefault()
  const thumbnailElement = event.target.querySelector('#link_fake')
  const thumbnailFile = thumbnailElement.files[0]
  const thumbnailUploadRequest = await getSignedRequest(thumbnailFile)
  const thumbnailUploaded = await uploadFile(thumbnailFile, thumbnailUploadRequest.signedRequest)

  if (thumbnailUploaded.status === 200) {
    document.getElementById('image').value = thumbnailUploadRequest.url
  }

  const errors = Object.keys(topicFields).reduce((r, key) => {
    const { parent, text } = topicFields[key]
    let hasError = false
    if (!event.target[key]?.value?.trim()) {
      hasError = true
    }
    if (hasError) {
      if (!r[parent]) r[parent] = []
      r[parent].push(text)
    }
    return r
  }, {})
  if (Object.keys(errors).length) {
    displayUiError(errors)
  } else {
    event.target.submit()
  }
}
