const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client('38539133620-l1uu1cq7ocpv5e3u4qdn4qt54gdoocuf.apps.googleusercontent.com')

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())


app.post('/api/google-login', async (req, res) => {
    try{
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
        })
    
        res.status(200).json(ticket.getPayload())
    } catch(err){
        console.log(err)
    }
})


app.listen(4001, () => {
console.log(`Server is ready at http://localhost:4001`);
});