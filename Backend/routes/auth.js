import express from 'express';
const router = express.Router();
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import user from '../models/user.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

let algorithm = "sha256"



router.get("/get-login", (req, res) => {
    res.send(`
    <form method="POST" action="/api/login">
        <input type="email" placeholder="email" name="email">
        <input type="text" placeholder="password" name="password">
        <input type="submit">Submit</input>
    </form>
    `)
})


router.get("/get-register", (req, res) => {
    res.send(`
    <form method="POST" action="/api/register">
    <input type="text" placeholder="User name" name="username" required>
    <input type="email" placeholder="Email" name="email" required>
    <input type="password" placeholder="Password" name="password" required>
    <input type="password" placeholder="Confirm Password" name="confirmPassword" required>
    <input type="submit" value="Submit">
</form>

    `)
})

router.get("/get-reset", (req, res) => {
    res.send(`
    <form method="POST" action="/api/reset">
    <input type="text" placeholder="User name" name="username" required>
    <input type="email" placeholder="Email" name="email" required>
    <input type="password" placeholder="Password" name="password" required>
    <input type="password" placeholder="Confirm Password" name="confirmPassword" required>
    <input type="submit" value="Submit">
</form>

    `)
})


router.post('/register', async (req, res) => {
    // Perform authentication logic, e.g., validate credentials
    const { password, confirmPassword, username, email } = req.body;

    if (password === confirmPassword) { // Use strict equality operator (===) for comparison
        

        try {
            const digest = crypto.createHash(algorithm).update(password).digest('hex');

            const registerUser = new user({
                username: username,
                email: email,
                password: digest,
            });

            const registeredUser = await registerUser.save();

            const payload = { username: username }
            const token = jwt.sign(payload, process.env.JWT_ACCESS_KEY)
            res.status(200).json({token:token});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(401).send('Both passwords are not the same');
    }
});



router.post('/reset', async (req, res) => {
    const { password, confirmPassword, email } = req.body;
    // Complete this Function for reseting the password of the account
    try {
        const result = await user.findOne({ "email": email });
        if (password == confirmPassword) {
            const digest = crypto.createHash(algorithm).update(password).digest('hex')

            const result = await user.findOneAndUpdate({ "email": email }, { "email": email, "password": digest });
            res.send("Password Updated successfully").status(200)
        }
        else {
            res.status(401).send("Both password are not same")
        }
    }
    catch (e) {
        console.log(e);
        res.send("Not registered yet").redirect("/auth/get-register");
    }

})


router.post('/login', async (req, res) => {
    // Perform authentication logic, e.g., validate credentials
    const { email, password } = req.body;

    console.log(req.body)
    const digest = crypto.createHash(algorithm).update(password).digest('hex')
    const result = await user.findOne({ "email": email });

    try {
        if (String(email) == String(result.email) && String(digest) == String(result.password)) {
            //  Added jwt token in login
            //  Not added in register
            //  Also not added in middleware
            const payload = { username: result.username }
            const token = jwt.sign(payload, process.env.JWT_ACCESS_KEY)
            res.json({token:token}).status(200)
        }

        else {

            res.status(401).json({ message: 'Unauthorized' });
        }
    }
    catch (e) {
        console.log(e);
        res.send("Not registered yet").redirect("/auth/get-register");
    }

});


router.get('/logout', isAuthenticated, (req, res) => {
    // Clear the token cookie

    // res.clearCookie("token")
    res.send("logout successfully")
    res.status(200)
});




export default router;
