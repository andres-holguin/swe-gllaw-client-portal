import * as express from 'express';

const authRouter = express.Router();

authRouter.get('/reset/:reset_token', (req: express.Request, res: express.Response) => {
    res.json({token: req.params.reset_token});
});


export default authRouter;