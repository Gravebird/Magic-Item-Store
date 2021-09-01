# Magic Item Store
This project uses a mysql database and a node.js server to populate item shops in a dungeons and dragons game. The purpose of this project is to practice using a database along with some other software so that the end user doesn't need to write SQL queries to interact with the database.

# Features
## General
- Register accounts so each user has access to their own shops only
- Generate magic item shops using the constraints entered by the user
- Once the shop is generated, the link can be given to players to view the shop

## Shops
### Weapons
- Base weapon is selected randomly from the database
- Material (if any) is selected randomly from the database
- Enchantments are selected randomly from the database
- Weapons are modular, there are a near-infinite number of possible combinations
### Armor
- Armor is selected randomly from the database
- Material (if any) is selected randomly from the database
- Enchantments are selected randomly from the database
- Armor is also modular, there are a near-infinite number of possible combinations
### Scrolls (In-progress)
- Scrolls have spells on them, which are selected randomly from the database
- Any spell could be a scroll
### Wands (In-progress)
- Wands have spells on them, which are selected randomly from the database
- Only spells 3rd level or below can be put into a wand
### Other features - not started yet
- Staffs
- Rings
- Rods
- Wonderous Items
- Potions

# Installation instructions
1. Install Node JS.
2. Install MySQL and MySQL Server
3. Copy and paste the text inside each text file in the Database Creation folder into the MySQL Workbench, running the query each time.
4. Inside of the database_controller.js (in the controller folder), update the user and password keys in the MySQL pool object with the user and password you chose for MySQL.
5. Run "npm install" in the Magic Item Store folder
6. Run "npm start" in the Magic Item Store folder
7. Navigate to localhost: 3001 in your browser to access the program.


# Author
- Bryan Rainbow