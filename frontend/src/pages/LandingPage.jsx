import React from "react";
import {easeInOut, motion} from 'framer-motion'
import { Camera,Scan,Heart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'

function LandingPage() {
    const navigate = useNavigate()
    const handleGetStarted = () =>{
        navigate('/signup')
    }
    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 font-sans">
            <header className="container mx-auto px-6 py-6">
                <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-full" />
                        <h1 className="text-2xl font-bold text-emerald-800">Prospera</h1>
                    
                    </div>
                    <div className="hidden md:flex gap-8">
                        <NavLink onClick={() => navigate('/')}>Home</NavLink>
                        <NavLink onClick={()=>{
                            const el = document.getElementById('features-section')
                            if(el) el.scrollIntoView({behavior: 'smooth'})
                        }}>Features</NavLink>
                        <NavLink onClick={()=> navigate('/about')}>About</NavLink>
                    </div>
                    <div className="flex items-center gap-3">
                        <motion.button
                        className="px-4 py-2 rounded-full font-medium text-emerald-600 border border-emerald-600 bg-white text-sm"
                        whileHover={{scale:1.05, backgroundColor: 'rgba(16,185,129,0.08'}}
                        whileTap={{scale: 0.95}}
                        onClick={handleLogin}
                        >
                            Login
                        </motion.button>
                        <motion.button
                        className="bg-emerald-600 text-white px-6 py-2 rounded-full font-medium cursor-pointer"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale:0.95}}
                        onClick={handleGetStarted}
                        >
                            Get Started
                        </motion.button>
                    </div>
                </motion.div>
            </header>

            <section className="container mx-auto px-6 py-16 md:py-24">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <motion.div 
                    className="md:w-1/2"
                    initial={{opacity:0,x:-50}}
                    animate={{opacity:1,x:0}}
                    transition={{duration: 0.7, delay:0.2}}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 leading-tight mb-6">
                            Make <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Sustainable</span> Choices With Confidence
                        </h2>
                        <p className="text-lg text-emerald-800/80 mb-8 max-w-md">
                            Prospera helps you see the environmental impact of everyday products and rewards you for making eco-friendly choices.
                        </p>
                        <div className="flex gap-4">
                            <motion.button
                            className="bg-emerald-600 text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-emerald-200 cursor-pointer"
                            whileHover={{scale:1.05}}
                            whileTap={{scale:0.95}}
                            onClick={handleGetStarted}
                            >
                                Get Started 
                            </motion.button>
                            <motion.button
                            className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-full font-medium cursor-pointer"
                            whileHover={{scale: 1.05, backgroundColor:'rgba(16,185,129,0.1)'}}
                            whileTap={{scale: 0.95}}
                            onClick={()=>{
                                const el = document.getElementById('features-section')
                                if(el) el.scrollIntoView({behavior:'smooth'})
                            }}>
                                Learn More 
                            </motion.button>
                        </div>
                    </motion.div>
                    <motion.div 
                    className="md:w-1/2 relative"
                    initial={{opacity:0,scale:0.8}}
                    animate={{opacity:1, scale:1}}
                    transition={{duration: 0.7, delay:0.4}}
                    >
                        <div className="relative mx-auto w-[560px] bg-white rounded-xl shadow-2xl overflow-hidden">
                            <div className="bg-emerald-800 h-8 flex items-center px-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="ml-6 bg-emerald-700 rounded-md px-4 py-1 text-xs text-emerald-100 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    prospera.org/dashboard 
                                </div>
                            </div>
                            <div className="bg-gradient-to-b from-emerald-50 to-teal-100 p-5 h-[320px]">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-emerald-500 rounded-full"></div>
                                        <div className="text-base font-bold text-emerald-800">Prospera</div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-16 h-3 bg-emerald-200 rounded-full"></div>
                                        <div className="w-16 h-3 bg-emerald-200 rounded-full"></div>
                                        <div className="w-16 h-3 bg-emerald-200 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex gap-4 h-[260px]">
                                    <div className="bg-white rounded-xl p-4 shadow-md w-1/2">
                                        <div className="border-2 border-dashed border-emerald-300 rounded-lg p-4 flex flex-col items-center h-full justify-center">
                                            <motion.div 
                                            className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-3"
                                            animate={{
                                                scale:[1,1.05,1],
                                            }}
                                            transition={{repeat: Infinity, duration:2, ease: "easeInOut"}}
                                            >
                                                <svg xmlns="http://www.we.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </motion.div>
                                            <p className="text-sm text-emerald-800 font-medium mb-2">Drag & drop product images</p>
                                            <button className="bg-emerald-500 text-white px-3 py-1.5 rounded-md text-sm">
                                                Upload Image 
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-md w-1/2 p-4 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                                            <div className="text-sm font-semibold text-emerald-800">Eco Score</div>
                                        </div>

                                        <div className="flex-1 flex items-center justify-center">
                                            <div className="bg-emerald-50 rounded-lg p-4 text-cemter">
                                                <div className="flex items-end justify-center">
                                                    <span className="text-3xl font-bold text-emerald-800">85</span>
                                                    <span className="text-xl text-emerald-600 mb-0.5">/100</span>
                                                </div>
                                                <div className="w-full h-2 bg-emerald-100 rounded-full mt-4">
                                                    <div className="bg-emerald-500 h-full rounded-full w-[85%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2 mt-3">
                                            <div className="text-xs font-medium text-emerald-800 mb-1">Sustainable Alternatives</div>
                                            <div className="p-1.5 bg-emerald-50 rounded-lg flex items-center gap-2">
                                                <div className="w-6 h-6 bg-emerald-200 rounded-md"></div>
                                                <div className="flex-1 h-2 bg-emerald-100 rounded-full"></div>
                                            </div>
                                            <div className="p-1.5 bg-emerald-50 rounded-lg flex items-center gap-2">
                                                <div className="w-6 h-6 bg-emerald-200 rounded-md"></div>
                                                <div className="flex-1 h-2 bg-emerald-100 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <motion.div 
                        className="absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-200 rounded-xl"
                        animate={{
                            rotate:[0,10,0,-10,0],
                            y:[0,-5,0,5,0]
                        }}
                        transition={{repeat:Infinity,duration:10, ease: 'easeInOut'}}
                        />
                        <motion.div 
                        className="absolute -top-4 -right-4 w-14 h-14 bg-teal-300 rounded-full"
                        animate={{
                            scale:[1,1.1,1],
                            opacity:[0.7,1,0.7]
                        }}
                        transition={{repeat:Infinity,duration:8,ease:'easeInOut'}}
                        />
                    </motion.div>
                </div>
            </section>
            <section id="features-section" className="container mx-auto px-6 py-16 md:py-24">
                <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                >
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">Make Sustainability Simple</h2>
                <p className="text-lg text-emerald-800/80 max-w-2xl mx-auto">
                    Prospera offers powerful features to help you make environmentally conscious decisions every day.
                </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <FeatureCard 
                    icon={<Camera className="w-7 h-7" />}
                    title="Eco-Shopping Assistant"
                    description="Take or upload a picture of a product to see its environmental impact score and get recommendations for more sustainable alternatives."
                    delay={0.1}
                />
                <FeatureCard 
                    icon={<Scan className="w-7 h-7" />}
                    title="Sustainability Leaderboard"
                    description="Track your accumulated sustainability score and compete with others on a global leaderboard. See how your choices make a difference."
                    delay={0.3}
                />
                <FeatureCard 
                    icon={<Heart className="w-7 h-7" />}
                    title="Environmental Impact Insights"
                    description="Get detailed analysis of products' environmental footprint, including carbon emissions, recyclability, and practical eco-friendly tips."
                    delay={0.5}
                />
                </div>
            </section>
            <section className="container mx-auto px-6 py-16 md:py-24">
                <motion.div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                >
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <motion.div 
                    className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        x: [0, 20, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                    />
                    <motion.div 
                    className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-white"
                    animate={{ 
                        scale: [1, 1.1, 1],
                        x: [0, -10, 0],
                        y: [0, 10, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
                    />
                </div>
                
                <div className="relative z-10 text-center max-w-2xl mx-auto">              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to make sustainable choices?
                    </h2>
                    <p className="text-lg mb-8 text-white/90">
                    Join our community of eco-conscious users who are making a difference with every product choice.
                    </p>
                    <motion.button 
                    className="bg-white text-emerald-600 px-8 py-3 rounded-full font-medium shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetStarted}
                    >
                    Get Started
                    </motion.button>
                </div>
                </motion.div>
            </section>
            <footer className="bg-emerald-900 text-emerald-100 py-12">
                <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-emerald-400 rounded-full" />
                        <h3 className="text-xl font-bold">Prospera</h3>
                    </div>
                    <p className="max-w-xs text-emerald-300">
                        Guiding you toward a more sustainable lifestyle, one step at a time.
                    </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div className='col-span-2'>
                        <h4 className="font-bold mb-4">Features</h4>
                        <ul className="space-y-2">
                        <FooterLink>Eco-Shopping Assistant</FooterLink>
                        <FooterLink>Sustainability Leaderboard</FooterLink>
                        <FooterLink>Environmental Impact Insights</FooterLink>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </footer>
        </div>
    )
}
const NavLink = ({ children, onClick }) => (
  <motion.a 
    href="#"
    onClick={onClick}
    className="text-emerald-700 hover:text-emerald-500 font-medium"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div 
    className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <motion.div 
      className="bg-emerald-100 text-emerald-600 p-3 rounded-lg inline-block mb-4"
      whileHover={{ 
        scale: 1.1, 
        rotate: 5,
        backgroundColor: "#10b981",
        color: "#ffffff"
      }}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold text-emerald-900 mb-3">{title}</h3>
    <p className="text-emerald-700/80">{description}</p>
  </motion.div>
);

const FooterLink = ({ children }) => (
  <li>
    <motion.a 
      href="#" 
      className="text-emerald-300 hover:text-white transition-colors"
      whileHover={{ x: 3 }}
    >
      {children}
    </motion.a>
  </li>
);


export default LandingPage;