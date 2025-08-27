import axios from 'axios'

export async function searchProduct(product) {
  try {
    const response = await axios.post('http://localhost:3000/tavily/search', {
      query: product
    })
    const data = response.data
    let cleanedLinks = []
    if (Array.isArray(data.results)) {
      cleanedLinks = data.results.map(item => item.cleaned_link).filter(Boolean)
    }
    return { ...data, cleaned_links: cleanedLinks }
  } catch (error) {
    console.error('Error in searchProduct:', error.response ? error.response.data : error.message)
    throw error
  }
}

export async function analyzeProduct(product) {
  try {
    const response = await axios.post('http://localhost:3000/tavily/crawl', {
      url: 'https://www.greenchoicenow.com',
      productName: product
    })
    return response.data
  } catch (error) {
    console.error('Error in analyzeProduct:', error.response ? error.response.data : error.message)
    throw error
  }
}

export async function extractLinks(urls) {
  try {
    const response = await axios.post('http://localhost:3000/tavily/extract', {
      urls
    })
    return response.data
  } catch (error) {
    console.error('Error in extractLinks:', error.response ? error.response.data : error.message)
    throw error
  }
}