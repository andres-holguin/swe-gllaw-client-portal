# Backend APIs

This guide will list some of the backend APIs that can be used to connect the front-end to the back-end

## `/Calendar`

Parameters:

- id

Requests:

- Get
- Post
- Delete

Description: Used to create, read, or delete calendar data in the database. The calendar object will be specified by the id parameter.

## `/Selector`

Parameters:

- id

Requests:

- Get
- Post

Description: Used to create user accounts or obtain public user details. The user in particular is determined by the user id.

# User Router - /api/user

## `/register`

Expected Input:

* User name

* Password

* Name

* Email

  ```json
  {
      "username": "jsmith",
      "password": "hunter2",
      "firstname": "John",
      "lastname": "Smith",
      "email": "jsmith@example.com"
  }
  ```

Expected Output: 

## `/login`

User 

Expected Input:

 * Username

 * Password

   ```json
   {
       "username": "jsmith",
       "password": "hunter2"
   }
   ```

## `/:id/change_password`

In this case id is the mongodb user id

The user password is changed to a new password if they correctly entered their old password.

Expected Input

* Old password

* New password

  ```json
  {
      "oldpassword": "hunter2",
      "newpassword": "hunter3"
  }
  ```

## `/me`

Output is entirely based on jwt in cookie and whether it exist or is valid
 Expected Input:
  * N/A

Expected Output:
Status Codes
200 - JWT exist and is valid

403 - JWT either is no longer valid or does not exist.

