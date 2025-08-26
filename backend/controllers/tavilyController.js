const { tavily } = require("@tavily/core")
require('dotenv').config()

const apiKey = process.env.TAVILY_API_KEY
const tvly = tavily({ apiKey })

exports.tavilySearch = async (req, res) => {
  try {
    const { query } = req.body
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query is required' })
    }
    
    
    const envQuery = `search for websites or blogs that mention ${query} and their environmental impact, carbon footprint (look for metrics such as CO2/kg), sustainability of using that product. Specifically target short blogs. Do not include news articles, journals or .edu pages, or long articles, or reddit.`
    
    console.log('Tavily search query:', envQuery)

    if (!apiKey) {
      return res.status(500).json({ success: false, message: 'Tavily API key not set in .env' })
    }
    
    const response = await tvly.search(envQuery)         
    let filtered = Array.isArray(response.results)
      ? response.results.map(({ url, score }) => ({ url, score }))
      : []
    const topResults = filtered.sort((a, b) => b.score - a.score).slice(0, 2)
    const processedResults = topResults.map(({ url, score }) => {
      let cleaned_link
      try {
        const u = new URL(url)
        cleaned_link = u.origin + u.pathname
      } catch (e) {
        cleaned_link = url
      }
      return { url, score, cleaned_link }
    })
    console.log('Tavily search results:', processedResults)
    
    res.json({ success: true, results: processedResults })
  } catch (error) {
    console.error('Error in Tavily search:', error)
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message })
  }
}

exports.extractTavilyData = async (req, res) => {
  try {
    console.log('Extracting Tavily data with body:', req.body)
    const { urls } = req.body
    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ success: false, message: 'urls must be an array' })
    }
    const response = await tvly.extract(urls, { format: 'text' })

    if (response && Array.isArray(response.results)) {
      response.results = response.results.map(r => {
        if (typeof r.rawContent === 'string' && r.rawContent.length > 10000) {
          return { ...r, rawContent: r.rawContent.slice(0, 10000) }
        }
        return r
      })
    }

    console.log('Tavily extract response:', response)
    return res.json({ success: true, data: response })
  } catch (error) {
    console.error('Error in extractTavilyData:', error)
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message })
  }
}

exports.tavilyCrawl = async (req, res) => {
  console.log('Crawling with Tavily with body:', req.body)
  let { url, productName } = req.body

  if (!url || typeof url !== "string") {
    return res.status(400).json({ success: false, message: '"url" is required and must be a string' })
  }
  if (!productName || typeof productName !== "string") {
    return res.status(400).json({ success: false, message: '"productName" is required and must be a string' })
  }

  url = url.trim()
  productName = productName.trim().replace(/`/g, "") 

  if (!tvly) {
    return res.status(500).json({ success: false, message: "Tavily client not initialised – check API key" })
  }

  try {
    const response = await tvly.crawl(url, {
      instructions: `Find all product pages that are related to ${productName}`,
      max_depth: 5,        
      limit: 15,
      include_images: false,
    })

    console.log("\nTavily crawl response:", response)

    return res.json({ success: true, ...response })

  } catch (error) {
    const status = error?.response?.status || 500
    console.error("Error in tavilyCrawl:", error)
    return res.status(status).json({
      success: false,
      message: "Failed to crawl with Tavily",
      error: error.message,
    })
  }
}