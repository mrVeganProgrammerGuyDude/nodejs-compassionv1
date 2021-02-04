const mongoose = require('mongoose')

const missionSchema = new mongoose.Schema({
    missionName: { // Needs to match vue
        type: String,
        required: true,
        trim: true
    },
    missionDetails: {
        type: String,
        required: true,
        trim: true
    },
    avgCompletionTime: {
        type: Number,
        required: false,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Notice how this exactly matches the model name that we are going to connect it to
    },
    badges: {
        type: [],
        required: false,
        trim: true
    },
    missionEndorsements: {
        type: [],
        required: false,
        trim: true
    },
    completedCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Mission = mongoose.model('Mission', missionSchema)

module.exports = Mission