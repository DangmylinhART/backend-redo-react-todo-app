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
            res.json({
                message: "User created",
            });
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

    // login: async (req, res) => {
    //     let email = req.body.email;
    //     let userIncomingPw = req.body.password;
    //     let foundUser = await findUserEmail(email);

    //     console.log('line47')
    //     console.log(foundUser)
    //     let comparedPassword = await bcrypt.compare(userIncomingPw, foundUser.password)

    //     if (!comparedPassword) {
    //         console.log('line 53')
    //       return res.status(401).send('Please check your email or password')
    //     } else {
    //         console.log('login successful')
    //       req.session.user = foundUser
    //       console.log(req.session)
    //       res.json({
    //         userIncomingPw,
    //         foundUser: foundUser.password,
    //         comparedPassword
    //       })
    //     }
    // }
    login: async (req, res) => {
        try {
            console.log(req.body)
            let foundEmail = await User.findOne({ email: req.body.email })
            if (!foundEmail) {
                throw {status: 404, message: "No user found, please try again or register!"};
                 // when throw an object/error, code jump to catch immediately
                 // Notice: throw Error only accept a string: throw new Error('only string accept in this parenthesis, object will not working in here")
            } else {
                let comparedPassword = await bcrypt.compare(req.body.password, foundEmail.password)
                if (!comparedPassword) {
                    throw {message: "please check your password", status: 401}
                }
                const token = jwt.sign({email: foundEmail.email, _id: foundEmail._id}, "thisIsASecretCode", {expiresIn: '1h'})
                console.log(token)
                res.json({
                    jwtToken: token
                })
            }


            // res.send(foundEmail)
        }
        catch (e) {
            if (e.status === 400) {
                res.status(e.status).json({message: e.message})
            } else if (e.status === 401) {
                res.status(e.status).json({message: e.message})
            } else {
                res.status(500).json({message: e.message})
            }
            
        }
    }

}


