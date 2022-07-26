const User = require('../model/User')

const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { fName, email, user, pwd, classification } = req.body;
    if (!user || !pwd || !fName || !email || !classification) {
        return (
            res.status(400).json({ 'message': 'Full Name, Email, Username , classification and Password are required.' })
        );
    }
    const duplicate = User.find({classification: classification, username: user, email: email})
    if (duplicate) {
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
