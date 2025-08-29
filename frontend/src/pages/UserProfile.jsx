import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, User, Mail, Award, CalendarDays } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import { getUserProfile } from '../services/userProfileService'

const UserProfile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await getUserProfile()
        const data = resp.data?.data?.user || resp.data?.user || resp.user || resp
        console.log(data)
        setProfile(data)
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
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
      
      <motion.div 
        className="container mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl font-bold text-emerald-800 mb-2 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Your Profile
          </motion.h1>
          
          <motion.p 
            className="text-center text-emerald-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Manage your account and view your eco-impact
          </motion.p>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
              <p className="text-emerald-700">Loading your profile...</p>
            </div>
          )}

          {error && (
            <motion.div 
              className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-md"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-red-700 flex items-center">
                <span className="mr-2">⚠️</span> {error}
              </p>
            </motion.div>
          )}

          {profile && !loading && (
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="bg-emerald-600 text-white p-8 relative overflow-hidden"
                variants={itemVariants}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full -mt-16 -mr-16 opacity-30" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500 rounded-full -mb-12 -ml-12 opacity-20" />
                
                <div className="relative z-10 flex items-center">
                  <div className="bg-white rounded-full p-3 mr-4">
                    <User className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {profile.firstName || profile.first_name} {profile.lastName || profile.last_name}
                    </h2>
                    <p className="text-emerald-100">{profile.email}</p>
                  </div>
                </div>

                {profile.score !== undefined && (
                  <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                    <Award className="h-10 w-10 text-yellow-300 mr-3" />
                    <div>
                      <p className="text-sm text-emerald-100">Eco-Score</p>
                      <p className="text-3xl font-bold">{profile.score}</p>
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="p-8">
                <motion.h3 
                  className="text-xl font-semibold text-gray-700 mb-4"
                  variants={itemVariants}
                >
                  Account Information
                </motion.h3>

                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                >
                  <motion.div 
                    className="flex items-start border-b border-gray-100 pb-4"
                    variants={itemVariants}
                  >
                    <Mail className="w-5 h-5 text-emerald-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-gray-800">{profile.email}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start border-b border-gray-100 pb-4"
                    variants={itemVariants}
                  >
                    <User className="w-5 h-5 text-emerald-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-gray-800">
                        {profile.firstName || profile.first_name} {profile.lastName || profile.last_name}
                      </p>
                    </div>
                  </motion.div>

                  {profile.createdAt && (
                    <motion.div 
                      className="flex items-start pb-4"
                      variants={itemVariants}
                    >
                      <CalendarDays className="w-5 h-5 text-emerald-500 mt-1 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="text-gray-800">
                          {new Date(profile.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                <motion.div 
                  className="mt-8 flex justify-center"
                  variants={itemVariants}
                >
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg 
                               hover:bg-emerald-700 transition-all shadow-md
                               hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Return to Dashboard
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default UserProfile