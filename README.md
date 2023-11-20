## Getting Started

To start with the Notes App we will need to follow the below steps 

## Steps
- Step 1 : Clone this Repository
- Step 2 : Lets start first by installing the required packages for this project . To make it easier we have a magical command that does this job for us . Here you go
  ```bash
  npm install
  ```
- Step 3 : Once the packages are installed , you will need to check my work so I can help you with that , Run the specially crafted command for this project 
 ```bash
  npm run dev
  ```
- Step 4 : Start Docker ( the life saviour thing ) and run the below command to make sure you have the DB connected to the Backend of this application
 ```bash
  docker run -d -p 27015:27017 --name my-mongo-container mongo
  ```
- Step 5 : Now, now the most intresting part to see my code in action.. to do that you need to clone the BE Repo 😆
```bash
git clone https://github.com/adiyaar24/Notes_BE.git
```
- Step 6 : Follow Step 2 again by navigating to the directory 
- Step 7 : Run this unique command to see everything started 
```bash
PORT=3001 npm start
```

## Voila Everything is Up and Running 😎😎

## Know About the DB Structure

Notes DB Strucuture
<br>
<img width="1051" alt="Screenshot 2023-11-20 at 6 24 27 PM" src="https://github.com/adiyaar24/notes_FE/assets/122971747/61f05029-fb65-4eda-be37-e5c28eaaa547">
<br>
<br>

Users DB Structure
<br>
<img width="1005" alt="Screenshot 2023-11-20 at 6 24 41 PM" src="https://github.com/adiyaar24/notes_FE/assets/122971747/d2273c4b-e3fb-43e6-bf38-c523a2d3041d">
<br>
<br>
<br>

## Folder Struture

- src
  - components
    - Reusable React components
  - context
    - The context directory is where you can place React context providers. Context provides a way to share values, such as state or functions, across the component tree without having to pass them through props manually.
  - pages
    - Next.js auto-generated routes
  - services
    - This directory is used to store services or utility functions that interact with external APIs, handle data fetching, or perform other business logic. It helps keep your code organized and separates concerns.
  - styles
    - Global styles, styling variables, utility classes
  - types
    - TypeScript type definitions.This helps with static type checking and enhances code readability.





