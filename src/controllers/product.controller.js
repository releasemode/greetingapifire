const productModule = require('../models/product.model')

exports.create = (req, res) => {
    const requestData = req.body;
    if (Object.entries(requestData).length == 0) {
        res.send({ success: false, message: "Empty param" });
    } else {
        productModule.create(requestData, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    }
}

exports.updateById = (req, res) => {
    const requestData = req.body;
    if (Object.entries(requestData).length == 0) {
        res.send({ success: false, message: "Empty param" });
    } else {
        productModule.updateById(requestData, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    }
}

exports.deleteById = (req, res) => {
    const requestData = req.params;
    if (Object.entries(requestData).length == 0) {
        res.send({ success: false, message: "Empty param" });
    } else {
        productModule.deleteById(requestData, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    }
}

exports.getAll = (req, res) => {
    const requestData = req.params;
    productModule.getAll(requestData, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

}

exports.getById = (req, res) => {
    const requestData = req.params;
    if (Object.entries(requestData).length == 0) {
        res.send({ success: false, message: "Empty param" });
    } else {
        productModule.getById(requestData, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    }
}