import React from "react"
import {motion, scale} from 'framer-motion'
import {ArrowLeft, Lightbulb, Users, GraduationCap, Sparkles} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/logo.png'

const NavLink = ({children, onClick})=>(
    <motion.span
    className="text-emerald-800 font-medium cursor-pointer"
    whileHover={{color:'#047857'}}
    onClick={onClick}
    >
        {children}
    </motion.span>
)

const AboutPage = () =>{
    const navigate = useNavigate ()
    const handleGetStarted = () => {
        navigate('/signup')
    }
    const handleLogin = () =>{
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 font-sans">
            <header className="container mx-auto px-6 py-6">
                <motion.div 
                className="flex justify-between items-center"
                initial={{opacity:0,y:-20}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.5}}
                >
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-10 h-10 object-contain rounded-full cursor-pointer" onClick={() => navigate('/')}/>
                        <h1 className="text-2xl font-bold text-emerald-800">Prospera</h1>
                    </div>
                    <div className="hidden md:flex gap-8">
                        <NavLink onClick={()=>navigate('/')}>Home</NavLink>
                        <NavLink onClick={()=>{
                            const el = document.getElementById('features-section')
                            if(el) el.scrollIntoView({behavior:'smooth'})
                            else navigate('/#features-section')
                        }}>Features</NavLink>
                        <NavLink onClick={() => navigate('/about')}>About</NavLink>
                    </div>
                    <div className="flex items-center gap-3">
                        <motion.button 
                        className="px-4 py-2 rounded-full font-medium text-emerald-600 border border-emerald-600 bg-white text-sm"
                        whileHover={{scale: 1.05, backgroundColor:'rgba(16,185,129,0.08)'}}
                        whileTap={{scale: 0.95}}
                        onClick={handleLogin}
                        >
                            Login 
                        </motion.button>
                        <motion.button
                        className="bg-emerald-600 text-white px-6 py-2 rounded-full font-medium cursor-pointer"
                        whileHover={{scale:1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={handleGetStarted}
                        >
                            Get Started 
                        </motion.button>
                    </div>

                </motion.div>
            </header>

            <section className="container mx-auto px-6 py-12 relative">
                <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-100 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-100 rounded-full opacity-40 blur-xl"></div>

                <motion.div 
                className="max-w-4xl mx-auto text-center relative"
                initial={{opacity: 0}}
                animate={{opacity:1}}
                transition={{duration:0.8}}
                >
                    <motion.div 
                    className="flex flex-col items-center justify-center mb-8"
                    initial={{opacity:0,scale:0.7,y:30}}
                    animate={{opacity:1, scale:1,y:0}}
                    transition={{duration:0.7, type: 'spring', bounce: 0.4}}
                    >
                        <motion.img 
                        src={logo}
                        alt='logo'
                        className="w-40 h-40 object-contain mb-6 drop-shadow-xl"
                        initial={{scale: 0.7, opacity:0}}
                        animate={{scale:1,opacity:1}}
                        transition={{duration:0.7, type: 'spring', bounce: 0.5,delay: 0.1}}
                        />
                        <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">Our Story</h1>
                        <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full mb-8"></div>

                        <p className="text-lg text-emerald-700 max-w-2xl mx-auto leading-relaxed">
                            Prospera began in 2025 with a simple question: what if we could make it easier for people to choose greener, more sustainable options in their daily lives?
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            <section className="container mx-auto px-6 py-10">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white flex items-center">
                            <motion.div 
                                initial={{opacity:0, x:-20}}
                                animate={{opacity:1,x:0}}
                                transition={{duration:0.6,delay:0.2}}
                                >
                                    <h2 className="text-3xl font-bold mb-4">My Mission</h2>
                                    <p className="mb-6 text-emerald-50">
                                        I'm creating a future where sustainability is second nature—simple, smart, and fulfilling.
                                    </p>
                                    
                                </motion.div>
                        </div>

                        <div className="md:w-1/2 p-8">
                            <motion.div 
                            initial = {{opacity: 0, x:20}}
                            animate={{opacity:1,x:0}}
                            transition={{duration: 0.6, delay:0.4}}
                            >
                                <h2 className="text-2xl font-bold text-emerald-800 mb-4">Why I Built This</h2>
                                <p className="text-emerald-700 mb-6">
                                As a student, I noticed a common challenge: even though awareness of sustainability is growing, it’s still hard for people to understand the real environmental impact of their everyday purchases.
                                </p>
                                <p className="text-emerald-700">
                               That’s why I created Prospera—to close this information gap and help people make choices that are better for our planet, while fostering a community of environmentally conscious consumers.
                               </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage