/* Dependencies */
import User from '../models/USERModel';

export interface UserRequest {
    email: String,
    userName: String,
    password: String,
}

/* Create a listing */
export const create = async (req, res) => {
    let err:any = {};
    let user_req: UserRequest = req.body.u_req;
    console.log(user_req);
    User.findOne({username: user_req.userName}).then(user => {
        if (user){
            console.log("User already exisit");
            err.user = "User already exists"; //TODO send back a response.
        } else {
            User.create({ 
                username: user_req.userName,
                email: user_req.email,
                password: user_req.password,
                isAdmin: false,
            }).then( (d)  => {
                d.save();
                            console.log("Saved");
            });
        }
    });
}

/* Show the current listing */
export const read = (req, res) => {
    User.findOne({username: req.body.u_req.userName}).then(user => {
        if (!user) {
            console.log("User does not exist");
            //res.send("User does not exist");
        } else {
            console.log("User exists");

        }

    })
};

/* Update a listing*/
export const update = (req, res) => {
/*   User.findOneAndUpdate({userName: req.user.UserName}, (err, result) => {
       if (err) throw err;
       console.log(update)
   } */
  // User.findOneAndUpdate({userName: req.user_req.userName}).
};

/* Delete a listing */
export const remove = (req, res) => {
    User.findOneAndDelete({userName: req.user.userName}, (err, result) => {
        if (err) throw err;
        if (!result) {
            console.log("No user by that name exist.")
        }
        
    });
};

/* Retreive all the directory listings*/
export const list = (req, res) => {
    User.find({},function(err,data){
        if(err) throw err;
        res.send(data);
   }).sort({code : 1});
};