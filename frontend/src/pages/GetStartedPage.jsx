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
}