import axios from 'axios';

export const getUserProfile = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/auth/user-profile');
        return response.data;
    } catch (error) {
        console.error('Error in getUserProfile:', error.response ? error.response.data : error.message);
        throw error;
    }
}