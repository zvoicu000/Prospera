const { supabase, supabaseAdmin } = require('../config/supabase')

exports.updateUserScore = async (userid, points) => {
  try {
    if (!userid) {
      console.log('No userid provided for scoring')
      return false
    }

    console.log(`Awarding ${points} points to user ${userid}`)

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('first_name, last_name, score')
      .eq('id', userid)
      .single()

    if (profileError) {
      console.error('Error fetching user profile:', profileError)
      return false
    }

    old_score = profile.score || 0
    new_score = old_score + points

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ 
        score: new_score,
        first_name: profile?.first_name || 'User',
        last_name: profile?.last_name || ''
      })
      .eq('id', userid)

    if (error) {
      console.error('Error updating user score:', error)
      return false
    }

    console.log(`✓ Successfully awarded ${points} points to user ${userid}`)
    return true

  } catch (error) {
    console.error('Error in updateUserScore:', error)
    return false
  }
}

exports.getLeaderboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('score, first_name, last_name, created_at')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true }) 
      .limit(Math.min(limit, 50)) 

    if (error) {
      console.error('Error fetching leaderboard:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch leaderboard'
      })
    }

    const leaderboard = data
      .filter(user => (user.score || 0) >= 0) 
      .map((user, index) => ({
        rank: index + 1,
        name: `${user.first_name} ${user.last_name}`.trim() || 'Anonymous',
        score: user.score || 0
      }))

    res.json({
      success: true,
      data: {
        leaderboard: leaderboard,
        total: leaderboard.length
      },
      message: 'Leaderboard retrieved successfully'
    })

  } catch (error) {
    console.error('Error in getLeaderboard:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}

exports.updateScore = async (req, res) => {
  try {
    console.log('Received update score request. Body:', req.body)
    const { points, userid } = req.body
    
    if (typeof points !== 'number' || points < 0) {
      console.log('Invalid points value:', points, typeof points)
      return res.status(400).json({
        success: false,
        error: 'Points must be a positive number'
      })
    }

    if (!userid) {
      console.log('Missing userid in request')
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      })
    }

    const success = await exports.updateUserScore(userid, points)

    if (success) {
      res.json({
        success: true,
        message: `Successfully awarded ${points} points`,
        data: { points, userid }
      })
    } else {
      res.status(400).json({
        success: false,
        error: 'Failed to update score - invalid user ID or database error'
      })
    }

  } catch (error) {
    console.error('Error in updateScore endpoint:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}

exports.getUserScore = async (req, res) => {
  console.log('Fetching user score for:', req.params.userid)
  try {
    const { userid } = req.params

    if (!userid) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      })
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('score, first_name, last_name')
      .eq('id', userid)
      .single()

    if (profileError) {
      console.error('Error fetching user profile:', profileError)
      return res.status(404).json({
        success: false,
        error: 'User profile not found'
      })
    }

    const { data: rankData, error: rankError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .gt('score', profile.score || 0)
      .order('score', { ascending: false })

    const rank = rankError ? null : (rankData?.length || 0) + 1

    res.json({
      success: true,
      data: {
        user: {
          name: `${profile.first_name} ${profile.last_name}`.trim(),
          score: profile.score || 0,
          rank: rank
        }
      }
    })

  } catch (error) {
    console.error('Error in getUserScore:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
} 