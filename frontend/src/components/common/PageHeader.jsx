import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft,User, Trophy, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'

const PageHeader = ({title, onBack, onProfile, onLeaderboard, onDashboard,showBackButton = true}) =>{
    const navigate=useNavigate()
    return (
        <header className="container mx-auto px-6 py-6">
            <motion.div 
            className="grid grid-cols-3 items-center w-full"
            initial={{opacity:0,y:-20}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5}}
            >
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-full" />
                    <h1 className="text-2xl font-bold text-emerald-800">{title}</h1>
                </div>

                <div className="flex items-center justify-center gap-4">
                    {showBackButton && (
                        <motion.button 
                        onClick={onBack}
                        className="flex items-center gap-2 text-emerald-700 hover:text-emerald-500 font-medium cursor-pointer"
                        whileHover={{scale:1.05}}
                        whileTap={{scale:0.95}}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back 
                        </motion.button>
                    )}
                    {onDashboard && (
                        <motion.button 
                        onClick={onDashboard}
                        className="flex items-center gap-2 text-emerald-700 hover:text-emerald-500 font-medium cursor-pointer"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard 
                        </motion.button>
                    )}
                    {onLeaderboard && (
                        <motion.button
                        onClick={onLeaderboard}
                        className="flex items-center gap-2 text-emerald-700 hover:text-emerald-500 font-medium cursor-pointer"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        >
                            <Trophy className="w-4 h-4" />
                            Leaderboard 
                        </motion.button>
                    )}
                    {onProfile && (
                        <motion.button
                        onClick={onProfile}
                        className="flex items-center gap-2 text-emerald-700 hover:text-emerald-500 font-medium cursor-pointer"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale:0.95}}
                        >
                            <User className="w-4 h-4" />
                            Profile 
                        </motion.button>
                    )}
                </div>
                <div className="flex justify-end">
                    <motion.button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-emerald-700 hover:text-emerald-500 font-medium cursor-pointer"
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    >
                        <LogOut className="w-4 h-4" />
                        Logout 
                    </motion.button>
                </div>
            </motion.div>
        </header>
    )
}

export default PageHeader