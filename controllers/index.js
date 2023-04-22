const name = 'Yang Hou';
const awesomeFunction = (req, res, next) => {
    res.json(name);
};

module.exports = { awesomeFunction };