import React, {useState, useRef, useCallback} from "react";
import {motion} from 'framer-motion'
import { Camera,Upload,X, RotateCcw } from "lucide-react";
import Webcam from "react-webcam";

const ImageCapture = ({onImageCapture, capturedImage}) =>{
    const webcamRef = useRef(null)
    const fileInputRef = useRef(null)
    const [isCameraOpen, setIsCameraOpen] = useState(false)

    const openCamera = () => {
        setIsCameraOpen(true)
    }

    const closeCamera = () => {
        setIsCameraOpen(false)
    }

    const captureImage = useCallback(()=>{
        if(webcamRef.current){
            const imageSrc = webcamRef.current.getScreenshot()
            onImageCapture(imageSrc)
            setIsCameraOpen(false)
        }
    },[onImageCapture])

    const retakePhoto = () => {
        onImageCapture(null)
        setIsCameraOpen(true)
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onload = (e) => {
                onImageCapture(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const triggerFileUpload=() => {
        fileInputRef.current?.click()
    }

    const clearImage = () => {
        onImageCapture(null)
        if(fileInputRef.current){
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-emerald-900 mb-4">
                Capture or Upload Image
            </h2>

            {/* Camera view */}
            {isCameraOpen && (
                <motion.div 
                className="w-full h-80 bg-black rounded-lg overflow-hidden mb-4 relative"
                initial={{opacity:0, scale: 0.9}}
                animate={{opacity: 1, scale:1}}
                exit={{opacity:0,scale:0.9}}
                >
                    <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                        <motion.button
                        onClick={closeCamera}
                        className="bg-red-500 text-white p-3 rounded-full cursor-pointer"
                        whiteHover = {{scale:1.1}}
                        whileTap={{scale: 0.9}}
                        >
                            <X className="w-5 h-5" />
                        </motion.button>

                        <motion.button
                        onClick={captureImage}
                        className="bg-emerald-600 text-white p-4 rounded-full cursor-pointer border-4 border-white"
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        >
                            <Camera className="w-6 h-6"/>
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {!isCameraOpen && (
                <div className="w-full h-80 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 relative overflow-hidden">
                        {capturedImage ? (
                        <>
                            <img 
                                src={capturedImage}
                                alt="Captured"
                                className="w-full h-full object-cover rounded-lg"
                            />

                            <div className="absolute top-2 right-2 flex gap-2">
                                <motion.button
                                onClick={retakePhoto}
                                className="bg-emerald-600 text-white p-2 rounded-full cursor-pointer"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale:0.9}}
                                >
                                    <RotateCcw className="w-4 h-4"/>
                                </motion.button>
                                <motion.button
                                onClick={clearImage}
                                className="bg-red-500 text-white p-2 rounded-full cursor-pointer"
                                whileHover={{scale:1.1}}
                                whileTap={{scale:0.9}}
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </>
                    ):(
                        <div className="text-center text-gray-500">
                            <Camera className="w-12 h-12 mx-auto mb-2" />
                            <p>No image captured yet</p>
                            <p className="text-sm">Click "Open Camera" or "Upload Image" to get started</p>
                            </div>
                    )}
                    </div>
            )}

            {!isCameraOpen && (
                <div className="flex gap-3">
                    <motion.button
                    onClick={openCamera}
                    className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer flex items-center justify-center gap-2"
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    >
                        <Camera className="w-4 h-4" />
                        Open Camera 
                    </motion.button>

                    <motion.button
                    onClick={triggerFileUpload}
                    className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer flex items-center justify-center gap-2"
                    whileHover={{scale:1.02}}
                    whileTap={{scale:0.98}}
                    >
                        <Upload className="w-4 h-4" />
                        Upload Image 
                    </motion.button>
                    </div>
            )}

            <input 
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            />
        </div>
    )
}

export default ImageCapture