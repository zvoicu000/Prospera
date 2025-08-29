import React, { useState } from 'react'
import { analyzeProduct, searchProduct, extractLinks } from '../services/searchService'
import { analyzeGroq } from '../services/groqService'

const TestFlow = () => {
  const [product, setProduct] = useState('mountain dew baja blast')
  const [result, setResult] = useState(null)
  const [cleanedLinks, setCleanedLinks] = useState([])
  const [fullResults, setFullResults] = useState([])
  const [extractResult, setExtractResult] = useState(null)
  const [groqResult, setGroqResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCrawl = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    setCleanedLinks([])
    setFullResults([])
    setExtractResult(null)
    setGroqResult(null)
    try {
      const res = await analyzeProduct(product)
      setResult(res)
      setCleanedLinks(res.cleaned_links || [])
      setFullResults(res.results || [])
    } catch (err) {
      setError('Failed to crawl product.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    setCleanedLinks([])
    setFullResults([])
    setExtractResult(null)
    setGroqResult(null)
    try {
      const res = await searchProduct(product)
      setResult(res)
      setCleanedLinks(res.cleaned_links || [])
      setFullResults(res.results || [])
    } catch (err) {
      setError('Failed to search product.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearchExtract = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    setCleanedLinks([])
    setFullResults([])
    setExtractResult(null)
    setGroqResult(null)
    try {
      const searchRes = await searchProduct(product)
      const links = searchRes.cleaned_links || []
      setResult(searchRes)
      setCleanedLinks(links)
      setFullResults(searchRes.results || [])
      if (links.length > 0) {
        const extractRes = await extractLinks(links)
        setExtractResult(extractRes)
      } else {
        setExtractResult({ message: 'No links to extract.' })
      }
    } catch (err) {
      setError('Failed to search and extract product.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearchExtractGroq = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    setCleanedLinks([])
    setFullResults([])
    setExtractResult(null)
    setGroqResult(null)
    try {
      const searchRes = await searchProduct(product)
      const links = searchRes.cleaned_links || []
      setResult(searchRes)
      setCleanedLinks(links)
      setFullResults(searchRes.results || [])
      if (links.length > 0) {
        const extractRes = await extractLinks(links)
        setExtractResult(extractRes)
        let combinedText = ''
        if (extractRes && extractRes.data && Array.isArray(extractRes.data.results)) {
          combinedText = extractRes.data.results.map(r => r.rawContent).join('\n\n')
        }

        if (combinedText) {
          const groqRes = await analyzeGroq(product, combinedText)
            console.log('Groq Result:', groqRes)
          setGroqResult(groqRes)
        } else {
          setGroqResult({ message: 'No relevant text to analyze.' })
        }
      } else {
        setExtractResult({ message: 'No links to extract.' })
        setGroqResult({ message: 'No links to analyze.' })
      }
    } catch (err) {
      setError('Failed to search, extract, and analyze product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Test Product Environmental Analysis</h2>
      <form className="space-y-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Product Name"
          value={product}
          onChange={e => setProduct(e.target.value)}
          required
        />
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleCrawl}
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze (Crawl)'}
          </button>
          <button
            onClick={handleSearch}
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button
            onClick={handleSearchExtract}
            type="button"
            className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Searching & Extracting...' : 'Search+Extract'}
          </button>
          <button
            onClick={handleSearchExtractGroq}
            type="button"
            className="bg-pink-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Full Pipeline...' : 'Search+Extract+Groq'}
          </button>
        </div>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {cleanedLinks.length > 0 && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h3 className="font-semibold mb-2">Cleaned Links:</h3>
          <ul className="list-disc pl-6">
            {cleanedLinks.map((link, idx) => (
              <li key={idx} className="break-all"><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
            ))}
          </ul>
        </div>
      )}
      {fullResults.length > 0 && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Full Results:</h3>
          <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(fullResults, null, 2)}</pre>
        </div>
      )}
      {extractResult && (
        <div className="mt-6 p-4 border rounded bg-yellow-50">
          <h3 className="font-semibold mb-2">Extract Results:</h3>
          <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(extractResult, null, 2)}</pre>
        </div>
      )}
      {groqResult && (
        <div className="mt-6 p-4 border rounded bg-pink-50">
          <h3 className="font-semibold mb-2">Groq Analysis Result:</h3>
          {(() => {
            const resultText = groqResult.result || groqResult.message || ''
            const scoreMatch = resultText.match(/\*\*Environmental Score:([^\n*]*)/i) || resultText.match(/<Environmental Score>\s*Score: ([^\n]+)/i)
            const co2Match = resultText.match(/\*\*CO2 Footprint:([^\n*]*)/i) || resultText.match(/<CO2 Footprint>\s*([^<]+)/i)
            const tipsMatch = resultText.match(/\*\*Environmental Tips:\*\*([\s\S]*?)(\*\*|<Explanation>|$)/i) || resultText.match(/<Environmental Tips>\s*([\s\S]*?)(\n\n<Explanation>|$)/i)
            const explanationMatch = resultText.match(/\*\*Explanation:\*\*([\s\S]*)/i) || resultText.match(/<Explanation>\s*([\s\S]*)/i)
            
            if (!scoreMatch && !co2Match && !tipsMatch && !explanationMatch) {
              return <pre className="whitespace-pre-wrap text-xs">{resultText}</pre>
            }
            return (
              <div>
                <div className="mb-2"><strong>Environmental Score:</strong> {scoreMatch ? scoreMatch[1].trim() : 'N/A'}</div>
                <div className="mb-2"><strong>CO₂ Footprint:</strong> {co2Match ? co2Match[1].trim() : 'N/A'}</div>
                <div className="mb-2"><strong>Environmental Tips:</strong><br />
                  <span className="whitespace-pre-line">{tipsMatch ? tipsMatch[1].trim() : 'N/A'}</span>
                </div>
                <div className="mb-2"><strong>Explanation:</strong><br />
                  <span className="whitespace-pre-line">{explanationMatch ? explanationMatch[1].trim() : 'N/A'}</span>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}

export default TestFlow