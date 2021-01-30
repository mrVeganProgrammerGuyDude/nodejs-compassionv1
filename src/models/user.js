const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"')
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a postive number')
                }
            }
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
    }, {
        timestamps: true
    }
)

// This is vid 114. It goes to the Mission model and finds all the missions whose author id matches the user's _id value and stores all the results in the array userMissions.
userSchema.virtual('userMissions', { 
    ref: 'Mission', // Notice how this exactly matches the model name that we are going to connect it to 
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.toJSON = function () { // This is in video 112
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisasecret') // This is what makes the token. A token is a hashed output of the user ID and the secret.

    user.tokens = user.tokens.concat({ token: token }) // Concat adds { token } to the tokens array
    await user.save() // This saves the user to the database.

    return token
}

// This creates the findByCredentials function. Vid 105
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}


// This hashes the plain text password
userSchema.pre('save', async function (next) { // This is middleware!! It runs anytime the password is modified.
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User