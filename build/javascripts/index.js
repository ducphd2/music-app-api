const DEFAULT_DATE_FORMAT = 'DD-MM-YYYY'
const ORDER_DATE_FORMAT = 'dd, DD MMMM YYYY'
const FULL_DATE_FORMAT = 'llll'
const EXCEL_DATE_FORMAT = 'DD/MM/YYYY'
const DB_DATE_FORMAT = 'YYYY-MM-DD'

document.querySelector('.loader').style.display = 'none'

const logout = (event) => {
  event.preventDefault()
  document.cookie =
    'Authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  window.location.href = '/dang-nhap'
}

const displayUiError = (errors) => {
  const keys = Object.keys(errors)
  if (keys.length) {
    const uiError = document.getElementById('ui-error')
    uiError.innerHTML = 'Vui lòng kiểm tra các trường thông tin sau'
    keys.forEach((e) => {
      const div = document.createElement('div')
      div.innerHTML = e
      uiError.appendChild(div)
      const ul = document.createElement('ul')
      errors[e].forEach((error) => {
        const li = document.createElement('li')
        li.innerHTML = error
        ul.appendChild(li)
      })
      uiError.appendChild(ul)
    })
    uiError.style.display = 'block'
    uiError.scrollIntoView({ behavior: 'smooth', block: 'end' })
    setTimeout(() => {
      uiError.style.display = 'none'
    }, 20000)
  }
}

const hideAlert = () => {
  const dangerAlert = document.querySelector('.alert-danger')
  const infoAlert = document.querySelector('.alert-primary')
  setTimeout(() => {
    if (dangerAlert) dangerAlert.style.display = 'none'
    if (infoAlert) infoAlert.style.display = 'none'
  }, 20000)
}

const changeThumbnail = (event) => {
  const reader = new FileReader()
  reader.onload = function (evt) {
    document.getElementById('thumbnail-img').src =
      evt.target.result || '/assets/images/avatar-1.jpg'
  }
  reader.readAsDataURL(event.target.files[0])
}

hideAlert()

const getSignedRequest = async (file) => {
  const response = await fetch(
    `/upload?file-name=${file.name}&file-type=${file.type}`
  )
  return response.json()
}

const uploadFile = async (file, signedRequest) => {
  const options = {
    headers: {
      'Content-Type': file.type,
    },
  }
  return axios.put(signedRequest, file, options)
}
