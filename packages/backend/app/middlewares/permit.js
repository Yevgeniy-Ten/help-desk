const permit = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(403).send("Не аунтефицирован!")
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).send("Запрещено!")
        }
        next()
    }
}

module.exports = permit
