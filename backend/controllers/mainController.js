exports.welcome = (req, res) => {
  res.json({ 
    message: 'Welcome to the Sustain-ify API',
    version: '1.0.0',
    status: 'active' 
  })
}

exports.healthCheck = (req, res) => {
  res.json({ 
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
}