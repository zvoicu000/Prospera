import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {loginUser,registerUser} from '../services/authService'

const LoginPage=() => {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async(e) =>{
        e.preventDefault()
        setLoading(true)
        setError('')
        try{
            await loginUser({email,password})
            navigate('/dashboard')
        }catch(err){
            setError('Login failed. Please check your credentials')
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen flex itmes-center justify-center bg-gradient-to-b from-emerald-50 to-teal-100">
            <motion.div 
            className="bg-white tounded-xl shadow-lg p-8 w-full max-w-md"
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{duration: 0.7, ease: 'easeOut'}}
            >
                <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">Login to Prospera</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                    type="email"
                    className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    required
                    />
                    <input
                    type="password"
                    className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    />
                    {error && <div className="text-red-600 text-sm">{error}</div>}
                    <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 rounded font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
                    disabled={loading}
                    >
                        {loading? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <button className="text-emerald-700 hover:underline" onClick={()=>navigate('/signup')}>Sign Up</button>
                </div>
            </motion.div>
        </div>
    )
}

export default LoginPage