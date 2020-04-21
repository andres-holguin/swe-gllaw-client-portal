Mail Routes

## /api/mail

## `POST - /new_user`

* Used whenever a user register

Input:

* user Email

Output:

* Success or error message

    

## `POST - /forgot_pass`

Used whenever the forgot password form is used. 

The user will be sent an email including a reset token that can be used to reset their password.

Input:
* user Email
```json
{
    "email": "jsmith@example.com"
}
```
Output:

* Success or error message



