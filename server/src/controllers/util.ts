import jwt from 'jsonwebtoken';
import * as express from 'express';

export const requireAdmin = (req: express.Request, res: express.Response, next) => {
    let token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(500).json({error: "Try again later."})
        if(decoded.role != 'admin' && decoded.role != 'superadmin') {
            console.log(decoded.role);
           return res.status(401).json({error: "You do not have permission to perform this action."});
        }
            return next();

    })
}
