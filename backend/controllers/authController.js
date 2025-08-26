const {supabase, supabaseAdmin} = require('../config/supabase')
const {signToken} = require('../utils/jwt')

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const isValidPassword = (password) => {
    return password && password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password)
}

const jwt = require('jsonwebtoken')

const authenticateUser = async (req) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return {error: 'No token provided', status:401}
    }

    const token=authHeader.replace('Bearer ', '')

    if(!process.env.JWT_SECRET){
        return {error: 'Server misconfiguration',status:500}
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const userId = payload.id 

        const {data: user, error} = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()
        if(error || !user){
            return {error: 'User not found', status: 401}
        }

        console.log('user profile:', user)
        return {user,token}
    }catch(err){
        return {error: 'Invalid or expired token', status:401}
    }
}

exports.registerUser = async (req, res) => {
    try{
        const {email, password, firstName, lastName} = req.body

        if(!email || !password || !firstName || !lastName){
            return res.status(400).json({
                success: false,
                error: 'Email, password, first name, and last name are required'
            })
        }

        if(!isValidEmail(email)){
            return res.status(400).json({
                success: false,
                error: 'Please provide a valid email adress'
            })
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 6 characters and contain both letters and numbers'
            })
        }

        const {data, error} = await supabase.auth.signUp({
            email: email.toLowerCase().trim(),
            password: password,
            options:{
                data: {
                    first_name: firstName.trim(),
                    last_name: lastName.trim(),
                    full_name: `${firstName.trim()} ${lastName.trim()}`
                }
            }
        })

        if(error){
            if(error.message.includes('already registered')){
                return res.status(409).json({
                    success: false,
                    error: 'An account with this email already exists'
                })
            }

            return res.status(400).json({
                success: false,
                error: error.message || 'Registration failed'
            })
        }

        const token= signToken(data.user.id)

        const {error: profileError} = await supabaseAdmin.from('profiles').insert({
            id: data.user.id,
            email: email.toLowerCase().trim(),
            first_name:firstName.trim(),
            last_name:lastName.trim(),
            score:0   
        })

        if(profileError){
            console.error('Profile insert error:', profileError.message)
        }

        res.status(201).json({
            success: true,
            token,
            data: {
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    firstName: data.user.user_metadata.first_name,
                    lastName: data.user.user_metadata.last_name,
                    emailConfirmed: data.user.email_confirmed_at !== null
                }
            },
            message: 'Registration successful. Please check your email for verification.'
        })
        
    } catch(error){
        console.error('Registration error:', error)
        res.status(500).json({
            success: false,
            error: 'Internal server error during registration'
        })
    }
}

exports.loginUser = async (req,res) => {
    try {
        const { email, password} = req.body

        if (!email || !password){
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            })
        }

        if(!isValidEmail(email)){
            return res.status(400).json({
                success:false,
                error: 'Please provide a valid email adress'
            })
        }

        const {data,error} = await supabase.auth.signInWithPassword({
            email: email.toLowerCase().trim(),
            password:password
        })

        if(error){
            if(error.message.includes('Invalid login credentials')){
                return res.status(401).json({
                    success: false,
                    error: 'Invalid email or password'
                })
            }

            if(error.message.includes('Invalid login credentials')){
                return res.status(401).json({
                    success: false,
                    error: 'Invalid email or password'
                })
            }

            if(error.message.includes('Email not confirmed')){
                return res.status(401).json({
                    success: false,
                    error: 'Please verify your email before logging in'
                })
            }

            return res.status(401).json({
                success:false,
                error:'Login failed'
            })
        }

        const token=signToken(data.user.id)

        res.status(200).json({
            success:true,
            token,
            data: {
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    firstName:data.user.user_metadata.first_name,
                    lastName: data.user.user_metadata.last_name,
                    emailConfirmed:data.user.email_confirmed_at !== null,
                    lastSignIn: data.user.last_sign_in_at
                },
                session: {
                    access_token: data.session.access_token,
                    refresh_token: data.session.refresh_token,
                    expires_at: data.session.expires_at
                }
            },
            message: 'Login successful'
        })
    } catch(error){
        console.error('Login error:', error)
        res.status(500).json({
            success: false,
            error: 'Internal server error during login'
        })
    }
}

exports.logoutUser = async (req, res) => {
  try {
    // Authenticate user first
    const authResult = await authenticateUser(req);
    if (authResult.error) {
      return res.status(authResult.status).json({
        success: false,
        error: authResult.error
      });
    }

    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Logout failed'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during logout'
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Send password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.toLowerCase().trim(),
      {
        redirectTo: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password`
      }
    );

    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to send password reset email'
      });
    }

    // Always return success for security (don't reveal if email exists)
    res.status(200).json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Validate inputs
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        error: 'Reset token and new password are required'
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters and contain both letters and numbers'
      });
    }

    // Update password using the reset token
    const { data, error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired reset token'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token, type } = req.query;

    if (!token || type !== 'email') {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification link'
      });
    }

    // Verify the email using the token
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email'
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired verification token'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // Authenticate user
    const authResult = await authenticateUser(req);
    if (authResult.error) {
      return res.status(authResult.status).json({
        success: false,
        error: authResult.error
      });
    }

    const raw = authResult.user;
    const user = raw.user ? raw.user : raw;

    console.log(user);
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name || user.user_metadata?.first_name,
          lastName: user.last_name || user.user_metadata?.last_name,
          score: user.score || 0
        }
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    // Authenticate user
    const authResult = await authenticateUser(req);
    if (authResult.error) {
      return res.status(authResult.status).json({
        success: false,
        error: authResult.error
      });
    }

    const { firstName, lastName } = req.body;

    // Validate inputs
    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'First name and last name are required'
      });
    }

    // Update user metadata
    const { data, error } = await supabase.auth.updateUser({
      data: {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        full_name: `${firstName.trim()} ${lastName.trim()}`, 
      }
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to update profile'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.user_metadata.first_name,
          lastName: data.user.user_metadata.last_name,
          fullName: data.user.user_metadata.full_name
        }
      },
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    // Authenticate user
    const authResult = await authenticateUser(req);
    if (authResult.error) {
      return res.status(authResult.status).json({
        success: false,
        error: authResult.error
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Validate inputs
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Current password and new password are required'
      });
    }

    if (!isValidPassword(newPassword)) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 6 characters and contain both letters and numbers'
      });
    }

    // Verify current password by attempting to sign in
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: authResult.user.email,
      password: currentPassword
    });

    if (verifyError) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Update password
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to update password'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

exports.deleteUserAccount = async (req, res) => {
  try {
    // Authenticate user
    const authResult = await authenticateUser(req);
    if (authResult.error) {
      return res.status(authResult.status).json({
        success: false,
        error: authResult.error
      });
    }

    const { password } = req.body;

    // Require password confirmation for account deletion
    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Password confirmation is required to delete account'
      });
    }

    // Verify password
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: authResult.user.email,
      password: password
    });

    if (verifyError) {
      return res.status(401).json({
        success: false,
        error: 'Password is incorrect'
      });
    }

    // Delete user account (requires admin privileges)
    const { error } = await supabaseAdmin.auth.admin.deleteUser(
      authResult.user.id
    );

    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to delete account'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};