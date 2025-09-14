 const Auth =  (req, res, next) => {
    //authentication for admin

    // dummy code as now for auth
    const token = "ABCDEF";
    const Access = token === "ABCDEF" ?1:0;

    if(!Access)
        res.status(403).send('No permission');

        next();
    

}

module.exports= {Auth};