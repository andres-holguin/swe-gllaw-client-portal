import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './SubmissionForm.css'
export default function SubmissionForm(props) {
const { register, handleSubmit, errors, reset, getValues } = useForm();
const onSubmit = (event:any, data: any) => {
    console.log(getValues());
    const newUser = getValues();
    console.log(newUser)
    registerUser(newUser);
    props.addProject(newUser);
    reset();
  };

  const registerUser = async (newUser) => {
      await axios.post('/api/case/new', {
          "name": newUser.project,
          "description":" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque non quam quis porta. Morbi ultrices, dui vel tempus facilisis, odio felis facilisis ligula, sed pretium ligula est a eros. Duis non sagittis nisl, sed cursus quam. Aenean eu sodales sapien, ut imperdiet tortor. Integer urna justo, lacinia vitae eros eget, blandit ornare dolor. Donec porttitor porta tincidunt. Donec iaculis maximus justo, eu tempus arcu. Aliquam nunc metus, fringilla tincidunt felis non, convallis scelerisque mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ",
          "user": {
              "firstname": newUser.firstname,
              "lastname": newUser.lastname
            }
        });
    window.location.reload(true);
/*      
      if (res.data.accessToken != undefined) {
         // props.userHasAuthenticated(true);
      } else {
          console.log("Password incorrect");
      } */
    }
  
  
  return (
    <form className="submission-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-header">Create Project</h2>
        <input 
          style={{ display: 'block', margin: 20 }}
          type="text" 
          placeholder="First name" 
          name="firstname"
          id="First"
          className="form-input"
          ref={register({required: true, maxLength: 20})} 
        />
      {errors.First && <p>This field is required</p>}
      
      <input
        style={{ display: 'block', margin: 20 }} 
        type="text" 
        placeholder="Last name" 
        name="lastname" 
        className="form-input"
        ref={register({required: true, maxLength: 20})} 
      />
      {errors.Last && <p>This field is required</p>}
      
      <input
        style={{ display: 'block', margin: 20 }} 
        type="text" 
        placeholder="Email" 
        name="email" 
        className="form-input"
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
        placeholder="Project Name" 
        name="project" 
        className="form-input"
        ref={register({required: "This field is required"})} 
      />
      {errors.Username && <p>This field is required</p>}
      
      <input type="submit" className="form-submit"/>
    </form>
  );
}
