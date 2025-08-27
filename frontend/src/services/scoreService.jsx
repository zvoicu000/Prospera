import axios from 'axios'
import { jwtDecode } from 'jwt-decode'


const getCurrentUserId = () => {
  try {
    const token = localStorage.getItem('jwt')
    if (!token) return null
    
    const decoded = jwtDecode(token)
    return decoded.id || null
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

const updateUserScore = async (points, userid = null) => {
  try {
    const effectiveUserId = userid || getCurrentUserId()
    
    if (!effectiveUserId) {
      throw new Error('User ID is required but not provided and not found in JWT')
    }
    
    console.log('Sending score update with userId:', effectiveUserId, 'points:', points)
    
    const response = await axios.post('http://localhost:3000/api/scores/update_score', {
      points: parseInt(points, 10), 
      userid: effectiveUserId
    })
    return response.data
  } catch (error) {
    console.error('Error updating user score:', error)
    throw error
  }
}

const getUserScore = async (userid = null) => {
  try {
    const effectiveUserId = userid || getCurrentUserId()
    
    if (!effectiveUserId) {
      throw new Error('User ID is required but not provided and not found in JWT')
    }
    
    console.log('Fetching score for userId:', effectiveUserId)
    
    const endpoint = `http://localhost:3000/api/scores/${effectiveUserId}`
    const response = await axios.get(endpoint)
    return response.data
  } catch (error) {
    console.error('Error getting user score:', error)
    throw error
  }
}

const getLeaderboard = async (limit = 10) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/scores/leaderboard?limit=${limit}`)
    return response.data
  } catch (error) {
    console.error('Error getting leaderboard:', error)
    throw error
  }
}

export { updateUserScore, getUserScore, getLeaderboard }