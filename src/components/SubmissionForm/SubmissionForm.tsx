import React from 'react';
import { useForm } from 'react-hook-form';
import './SubmissionForm.css'

export default function SubmissionForm() {
const { register, handleSubmit, errors, reset } = useForm();
const onSubmit = (event:any, data: any) => {
    console.log(data)
    reset();
  };
  
  return (
    <form className = "submission-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className = "form-header">Create User</h2>
        <input 
          style={{ display: 'block', margin: 20 }}
          type="text" 
          placeholder="First name" 
          name="First"
          id="First"
          ref={register({required: true, maxLength: 20})} 
        />
      {errors.First && <p>This field is required</p>}
      
      <input
        style={{ display: 'block', margin: 20 }} 
        type="text" 
        placeholder="Last name" 
        name="Last" 
        ref={register({required: true, maxLength: 20})} 
      />
      {errors.Last && <p>This field is required</p>}
      
      <input
        style={{ display: 'block', margin: 20 }} 
        type="text" 
        placeholder="Email" 
        name="Email" 
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
        name="Username" 
        ref={register({required: "This field is required"})} 
      />
      {errors.Username && <p>This field is required</p>}
      
      <input type="submit" />
    </form>
  );
}
