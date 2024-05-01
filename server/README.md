# Create folder
  
    config ,controller,middleware, models,routes
    

# create install  plugins

 - npm i mongoose dotenv express bcrypt body-parser cookie-parser dotenv express-async-handler morgan slugify

# models
 - userModels: !mdbg generate user model schema 

 - secreate Key - openssl rand -hex 32

# create CRUD method
 - create Register and login 
 - create token 
 - get user by id , (put , delete ) method implement CRUD opentaion   
 - create refresh token
 - add logout api and make delete the refresh token

 <!-- Products -->
- create products and make it crud thing implemented using  product models

# getting product by price 

- gte = Greater Than Equal -  http://localhost:7000/api/product/getallproduct?price[gte]=700
- gt = Greater Than  
- lte = Lesser Than Equal
- lt = Lesser Than

1. create product category
2. create brand category
3. create blog category
4. add wishlist on product