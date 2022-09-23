const uploadFileModel = require('../models/uploadFile.model')


exports.productImage = (req, res) => {
    const requestData = req.files
    if (Object.entries(requestData).length == 0) {
        res.send({ success: false, message: "Empty file" });
    } else {
        uploadFileModel.productImage(requestData, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    }
}