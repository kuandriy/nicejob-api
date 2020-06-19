function success(req, res, data){
    return res.status(200).json(data)
}

function error(req, res, data){
    return res.status(500).json(data);
}

module.exports = {
    success: success,
    error: error
}