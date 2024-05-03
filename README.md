# Climbuddy

Hey fellow climbers, always struggling to figure out if the gym you wanna go to is already reshuffled? Or ended up forgetting about a few passes that end up expiring:
<br>
<img src="https://i.imgur.com/6gp7shc.jpeg" width="400">
<img src="https://i.imgur.com/fFpySfG.jpeg" width="400">
<img src="https://i.imgur.com/LUjIkvH.jpeg" width="400" >
<img src="https://i.imgur.com/6Avz8c6.jpeg" width="400" >

If only there was an easier way to keep track of which gyms you've went to and keep track of your passes with your climbing buddies so you'll be able to organize your next session with ease... meet Climbuddy!

# Screenshots

### Main Screen:

View your upcoming sessions, see your remaining passes and the dates of your previous visits to the different gyms:
<img src="https://i.imgur.com/Zdk4w4B.jpeg">

### Sessions Screen:

Host a session or join sessions that your friends have hosted:
<img src="https://imgur.com/B7LcboY.jpeg">

### Passes Screen:

Keep track of the passes from the different gyms, including their expiry dates and prices:
<img src="https://imgur.com/2PyCUDX.jpeg">

### Gyms Screen:

View the directory of gyms in Singapore and also see when they were last reset compared to your last visit:
<img src="https://imgur.com/uuZ1n3J.jpeg">

## Technologies Used

- HTML ![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)
- CSS ![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff)
- JavaScript ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
- JWT Authentication
- PERN (Postgresql, Express, React, Node)
  ![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)
  ![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)
  ![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)

## Getting Started

Create an account and start using the app!
For contribution or if you want a copy to build on it : clone and `npm i`

### Frontend

- React-router-dom : `npm i react-router-dom`
- JWT : `npm i jwt-decode`

### Backend

- `npm init -y`
- `npm i express`
- `npm i -D nodemon`
- `npm i express-validator`
- `npm i jsonwebtoken uuid bcrypt`
- `npm i cors helmet express-rate-limit`
- `npm i express pg`

### .env keys

#### Frontend and backend

```
- POSTGRES_URI
- PORT=5001
- VITE_APP_API_KEY
- ACCESS_SECRET
- REFRESH_SECRET
- VITE_SERVER
- VITE_TELETOKEN

```

## Future Plans

- Sessions - Allow for multiple attendees to join a session
- Passes - Allow for trading of passes between users
- Equipment Page - To keep track of your current and past equipments and sizes
- Telebot (Try it out @climbuddybot hehe) - Allow for users to login and manage their passes/sessions directly from the telegram bot instead of having to login via the webapp.

## License/Credits/References

- Debugging: ChatGPT 3.5
- Entity Relationship Diagram:
  <img src="https://i.imgur.com/sU78gkK.jpeg">
