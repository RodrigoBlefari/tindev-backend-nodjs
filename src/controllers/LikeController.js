const Dev = require('../models/dev')

module.exports = {

    async store(req, res) {

        const { user } = req.headers
        const { devId } = req.params
        const { connectedUser } = req

        //console.log( req.io);
        console.log( connectedUser);
        

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if (!loggedDev) return res.status(400).json({ error: 'Logged user not exist' })

        if (!targetDev) return res.status(400).json({ error: 'Target user not exist' })

        if (targetDev.likes.includes(loggedDev._id)) {
            
            const loggedSocket = req.connectedUser[user]
            const taregetSocket = req.connectedUser[devId]

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev)
            }

            if (taregetSocket) {
                req.io.to(taregetSocket).emit('match', loggedDev)
            }
        }

        loggedDev.likes.push(targetDev._id)

        await loggedDev.save()

        return res.json(loggedDev)
    }
}
