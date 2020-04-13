import * as express from 'express';
import jwt from 'jsonwebtoken';

import * as user from '../controllers/UserController';
import * as userAuth from '../controllers/AuthController';
const authRouter = express.Router();
authRouter.get('/reset/:reset_token', (req: express.Request, res: express.Response) => {
    res.json({token: req.params.reset_token});
});

authRouter.post('/reset/:reset_token', (req: express.Request, res: express.Response) => {

});

authRouter.get('/me', async (req: express.Request, res: express.Response) => {
    
    let me = {
        
        admin: false
    };
    
    if (req.cookies["jwt"] !== undefined) { //Change this to check if the jwt is expired.

        me.admin = await userAuth.isAdmin(req, res);//await  userAuth.isAdmin(req, res);
        res.status(200).json(me);
    } else {
        res.status(401).json({message: "Not signed in."});
    }
});

authRouter.get('/perms', (req: express.Request, res: express.Response) => {
    let token = req.cookies['jwt'];
    //isAdmin()

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({error: "Invalid token"});
        console.log(decoded);
        res.send(user.isAdmin(decoded.name));
    });
  //  console.log(jwt.decode(token));
});

export default authRouter;