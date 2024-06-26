const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"library",(err,decoded)=>{
            if(decoded){
                console.log(decoded)
                req.body.userID=decoded.userID
                req.body.username=decoded.username
                next()
            }
            else{
                res.send({"error":err})
            }
        })
    }
    else{
        res.send({"msg":"Please Login"})
    }
}
module.exports={
 auth
}