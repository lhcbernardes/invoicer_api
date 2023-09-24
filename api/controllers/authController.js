const hello = async (req, res) => {
    res.json({
        message: "Hello, World!"
    });
};

module.exports = {
    hello
}