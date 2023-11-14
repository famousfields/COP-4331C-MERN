const Bcrypt = require('bcyrpt')
const User = require("./models/userModel")

const login = (req, res, next) => {
    User.findOne({ email:req.body.email } , (err, user) => {
        // report error
        if(err) {
            return res.status(500).send({msg: err.message});
        }

        else if(!user) {
            return res.status(401).send({msg:'User email "' + req.body.email + '" not found'});
        }
        // compare password hashes
        else if( !Bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({msg: 'Wrong Password!'});
        }
        //check if verified
        else if(!user.isVerified) {
            return res.status(401).send({msg:'Email not yet verified! Check your spam folder for link'});
        }

        else {
            return res.status(200).send('Successful log in!');
            //Probably need some other stuff here to tell server that user is authenticated.
        }
    })
}

module.exports = login;