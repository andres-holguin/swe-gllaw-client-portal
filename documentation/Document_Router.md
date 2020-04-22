

# Document Upload

## /api/document

## `POST - /upload`

* Required Admin Access

* Send the file as binary data to this endpoint

* The file will be stored in mongodbs gridfs store.

Input:

* Not json this time input will be multi part form data with keys

* doc - The File itself

* CaseID - The id of the case that specific file should belong

Output

* JSON body detailing either success or error.

    


## `GET - /:docid/`
* The server will reply with a single document
* Document Ids should be stored in the cases allowing you to grab each one by one.


Output

* The document in the body
* Or json error that document was not found.