const User = require('../model/User')

const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { fName, email, user, pwd, classification } = req.body;
    if (!user || !pwd || !fName || !email || !classification) {
        return (
            res.status(400).json({ 'message': 'Full Name, Email, Username , classification and Password are required.' })
        );
    }
    const allClassification= await User.find({classification: classification});
    console.log('allClassification', allClassification)

    //check for duplicate usernames in the db
    const duplicate1= allClassification.find((n) =>{
        return n.username === user;
    } )
    const duplicate2= allClassification.find((n) =>{
        return n.email === email;
    } )
    if (duplicate1?.username === user || duplicate2?.email === email ) {
        return res.sendStatus(409); //confilct status
    }
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //Create and store the new user
        const result = await User.create( {
            'fullname':fName,
            'email': email,
            'username': user,
            'password': hashedPwd,
            'classification': classification
        });
        console.log(result);

        res.status(201).json({ 'success': `New' ${classification} ${fName} created` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const getAllUsers = async(req, res) =>{
    const users = await User.find();
    if(!users) return res.status(204).json({'message': 'No Users Found'});
    res.json(users)
}
module.exports = {handleNewUser, getAllUsers}
