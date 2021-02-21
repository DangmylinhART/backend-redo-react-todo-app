const bcrypt = require("bcryptjs");
const User = require("./User");
const jwt = require('jsonwebtoken')


module.exports = {
    createUser: async (req, res) => {
        console.log(req.body);
        try {
            let genSalt = await bcrypt.genSalt(12);
            let hashedPassword = await bcrypt.hash(req.body.password, genSalt);
            let createdUser = new User({
                email: req.body.email,
                password: hashedPassword,
            });
            await createdUser.save();
            const token = jwt.sign({ email: req.body.email, password: hashedPassword }, "thisIsASecretCode", { expiresIn: '1h' })
            console.log('create user token', token)
            res.json({
                jwtToken: token,
                message: "User created",
            })
            // res.json({
            //     message: "User created",
            // });
        } catch (e) {
            console.log('code is below');
            console.log(e.code);
            console.log(e.message);

            if (e.code === 11000) {
                res.status(409).json({
                    message: "Email is duplicate"
                })
            } else {
                res.status(500).json({
                    message: "Something went wrong"
                })
            }

            res.status(500).json({
                message: "Something went wrong",
            });
        }
    },

    login: async (req, res) => {
        try {
            console.log(req.body)
            let foundEmail = await User.findOne({ email: req.body.email })
            if (!foundEmail) {
                throw { status: 404, message: "No user found, please try again or register!" };
            } else {
                let comparedPassword = await bcrypt.compare(req.body.password, foundEmail.password)
                if (!comparedPassword) {
                    throw { message: "please check your password", status: 401 }
                }
                const token = jwt.sign({ email: foundEmail.email, _id: foundEmail._id }, "thisIsASecretCode", { expiresIn: '1h' })
                console.log(token)
                res.json({
                    jwtToken: token
                })
            }
        }
        catch (e) {
            if (e.status === 400) {
                res.status(e.status).json({ message: e.message })
            } else if (e.status === 401) {
                res.status(e.status).json({ message: e.message })
            } else {
                res.status(500).json({ message: e.message })
            }

        }
    }

}


