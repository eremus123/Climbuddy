Climbuddy

Bouldering:

<img src="https://i.imgur.com/5wraOJa.gif" width="400" >
<img src="https://i.imgur.com/nGq4ZID.gif" width="400" >

Current way of managing passes:
<br>
<img src="https://i.imgur.com/6gp7shc.jpeg" width="400">
<img src="https://i.imgur.com/fFpySfG.jpeg" width="400">
<img src="https://i.imgur.com/LUjIkvH.jpeg" width="400" >
<img src="https://i.imgur.com/6Avz8c6.jpeg" width="400" >

If only there was an easier way to keep track of not only your own collection, but also the groups that you often play with....

# Screenshots

### Welcome Screen:

See the top 50 hottest games on BGG right now!
<img src="https://i.imgur.com/w2rJoVp.jpeg">

### Group Screen:

Select the group to view games that the group owns:
<img src="https://imgur.com/rhN0gwy.jpeg">
Search/browse the games within your group:
<img src="https://imgur.com/7ifTC2c.jpeg">

### Users Screen:

Select from the existing users to view all games of a particular user (currently limited to 100 games)
<img src="https://imgur.com/kmXaG9H.jpeg">
Edit or Update the games in your collection:
<img src="https://imgur.com/Jc2BneR.jpeg">

### Games Screen:

Search for a new game to the collection, or view/edit the most recently added games:
<img src="https://imgur.com/xrhnuQR.jpeg">
After Searching for a game, fill in the details and add it to your wishlist or to your collection
<img src="https://imgur.com/d67j4Wh.jpeg">

# Technologies Used

- JavaScript JSX
- React
- PostgreSQL
- Express.js
- CSS

# Getting Started

1. Clone this repo and install cors-anywhere via "npm install cors-anywhere"
2. A folder titled node_modules should be auto-generated containing the CORS Anywhere installation.
3. In \node_modules\cors-anywhere (cd node_modules\cors-anywhere) you should find a file called server.js.
4. Run the node via "node server.js"
5. You should see something like the following if the server started correctly: Running CORS Anywhere on 127.0.0.1:8080.
6. In a new terminal, run the React App via "npm run dev"
7. Access the app interface via localhost. (http://localhost:5173/)

# Next Steps

- Include ratings in the game search feature / Allow for your own ratings
- Login directly to BGG to save to your own collections and stats
- Keep track of the number of plays for each game that you own.
- Suggest recommended games that you might like based on your own collection
- Don't know which game to play? Introducing a randomizer to pick a game that your group owns!
- Support for more than 100 games displayed
- Handle duplicate games / Check if game already exists before adding into collection
- Enhance UI/UX with nicer loading animations/interfaces

# Acknowledgements & References

- Airtable API Docs: https://airtable.com/appnFG2kbIVgZNH8a/api/docs#curl/table:boardgames
- BGG XML API2: https://boardgamegeek.com/wiki/page/BGG_XML_API2
- BGG XML API2 Guide: https://www.tayloraliss.com/bggapi/index.html
- User Languages App: https://git.generalassemb.ly/sei-sg/sei-sg-49-labs/tree/main/unit2/3-user-languages-app/eremus/languagesapp
- Debugging: ChatGPT 3.5
