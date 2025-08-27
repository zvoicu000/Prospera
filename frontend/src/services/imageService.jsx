import axios from 'axios'

export async function sendImageToBackend(imageData) {
  try {
    function dataURLtoBlob(dataurl) {
      const arr = dataurl.split(','), mime = arr[0].match(/:(.*?)/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
      for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i)
      return new Blob([u8arr], { type: mime })
    }
    const blob = dataURLtoBlob(imageData)
    const formData = new FormData()
    formData.append('image', blob, 'upload.jpg')

    const response = await axios.post('http://localhost:3000/api/test-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error sending image to backend:', error)
    throw error
  }
}

export async function identifyBrandWithImage(imageData) {
  try {
    function dataURLtoBlob(dataurl) {
      const arr = dataurl.split(','), mime = arr[0].match(/:(.*?)/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
      for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i)
      return new Blob([u8arr], { type: mime })
    }
    const blob = dataURLtoBlob(imageData)
    const formData = new FormData()
    formData.append('image', blob, 'upload.jpg')

    const response = await axios.post('http://localhost:3000/api/identify-brand', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    const { result, allLabels } = response.data || {}
    let filteredLabels = []
    if (Array.isArray(allLabels)) {
      filteredLabels = allLabels.filter(label => label.toLowerCase().includes('aluminum'))
      if (filteredLabels.length === 0) {
        filteredLabels = allLabels.slice(0, 3)
      }
    }
    const formatted = [result?.name || '', ...filteredLabels].join(' ').trim()
    return formatted
  } catch (error) {
    console.error('Error sending image to Google Vision identify-brand:', error)
    throw error
  }
}