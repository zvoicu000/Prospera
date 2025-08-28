import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { registerUser } from '../services/authService'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!firstName || !lastName) {
      setError('First name and last name are required.')
      return
    }
    setLoading(true)
    try {
      await registerUser({ email, password, firstName, lastName })
      navigate('/dashboard')
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error)
      } else if (err.message) {
        setError(err.message)
      } else {
        setError('Sign up failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-teal-100">
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">Sign Up for Prospera</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          <input
            type="password"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <button className="text-emerald-700 hover:underline" onClick={() => navigate('/login')}>Login</button>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUpPage