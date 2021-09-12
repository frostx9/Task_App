const auth = async(req,res,next)=>{
    console.log('auth is running')
    next()
}

module.exports= auth