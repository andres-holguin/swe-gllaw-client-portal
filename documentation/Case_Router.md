# Case Router - /api/case

## POST - /new

Creates Active case with 

* Name
* A user can be provided through first and last name but is not re
* Description

example:

```json
{
	"name": "Test Case",
	"description":" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque non quam quis porta. Morbi ultrices, dui vel tempus facilisis, odio felis facilisis ligula, sed pretium ligula est a eros. Duis non sagittis nisl, sed cursus quam. Aenean eu sodales sapien, ut imperdiet tortor. Integer urna justo, lacinia vitae eros eget, blandit ornare dolor. Donec porttitor porta tincidunt. Donec iaculis maximus justo, eu tempus arcu. Aliquam nunc metus, fringilla tincidunt felis non, convallis scelerisque mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. "
}
```

Return 

* Success Message or Error.

## `PUT - /bar/increment`

* Put to endpoint Location

* Admin Access Required

  Output: 

  ​	*  Success Message

## `PUT - /bar/decrement`

* Like for increment all thats required is a put to this location, 
* Admin Access Required

Output: 

​	*  Success Message

## GET - /bar

* Gives back the current progress of the bar.

  Return 

   * Progress
example: 

```json
     {
         "progress": "2"
     }
```

​     

GET - /list

* Will give a list of all active cases in json format admin access required

# User Router - /api/user

## POST - /assigncase
* Requires Admin access user can have a new case assigned to them by including the username and case id. The case id can be gotten from the list function above.

* An example of how this could be done is a button in the case view given from list that sends the
Input:
 * Username

 * CaseID

  example: 

  ```json
  {
  	"username": "jsmith",
  	"case": "5e9648a490bbd77cfca3a907"
  }
  ```

  ```json
  {
      "message": "Successfully added case 5e9648a490bbd77cfca3a907 to     jsmith"
  }
  ```





### `/api/auth/me`

* Will return permissions
* Should be used on page load to determine whether admin option should be drawn.

example 

```json
{
    "admin": true
}
```


```

```