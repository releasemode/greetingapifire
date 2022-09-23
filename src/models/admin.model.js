const file = require('fs');
const admin = function () { };

admin.createAdmin = (req, result) => {

}

admin.getById = (req, result) => {
    let userRequest = req;
    new Promise((resolve, reject) => {
        file.readFile('database/table_admin.json', 'utf8', (err, data) => {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(data));
        })
    }).then((resolvedData) => {
        const data = resolvedData;
        let adminExist = data.filter((item) => item.email === userRequest.email)
        if (adminExist.length)
            result(adminExist);
        else
            result({ success: false, message: "Admin not exist" });
    }).catch((rejectedError) => {
        result({ success: false, message: "File path not exist" })
    });
}

module.exports = admin;