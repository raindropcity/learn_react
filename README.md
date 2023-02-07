# todolist_react
Hi, I'm Ray. My specialized field is real estate investment & management, however, I found some passion in learning programming.  
I had tried using Javascript, HTML, CSS, Node.js, and Express to build a web application.  
Recently, I decided to learn the popular framework "React" by developing this project -- "learn_react".
## Features
This project is a restaurant list built by React, Express, and Node.js.<br>
* All the restaurants included are displayed on the site statically.
* Clicking a specific restaurant's picture could fire the re-render, and display its detailed information.
* Clicking the "heart icon" at the lower right corner of every card could add the specific restaurant to the favorite list.
* Clicking the "Select random Bistro" button could get a restaurant name randomly.
* The searching function is provided at the higher right corner input field to filter the restaurants including the specific words or phrases.
* Users could post the new restaurant to the database by providing some required information at the route "/bistro/recommend".

## Installation
The following instructions will help you to get a copy of the project and all the settings needed to run it on your local machine.
### Prerequisites
* npm
* node v14.17.0
* Mongodb Atlas account
### Clone
Clone this repository to your local machine :<br>
`$ git clone https://github.com/raindropcity/learn_react.git`
### Setup Database
#### 1. Create a Mongodb Atlas account<br>
#### 2. Follow the following path :<br>
`./server/config/mongoose.js`<br>
Find the constant "MONGODB_URI" and change the setting of the cloud database URL to yours
### Setup App
#### 1. Go to the project by typing following instruction on your terminal :<br>
`$ cd learn_react` <br>
#### 2. Install packages :<br>
step1. setup server side packages: `$ npm i`<br>
step2. go to client folder: `$ cd client`<br>
step3. setup client side packages: `$ npm i`<br>
step4. back to root folder: `$ cd ..`<br>
### Launch the server
`$ npm run dev`
### The following message will log on the terminal console when the app launches successfully :
`App is now running on http://localhost:3000`
### Author
Ray Fang