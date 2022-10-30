jQuery(document).ready(function ($) {
  const playlistTable = $('#playlist-list-table')
  if (playlistTable && $('div').initDataTable) {
    $('div').initDataTable?.(playlistTable)
  }
})

const albumFields = {
  name: {
    parent: '',
    text: 'Tên album',
  },
  thumbnail: {
    parent: '',
    text: 'Thumbnail',
  },
  artists_name: {
    parent: '',
    text: 'Tên nghệ sĩ',
  },
}

const playlistFields = {
  name: {
    parent: '',
    text: 'Tên album',
  },
  thumbnail: {
    parent: '',
    text: 'Thumbnail',
  },
}

const submitPlaylist = async (event) => {
  event.preventDefault()
  const thumbnailFile = event.target.querySelector('#link_fake').files[0]
  const thumbnailUploadRequest = await getSignedRequest(thumbnailFile)
  const thumbnailUploaded = await uploadFile(thumbnailFile, thumbnailUploadRequest.signedRequest)

  if (thumbnailUploaded.status === 200) {
    document.getElementById('thumbnail').value = thumbnailUploadRequest.url
  }

  const errors = Object.keys(playlistFields).reduce((r, key) => {
    const { parent, text } = playlistFields[key]
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

const submitAlbum = (event) => {
  event.preventDefault()
  const errors = Object.keys(albumFields).reduce((r, key) => {
    const { parent, text } = albumFields[key]
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
