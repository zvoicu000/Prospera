import React from "react"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import PageHeader from "../components/common/PageHeader"
import axios from "axios"
import {Loader2, Trophy, Medal, Award, Star} from 'lucide-react'

const LeaderboardPage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [leaders, setLeaders] =useState([])

    useEffect(()=>{
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/scores/leaderboard')
                setLeaders(response.data.data.leaderboard)
                setLoading(false)
                console.log(response.data)
            }catch(error) {
                setError(error.message)
            }finally{
                setLoading(false)
            }
        }
        fetchLeaderboard()
    },[])

    const getRankIcon = (rank) =>{
        switch (rank) {
            case 1:
                return <Trophy className="w-6 h-6 text-yellow-500" />
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />
            case 3:
                return <Award className="w-6 h-6 text-amber-600" />
            default:
                return <Star className="w-6 h-6 text-emerald-500" />
        }
    }

    const getRankBadge = (rank) => {
        switch(rank){
            case 1:
                return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
            case 2:
                return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
            case 3:
                return "bg-gradient-to-r from-amber-500 to-amber-700 text-white"
            default:
                return "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white"
        }
    }

    if(loading){
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 font-sans flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="animate-spin w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <p className="text-emerald-800 font-medium">Loading leaderboard...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 font-sans flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 font-medium">Error: {error}</p>
                </div>
            </div>
        )
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
            
            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-emerald-900 mb-2">
                        Top Environmental Champions
                    </h2>
                    <p className="text-emerald-700 text-lg">
                        See who's leading the way in sustainability
                    </p>
                </div>

                {/* Leaderboard */}
                <div className="max-w-4xl mx-auto">
                    {leaders.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            <Trophy className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                                No scores yet
                            </h3>
                            <p className="text-emerald-600">
                                Be the first to earn points and climb the leaderboard!
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-1 text-center">
                                        <span className="text-emerald-100 font-semibold">Rank</span>
                                    </div>
                                    <div className="col-span-8">
                                        <span className="text-emerald-100 font-semibold">Player</span>
                                    </div>
                                    <div className="col-span-3 text-center">
                                        <span className="text-emerald-100 font-semibold">Score</span>
                                    </div>
                                </div>
                            </div>

                            {/* Leaderboard Items */}
                            <div className="divide-y divide-gray-100">
                                {leaders.map((leader, index) => (
                                    <div 
                                        key={leader.rank}
                                        className={`px-6 py-4 hover:bg-emerald-50 transition-colors duration-200 ${
                                            index < 3 ? 'bg-gradient-to-r from-emerald-50 to-teal-50' : ''
                                        }`}
                                    >
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            {/* Rank */}
                                            <div className="col-span-1 text-center">
                                                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankBadge(leader.rank)}`}>
                                                    {leader.rank}
                                                </div>
                                            </div>
                                            
                                            {/* Player Info */}
                                            <div className="col-span-8 flex items-center gap-3">
                                                <div className="flex items-center gap-2">
                                                    {getRankIcon(leader.rank)}
                                                    <div>
                                                        <h3 className="font-semibold text-emerald-900">
                                                            {leader.name}
                                                        </h3>
                                                        <p className="text-sm text-emerald-600">
                                                            Rank #{leader.rank}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Score */}
                                            <div className="col-span-3 text-center">
                                                <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold text-lg">
                                                    {leader.score.toLocaleString()} pts
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats Footer */}
                <div className="mt-8 text-center">
                    <p className="text-emerald-700">
                        Total participants: <span className="font-semibold">{leaders.length}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardPage