const {createClient}= require ('@supabase/supabase-js')
require('dotenv').config()

if(!process.env.SUPABASE_URL){
    throw new Error('SUPABASE_URL is required')
}

if(!process.env.SUPABASE_ANON_KEY){
    throw new Error('SUPABASE_ANON_KEY is required')
}

if(!process.env.SUPABASE_SERVICE_ROLE_KEY){
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required')
}

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
        auth:{
            autoRefreshToken: true,
            persistSession: false,
            detectSessionInUrl: false
        }
    }
)

const supabaseAdmin= createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth:{
            autoRefreshToken:false,
            persistSession: false
        }
    }
)

const testConnection = async () => {
    try{
        const {data,error} = await superbase.from('users').select('count').limit(1)
        if(error & error.code !== 'PGRST116'){
            console.error('Supabase connection test failed:', error)
            return false
        }
        console.log('✓ Supabase connection successful')
        return true
    } catch(error){
        console.error('Supabase connection test error:',error)
        return false
    }
}

module.exports ={
    supabase,
    supabaseAdmin,
    testConnection
}