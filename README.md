# todolist-node

# clone project
https://github.com/sauravraw/todolist-node.git

# installation
npm install
all dependency file will be downloaded

# how to run
run using --> node app.js
or 
using --> nodemon app.js

# how to check task
open **Postman** 
1. create new collection
2. add request
3. to get all the task
    select **Get** from dropdown and type: http://localhost:3000/todo/tasks
4. to get single blogs by id
    select **Get** from dropdown and type: http://localhost:3000/todo/tasks/1
5. to search by query parameters
    select **Get** from dropdown and type: http://localhost:4000/todo/tasks?(key-tosearch)
    eg: http://localhost:3000/todo/tasks?taskName=sleep
6. to update query select **put** from drop down http://localhost:3000/todo/(id)
open body in postman select raw (radio-button) and json (dropdown)
[{
taskName:" of your choice"
}]
7. to delete task select **delete** from drop down and type http://localhost:3000/todo/tasks/(id)
8. to create task select **put** from drop down http://localhost:3000/todo/
open body in postman select raw (radio-button) and json (dropdown)
[{
taskName:" of your choice"
}]
9. YOu can deleteby passing query parameters 
to delete task select **delete** from drop down and type http://localhost:3000/todo/tasks/(id)
eg: http://localhost:3000/todo/tasks?taskName=sleep


# Open mongo compass
open terminal write--> sudo systemctl start mongod
to check status- systemctl status mongod

open mongo composs 
press connect

# technology used
nodeJS
mongoDB
JavaScript
