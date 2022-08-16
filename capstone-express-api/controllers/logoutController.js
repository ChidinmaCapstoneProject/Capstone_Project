const User = require('../model/User')

const handleLogout = async (req, res) =>{
    //On client , also delete the accessToken

    const cookies= req.cookies;
    if (!cookies ?. jwt) {
        return (
            res.sendStatus(204) //No content

        );

    }
    const refreshToken = cookies.jwt;

    //Is the refreshToken in the db
    const foundUser =  await User.findOne({refreshToken: refreshToken}).exec();
    if(!foundUser){
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true});
        res.sendStatus(204);

        return;
    }
    //Delete refreshToken in db
    foundUser.refreshToken='';
    const result = await foundUser.save();


    res.clearCookie('jwt', {httpOnly: true,  sameSite: 'none', secure: true });
    res.sendStatus(204);
}

module.exports ={ handleLogout }
