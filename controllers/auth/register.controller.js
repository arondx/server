const User = require('../../model/User')
const bcrypt = require('bcrypt')
const { ROLES_LIST }  = require('../../config/roles_list')

const handleNewUser = async (req, res, next) => {
    
    const { user, pwd } = req.body

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const duplicate = await User.findOne({ username: user }).exec()

    if (duplicate) return res.status(409).json({ 'message': 'Username already exists.' })

    try {
        
        const hashedPwd = await bcrypt.hash(pwd, 10)
        const newUser = User.create({
            "username": user,
            "password": hashedPwd,
            "roles": {
                "User": ROLES_LIST.User
            }
        })
        
        res.status(201).json({'success': `New user ${user} created.`})
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports ={ handleNewUser }