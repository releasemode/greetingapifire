const file = require('fs');
const product = function () { }

product.create = (req, result) => {
    const requestData = req
    new Promise((resolve, reject) => {
        file.readFile('database/table_product.json', 'utf-8', (err, data) => {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(data))
        })
    }).then((resolvedData) => {
        let productData = resolvedData;

        if (!productData.length) {  // no data in table
            requestData["id"] = 1;
            requestData["code"] = Math.floor(100000 + Math.random() * 900000);
            productData.push(requestData);
            rewriteFile([requestData], (status) => {
                if (status)
                    result({ success: true, message: "Inserted successfully" });
                else
                    result({ success: false, message: "Error in inserting" })
            })
        } else {    // already data exist in table
            let nextId = getMax(productData) + 1;
            requestData["id"] = nextId;
            requestData["code"] = Math.floor(100000 + Math.random() * 900000);
            productData.push(requestData);
            rewriteFile(productData, (status) => {
                if (status)
                    result({ success: true, message: "Inserted successfully" });
                else
                    result({ success: false, message: "Error in inserting" })
            })
        }

    }).catch((rejectedData) => {
        result({ success: false, message: 'File path not exist' })
    })
}

product.getAll = (req, result) => {
    new Promise((resolve, reject) => {
        file.readFile('database/table_product.json', 'utf-8', (err, data) => {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(data))
        })
    }).then((resolvedData) => {
        let productData = resolvedData;
        result(resolvedData)
    }).catch((rejectedData) => {
        result({ success: false, message: 'File path not exist' })
    })
}

product.getById = (req, result) => {
    const requestData = req;
    new Promise((resolve, reject) => {
        file.readFile('database/table_product.json', 'utf-8', (err, data) => {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(data))
        })
    }).then((resolvedData) => {
        let productData = resolvedData;
        let choosenData = productData.filter((item) => item.id == requestData.id);
        if (choosenData.length)
            result(choosenData)
        else
            result({ success: false, message: 'No data found' });
    }).catch((rejectedData) => {
        result({ success: false, message: 'File path not exist' })
    })
}

product.deleteById = (req, result) => {
    const requestData = req;
    new Promise((resolve, reject) => {
        file.readFile('database/table_product.json', 'utf-8', (err, data) => {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(data))
        })
    }).then((resolvedData) => {
        let productData = resolvedData;
        let choosenDataIndex = productData.findIndex((item) => item.id == requestData.id);
        productData.splice(choosenDataIndex, 1);
        rewriteFile(productData, (status) => {
            if (status)
                result({ success: true, message: "Deleted successfully" });
            else
                result({ success: false, message: "Error in deleting" })
        })
    }).catch((rejectedData) => {
        result({ success: false, message: 'File path not exist' })
    })
}

product.updateById = (req, result) => {
    const requestData = req;
    new Promise((resolve, reject) => {
        file.readFile('database/table_product.json', 'utf-8', (err, data) => {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(data));
        })
    }).then((resolvedData) => {
        let productData = resolvedData;
        let existingProductIndex = productData.findIndex((item) => item.id == requestData.id);
        let productExist = productData.filter((item) => item.id == requestData.id);
        if (productExist.length) {
            let replaceBy = {
                "fontColor": requestData['fontColor'],
                "fontSize": requestData['fontSize'],
                "fontFamily": requestData['fontFamily'],
                "xAxis": requestData['xAxis'],
                "yAxis": requestData['yAxis'],
                "image": requestData['image'],

                "id": productExist[0]['id'],
                "code": productExist[0]['code']
            };
            productData.splice(existingProductIndex, 1, replaceBy);
            rewriteFile(productData, (status) => {
                if (status)
                    result({ success: true, message: "Updated successfully" });
                else
                    result({ success: false, message: "Error in updating" });
            })
        } else {
            result({ success: false, message: 'No data found' });
        }
    }).catch((rejectedData) => {
        result({ success: false, message: 'File path not exist' });
    })
}


const rewriteFile = (data, callback) => {
    const stringifyData = JSON.stringify(data);
    new Promise((resolve, reject) => {
        file.writeFile("database/table_product.json", stringifyData, function (err) {
            if (err) {
                reject()
            } else {
                resolve()
            }
        });
    }).then(() => {
        callback(true);
    }).catch(() => {
        callback(false);
    })
}

const getMax = (arg) => {
    let productData = arg
    let temp = productData.reduce((acc, curr) => {
        if (curr.id > acc)
            return acc = curr.id
    }, 0)
    return temp
}

module.exports = product