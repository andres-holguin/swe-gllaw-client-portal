/* Dependencies */
import mongoose from 'mongoose';
import User from '../models/USERModel.js';


//TODO: DEFINE FUNCTIONS

/* Create a listing */
export const create = async (req, res) => {
    
};

/* Show the current listing */
export const read = (req, res) => {
    
};

/* Update a listing*/
export const update = (req, res) => {
    
};

/* Delete a listing */
export const remove = (req, res) => {
};

/* Retreive all the directory listings*/
export const list = (req, res) => {
    User.find({},function(err,data){
        if(err) throw err;
        res.send(data);
   }).sort({code : 1});
};