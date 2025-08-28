import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Loader2, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import ImageCapture from '../components/ImageCapture/ImageCapture'
import { identifyBrandWithImage } from '../services/imageService'
import { searchProduct, extractLinks } from '../services/searchService'
import { analyzeGroq } from '../services/groqService'
import { updateUserScore, getUserScore } from '../services/scoreService'

function GetStartedPage() {
    const navigate = useNavigate()
    const [capturedImage, setCapturedImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [uploadMessage, setUploadMessage] = useState('')
    const [brandResult, setBrandResult] = useState(null)
    const [groqResult, setGroqResult] = useState(null)
    const [error, setError] = useState('')
    const [scoreUpdateStatus, setScoreUpdateStatus] = useState(null)

    const handleImageCapture = (ImageData) => {
        setCapturedImage(ImageData)
        setUploadMessage('')
        setBrandResult(null)
    }

    const handleAnalyzeImage = async () => {
        if(!capturedImage) return
        setIsLoading(true)
        setUploadMessage('')
        setBrandResult(null)
        setGroqResult(null)
        setError('')
        setScoreUpdateStatus(null)
        try{
            const brandRes = await identifyBrandWithImage(capturedImage)
            setBrandResult(brandRes)

            const product = typeof brandRes === 'string' ? brandRes : (brandRes?.name || brandRes?.product || JSON.stringify(brandRes))

            const searchRes = await searchProduct(product)
            const links = searchRes.cleaned_links || []
            let combinedText = ''
            if(links.length>0){
                const extractRes = await extractLinks(links)
                if(extractRes && extractRes.data && Array.isArray(extractRes.data.results)){
                    combinedText=extractRes.data.results.map(r=>r.rawContent).join('\n\n')
                }
            }

            if(combinedText){
                const groqRes = await analyzeGroq(product, combinedText)
                setGroqResult(groqRes)

                let scoreValue = null 
                if(groqRes && typeof groqRes === 'object' && groqRes.result){
                    const scoreMatch = groqRes.result.match(/Score:\s*(\d+)/i)
                    scoreValue=scoreMatch ? parseInt(scoreMatch[1],10):null
                }else if(typeof groqRes === 'string'){
                    const scoreMatch = groqRes.match(/Score:\s*(\d+)/i)
                    scoreValue = scoreMatch ? parseInt(scoreMatch[1],10):null
                }

                if (scoreValue !== null){
                    try {
                        console.log('Attempting updating user score with value:'. scoreValue)
                        const scoreUpdateResult = await updateUserScore(scoreValue)
                        console.log('Score updated:', scoreUpdateResult)

                        const userScoreData = await getUserScore()
                        console.log('User score data:', userScoreData)

                        setStoreUpdateStatus({
                            success: true,
                            message: `Your eco-score has been updated! +${scoreValue} points.`,
                            totalScore: userScoreData?.data?.user?.score || 0
                        })
                    }catch(scoreErr) {
                        console.error('Failed to update score:', scoreErr)

                        let errorMessage = 'Could not update your eco-store'

                        if(scoreErr.response && scoreErr.response.data){
                            errorMessage = scoreErr.response.data.error || errorMessage
                            console.error('Backend error details:', scoreErr.response.data)
                        }else if(scoreErr.message){
                            errorMessage=scoreErr.message
                        }

                        setScoreUpdateStatus({
                            success:false,
                            message: `Error: ${errorMessage}`
                        })
                    }
                }

                setUploadMessage('Analysis complete!')
                console.log('Identified:', brandRes)
                console.log('Groq Analysis:', groqRes)
            }else{
                setGroqResult({message: 'No relevant text to analyze.'})
                setUploadMessage('Analysis complete!')
                console.log('Identified:', brandRes)
                console.log('Groq Analysis: No relevant text to analyze.')
            }
        }catch(err){
            setError('Failed to analyze image and product.')
        }finally{
            setIsLoading(false)
        }
    }

    return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 font-sans">
      <PageHeader 
        title="Thrivable" 
        onProfile={() => navigate('/user-profile')}
        onLeaderboard={() => navigate('/leaderboard')}
        onDashboard={() => navigate('/dashboard')}
        showBackButton={false}
      />

      <section className="container mx-auto px-6 py-8">
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <ImageCapture 
              onImageCapture={handleImageCapture}
              capturedImage={capturedImage}
            />
            {capturedImage && (
              <div className="mt-4 flex flex-col items-center">
                <button
                  onClick={handleAnalyzeImage}
                  className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5 mr-2" />
                      Analyzing...
                    </>
                  ) : 'Analyze Image'}
                </button>
                {uploadMessage && !isLoading && (
                  <div className="mt-2 text-emerald-700">{uploadMessage}</div>
                )}
                {scoreUpdateStatus && (
                  <div className={`mt-2 ${scoreUpdateStatus.success ? 'text-emerald-700' : 'text-red-600'} 
                      bg-${scoreUpdateStatus.success ? 'emerald' : 'red'}-50 p-3 rounded-md 
                      border border-${scoreUpdateStatus.success ? 'emerald' : 'red'}-200 w-full`}>
                    <div className={`${scoreUpdateStatus.success ? '' : 'font-medium'}`}>{scoreUpdateStatus.message}</div>
                    {scoreUpdateStatus.success && (
                      <div className="mt-1 font-medium">
                        Total Score: {scoreUpdateStatus.totalScore !== null && scoreUpdateStatus.totalScore !== undefined ? scoreUpdateStatus.totalScore : 'Loading...'}
                      </div>
                    )}
                  </div>
                )}
                {error && (
                  <div className="mt-2 text-red-600">{error}</div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 px-6 py-4 font-medium text-center cursor-pointer transition-colors text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50`}
                disabled
              >
                Environmental Impact
              </button>
            </div>
            <div className="p-6">
              <EnvironmentalImpactTab capturedImage={capturedImage} groqResult={groqResult} isLoading={isLoading} />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const EnvironmentalImpactTab = ({ capturedImage, groqResult, isLoading }) => {
  let score = null, co2 = null, tips = null, explanation = null;
  let resultString = null;
  if (groqResult && typeof groqResult === 'object' && groqResult.result) {
    resultString = groqResult.result;
  } else if (typeof groqResult === 'string') {
    resultString = groqResult;
  }
  if (resultString) {
    const scoreMatch = resultString.match(/Score:\s*(\d+)/i);
    const co2Match = resultString.match(/<CO2 Footprint>\s*([\s\S]*?)\n\s*</i);
    const tipsMatch = resultString.match(/<Environmental Tips>\s*([\s\S]*?)\n\s*</i);
    const explanationMatch = resultString.match(/<Explanation>\s*([\s\S]*)/i);
    score = scoreMatch ? scoreMatch[1] : null;
    co2 = co2Match ? co2Match[1].trim() : null;
    tips = tipsMatch ? tipsMatch[1].trim() : null;
    explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log('Parsed Groq Score:', score);
  }
  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <Loader2 className="animate-spin w-10 h-10 text-emerald-600 mb-4" />
          <span className="text-emerald-800 font-medium">Analyzing image... Please wait for results.</span>
        </div>
      ) : capturedImage && resultString ? (
        <>
          <div>
            <h3 className="text-xl font-bold text-emerald-900 mb-4">Environmental Score</h3>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-emerald-700">{score || 'N/A'}</span>
              <span className="text-gray-500">/ 100</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-emerald-900">CO2 Footprint: </span>
              <span className="text-gray-700">{co2 || 'Not available'}</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900 mb-4">Environmental Tips</h3>
            <div className="space-y-3">
              {tips ? tips.split(/\n|\r/).map((tip, i) => tip.trim() && (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{tip.replace(/^\d+\.\s*/, '')}</p>
                </div>
              )) : <p className="text-gray-700">No tips available.</p>}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900 mb-4">Explanation</h3>
            <p className="text-gray-700">{explanation || 'No explanation provided.'}</p>
          </div>
        </>
      ) : !capturedImage ? (
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-emerald-600" />
            <p className="text-emerald-800">
              Please capture or upload an image to see environmental impact analysis.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GetStartedPage