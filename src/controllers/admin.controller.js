const adminModel = require('../models/admin.model');

exports.create = (req, res) => {
    // console.log('create')
    res.send('create');
}

exports.update = (req, res) => {
    // console.log('updateAdmin')
    res.send('updateAdmin');
}

exports.deleteById = (req, res) => {
    // console.log('deleteAdminById')
    res.send('deleteAdminById');
}

exports.getAll = (req, res) => {
    // console.log('get all admin')
    res.send('get all admin');
}

exports.getById = (req, res) => {
    const userReqData = req.params
    if (Object.keys(userReqData).length == 0) {
        res.status(400).send({ success: false, message: "Empty request" })
    } else {
        adminModel.getById(userReqData, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })
    }
}