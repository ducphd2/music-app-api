jQuery(document).ready(function ($) {
  const songListTable = $('#song-list-table')
  if (songListTable && $('div').initDataTable) {
    $('div').initDataTable?.(songListTable)
  }
})

const songFields = {
  title: {
    parent: '',
    text: 'Tên bài hát',
  },
  artists: {
    parent: '',
    text: 'Nghệ sĩ',
  },
  thumbnail: {
    parent: '',
    text: 'Ảnh đại diện',
  },
  link: {
    parent: '',
    text: 'Link bài hát',
  },
  album_id: {
    parent: '',
    text: 'Album',
  },
  category_id: {
    parent: '',
    text: 'Category',
  },
  playlist_id: {
    parent: '',
    text: 'Playlist',
  },
}

const handleDelete = () => {
  const confirmDelete = confirm('Bạn có chắc muốn xóa bài hát này?')
  if (confirmDelete) {
    const form = document.querySelector('#deleteForm')
    form.submit()
  }
}

const submitSong = async (event) => {
  event.preventDefault()
  const thumbnailElement = event.target.querySelector('#thumbnail_fake')
  const songElement = event.target.querySelector('#link_fake')
  const thumbnailFile = thumbnailElement.files[0]
  const songFile = songElement.files[0]
  const thumbnailUploadRequest = await getSignedRequest(thumbnailFile)
  console.log('thumbnailUploadRequest', thumbnailUploadRequest)
  const songUploadRequest = await getSignedRequest(songFile)
  const thumbnailUploaded = await uploadFile(
    thumbnailFile,
    thumbnailUploadRequest.signedRequest
  )
  const songUploaded = await uploadFile(
    songFile,
    songUploadRequest.signedRequest
  )

  if (songUploaded.status === 200 && thumbnailUploaded.status === 200) {
    document.getElementById('thumbnail').value = thumbnailUploadRequest.url
    document.getElementById('link').value = songUploadRequest.url
  }

  const errors = Object.keys(songFields).reduce((r, key) => {
    const { parent, text } = songFields[key]
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
