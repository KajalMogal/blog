# Blog Webapp

![blog](https://github.com/user-attachments/assets/d3556c0e-a2f8-4a61-804e-91799ab524c9)

A fullstack express app, where user can register with username, email and password, and add, edit delete their blogs and other user can comment on it. Hashing is used to store users password in database.



## Tech Stack
- `Node.js` : Javascript runtime for building the app server.
- `Express.js` : Web framework for building RESTFul APIs.
- `MongoDB` : Database to store user data.
- `EJS` : Templating engine for rendering dynamic HTML views.
- `bcrypt` : Hashing and securing user password.
- `CSS` : Styling the application frontend.
  
  

## Features
- Authentication : User can register, login, logout.
- CRUD Operations : User can create, read, update and delete blog.
- Hashing : Passwords are hashed before storing in database.
- Dynamic views : Views are rendered dynamically using EJS templates.
- Responsive design : Basic frontend layout styled with css.

  

## Installation
1. Clone the repository to your local machine:
   ```bash
      git clone https://github.com/KajalMogal/blog-webapp.git
   ```

2. Install dependencies using npm:
   ```bash
      npm install
   ```

3. Create a .env file in the root directory of the project to store environment variables.
   ```bash
      MONGODB_URI=mongodb://localhost:27017/app
      SECRET_KEY=secret-key
      CLOUDINARY_CLOUD_NAME=cloud-name
      CLOUDINARY_KEY=cloudinary-key
      CLOUDINARY_SECRET=cloudinary-secret
   ```

4. Start the app:
   ```bash
      npm start
   ```
          
      

  

