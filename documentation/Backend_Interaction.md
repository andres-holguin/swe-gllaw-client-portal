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

## `POST - /register`

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

## `POST - /login`

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

## `POST - /logout`

Server side removes client cookies.

Input: N/A

Output

* Json Message that logout was successful.

## `GET - /:id/info`

User first name last name and email are returned from id.

Input:

* ID as URL Parameter

Output:

* Firstname
* Lastname
* Email

```json
{
    "firstname": "John",
    "lastname": "Smith",
    "email": "jsmith@example.com"
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

## `/cases`

Gives all current user cases. Requires user to be logged in to use.

Output:

* A case or many cases, output entirely depended on user

  ```json
      "cases": [
          {
              "id": "5e9b692d2b4d838dd5ffcc52",
              "name": "Test Case",
              "description": " New Case",
              "progress": 2,
              "active": true,
              "documents": [
                  {
                      "_id": "5e9de9d736412758bf90ec11",
                      "Name": "CEN 3031 - Syllabus.pdf",
                      "fileID": "5e9de9d636412758bf90ec0f"
                  },
                  {
                      "_id": "5e9dea4a5ce4b000234cf8d7",
                      "Name": "Bootcamp 3 Sequence.pdf",
                      "fileID": "5e9dea4a5ce4b000234cf8d5"
                  },
                  {
                      "_id": "5e9df373dc74460023c99159",
                      "Name": "SE Project Slides.pdf",
                      "fileID": "5e9df373dc74460023c99157"
                  },
                  {
                      "_id": "5e9dfd4adc74460023c9916d",
                      "Name": "Sprint 2 Retrospective.pdf",
                      "fileID": "5e9dfd4adc74460023c9916b"
                  }
              ]
          }
          ]
  ```

  

## `/me`

Output is entirely based on jwt in cookie and whether it exist or is valid
 Expected Input:

  * N/A

Expected Output:
Status Codes
200 - JWT exist and is valid

403 - JWT either is no longer valid or does not exist.