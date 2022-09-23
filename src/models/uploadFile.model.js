const uploadFile = function () { };

uploadFile.productImage = (req, result) => {
    let file = req.file;
    let extention = file.mimetype.split('/')[1];
    let fileName = "prodImg" + new Date().getTime() + '.' + extention;

    file.mv('uploads/' + fileName , function (err) {
        if (err) {
            result({
                success: false,
                message: err
            });
        }
        else {
            result({
                success: true,
                image: fileName,
                message: "File uploaded!"
            });
        }
    })
}


module.exports = uploadFile;