
export const authorization = (req,res, next)=>{

    const role = req.user.role;
    if(role == 'admin' ){
        next();
    }
    else{
        return res.status(403).json({ error: 'Unauthorized access' });
    }
}
