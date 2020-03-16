import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './SubmissionForm.css'
export default function SubmissionForm() {
const { register, handleSubmit, errors, reset, getValues } = useForm();
const onSubmit = (event:any, data: any) => {
    console.log(getValues());
    const newUser = getValues();
    console.log(newUser)
    registerUser(newUser);
  };

  const registerUser = async (newUser) => {
    await axios.post('/api/user/register', {
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
      email: newUser.email
    }).then(res => {
      console.log(res.data);
      console.log(res.data);
/*
      if (res.data.accessToken != undefined) {
         // props.userHasAuthenticated(true);
      } else {
          console.log("Password incorrect");
      } */
  });
  }
  
  return (
    <form className = "submission-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className = "form-header">Create User</h2>
        <input 
          style={{ display: 'block', margin: 20 }}
          type="text" 
          placeholder="First name" 
          name="firstname"
          id="First"
          ref={register({required: true, maxLength: 20})} 
        />
      {errors.First && <p>This field is required</p>}
      
      <input
        style={{ display: 'block', margin: 20 }} 
        type="text" 
        placeholder="Last name" 
        name="lastname" 
        ref={register({required: true, maxLength: 20})} 
      />
      {errors.Last && <p>This field is required</p>}
      
      <input
        style={{ display: 'block', margin: 20 }} 
        type="text" 
        placeholder="Email" 
        name="email" 
        ref={
          register({
            required: "This field is required", 
            pattern: {
              value: /^\S+@\S+$/i, 
              message: "invalid email address"
            }
          })
        } 
      />
      {errors.Email && <p>Please enter a valid email address</p>}
      
      <input
        style={{ display: 'block', margin: 20 }} 
        type="text" 
        placeholder="Username" 
        name="username" 
        ref={register({required: "This field is required"})} 
      />
      {errors.Username && <p>This field is required</p>}
      
      <input type="submit" />
    </form>
  );
}
