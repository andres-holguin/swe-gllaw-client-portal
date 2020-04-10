import * as express from "express"
import * as nodemailer from "nodemailer";
import mailgun from "nodemailer-mailgun-transport";
import Mail from "nodemailer/lib/mailer";
import * as user from "../controllers/UserController"
import crypto from 'crypto';
//import jwt from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
interface message { //For when the user emails someone.
    from: string,
    to: string,
    content: string,
}

const mailRouter = express.Router();


const mailgun_auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.FROM_EMAIL
    }
}
const nodemailergun = nodemailer.createTransport(mailgun(mailgun_auth));

mailRouter.post('/reset_pass', async (req: express.Request, res: express.Response) => {
    req.body.email;

    const token = await user.reset_password(req, res);
    console.log(token);
    nodemailergun.sendMail({
        from: 'no_reply@sandboxefd613a7ef1f487c9303aacbf3ca8e3d.mailgun.org',
        to: req.body.email,
        subject: 'Password Reset Request',
        text: `Password Reset Link. localhost:3001/reset/${token}`
    });

   // res.json({email:  req.body.email});
});

mailRouter.post('/submit/', (req: express.Request, res: express.Response) => {
  //  let options: 
    let options: Mail.Options = {
        from: 'sylvester@sandboxefd613a7ef1f487c9303aacbf3ca8e3d.mailgun.org',
        to: 'sylvestery@ufl.edu',
        subject: 'Test',
        text: "Nice"
    };
    nodemailergun.sendMail(options, (err, msg) => {
        if (err) console.log('Error: ${err}', err);
        console.log('Response: ${msg}');
        res.send(msg);
    })
})


export default mailRouter;
//export default nodemailergun;