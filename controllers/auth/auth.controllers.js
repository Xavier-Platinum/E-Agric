
module.exports = {
    farmersGet: (req, res) => {
        res.send("Register Here");
    },
    farmersPost: (req, res) => {
        const Farmer = {
            // id: farmers.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        // res.json()
        res.send(`new Farmer ${Farmer}`);
        console.log(Farmer);
    }
}