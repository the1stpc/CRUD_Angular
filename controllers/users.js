const errorHandler = require('../utils/errorHandler.js')
const User = require('../models/user.js')
const fs = require('fs')

module.exports.getAll = async function (req, res) {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (e) {
        errorHandler(res, e)
    }

}

module.exports.getById = async function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        if (user.imageSrc !== '') {
            await fs.unlinkSync(`${user.imageSrc}`)
        }
        await User.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Пользователь удален!'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        res.status(409).json({
            message: 'Email занят'
        })
    } else {
        const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            phone: req.body.phone,
            birthday: req.body.birthday,
            gender: req.body.gender,
            mailing: req.body.mailing,
            imageSrc: req.file ? req.file.path : ''
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}


module.exports.update = async function (req, res) {
    const updated = {
        email: req.body.email,
        firstName: req.body.firstName,
        phone: req.body.phone,
        birthday: req.body.birthday,
        gender: req.body.gender,
        mailing: req.body.mailing
    }
    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(user)

    } catch (e) {
        errorHandler(res, e)
    }
}