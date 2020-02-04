const Dev = require('../models/dev')

module.exports = {
    async store(req, res) {
        const { user } = req.headers
        const { devId } = req.params

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        console.log(loggedDev)
        if (!loggedDev) return res.status(400).json({ error: 'Logged user not exist' })

        if (!targetDev) return res.status(400).json({ error: 'Target user not exist' })

        loggedDev.dislikes.push(targetDev._id)
        await loggedDev.save();
        
        return res.json(loggedDev)
    }
}