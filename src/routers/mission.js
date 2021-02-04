const express = require('express')
const Mission = require('../models/mission')
const auth = require('../middleware/auth')
const router = new express.Router()

// Make a new mission
router.post('/missions',auth, async (req, res) => {
    const mission = new Mission({
        ...req.body,
        author: req.user._id
    })

    try {
        await mission.save()
        res.status(201).send(mission)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /missions?completedCount=17
// GET /missions?author=_id
// GET /missions?sortBy=createdAt:desc
router.get('/missions', async (req, res) => {
    const match = {}
    const sort = {}
    
    console.log(req.query)

    
    if (req.query.completedCount) {
        match.completedCount = req.query.completedCount
    }

    if (req.query.author) {
        match.author = req.query.author
    }
    
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'descen' ? -1 : 1
    }

    console.log(match)
    

    try {
        
        // OLD ONE THAT WORKS
        // const missions = await Mission.find({author:'6009b10fb7b7e624c0fd060b', completedCount: 17})
        const missions = await Mission.find(match).sort(sort)
        res.send(missions)
        
        
        
        // await req.user.populate({
        //     path: 'userMissions',
        //     match,
            // options: {
                // limit: parseInt(req.query.limit),
                // skip: parseInt(req.query.skip),
                // sort: {
                //     completed: 1
                // }
            // }
        // }).execPopulate()
        // res.send(req.user.userMissions)
        



    } catch (e) {
        res.status(500).send()
    }
})

router.get('/missions/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const mission = await Mission.findById(_id)

        if (!mission) {
            return res.status(404).send()
        }

        res.send(mission)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/missions/:id',auth,  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['missionName', 'avgCompletionTime','completedCount', 'missionDetails', 'badges', 'missionEndorsements']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const mission = await Mission.findOne({ _id: req.params.id, author: req.user._id})

        if (!mission) {
            return res.status(404).send()
        }

        updates.forEach((update) => mission[update] = req.body[update])
        await mission.save()
        res.send(mission)
    } catch (e) {
        res.status(400).send(e)
    } 
})

router.delete('/missions/:id', auth, async (req, res) => {
    try {
        const mission = await Mission.findOneAndDelete({ _id: req.params.id, author: req.user._id })

        if (!mission) {
            res.status(404).send()
        }

        res.send(mission)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router