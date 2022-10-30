jQuery(document).ready(function ($) {
  const categoryListTable = $('#category-list-table')
  if (categoryListTable && $('div').initDataTable) {
    $('div').initDataTable?.(categoryListTable)
  }
})

const categoryFields = {
  title: {
    parent: '',
    text: 'Tên thể loại',
  },
  thumbnail: {
    parent: '',
    text: 'Thumbnail',
  },
  topic_id: {
    parent: '',
    text: 'Topic',
  },
}

const submitCategory = async (event) => {
  event.preventDefault()
  const thumbnailFile = event.target.querySelector('#link_fake').files[0]
  const thumbnailUploadRequest = await getSignedRequest(thumbnailFile)
  const thumbnailUploaded = await uploadFile(thumbnailFile, thumbnailUploadRequest.signedRequest)

  if (thumbnailUploaded.status === 200) {
    document.getElementById('thumbnail').value = thumbnailUploadRequest.url
  }
  const errors = Object.keys(categoryFields).reduce((r, key) => {
    const { parent, text } = categoryFields[key]
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
