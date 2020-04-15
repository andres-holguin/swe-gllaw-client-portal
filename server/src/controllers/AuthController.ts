import User from '../models/USERModel';

import jwt from 'jsonwebtoken';

interface me {
    id: string,
    admin: boolean
}

export const isAdmin = async (req, res): Promise<boolean> => { //Replace this function
    let isAdmin = new Promise<boolean>((resolve, reject) => {
        let token = req.cookies['jwt'];
        let u = {

            admin: false,
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
         if(err) throw reject(err);
         await User.findOne({username: decoded.name}, (err, u) => {
             if (err) throw err;
             if (!u) {
                 res.status(404).json({error: "No account with that name exist."});
                 resolve(false);
             } else {
                 if(u.toObject().isAdmin) {
                   console.log("is admin.");
                   resolve(true);
                } else {
                    resolve(false);
                }
             }
         });
         });
    });

    return isAdmin;
}