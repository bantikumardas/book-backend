const router = require('express').Router();
const registration = require('../models/registration');
const passwordHash = require('password-hash');

router.get('/', async (req, res) => {
    console.log("naindf")
    try {
        const { email, password } = req.query;
        const hashPassword = passwordHash.generate(password);
        //sha1$0b43fe5b$1$0a095ff15e45377fb01d6e322438c741e34ecdce
        console.log(`get request for ${email} and ${hashPassword}`);
        const user = await registration.find({ email: email });

        if (passwordHash.verify(password, user[0].password)) {
            return res.send({ message: user });
        }


        console.log(passwordHash.verify(password, user[0].password));

        return res.status(300).send({ message: "Password or email is incorrect" });

    } catch (err) {
        console.log(err);
        return res.status(300).send({ message: err });
    }
});
module.exports = router;