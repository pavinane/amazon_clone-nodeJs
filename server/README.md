# Create folder
  
    config ,controller,middleware, models,routes
    

# create install  plugins

 - npm i mongoose dotenv express bcrypt body-parser 

# models
 - userModels: !mdbg generate user model schema 

 - secreate Key - openssl rand -hex 32

# create CRUD method
 - create Register and login 
 - create token 
 - get user by id , (put , delete ) method implement CRUD opentaion   
 - create refresh token
 - add logout api and make delete the refresh token