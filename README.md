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
### Scrolls
- Scrolls have spells on them, which are selected randomly from the database
- Any spell could be a scroll
### Wands
- Wands have spells on them, which are selected randomly from the database
- Only spells 3rd level or below can be put into a wand
### Potions
- Potions have spells stored in them, which can be selected randomly from the database
- I have chosen to just include the potions that are given as purchasable in the source books. Otherwise we might find potions of poison and other harmful potions in the stores
### Staffs / Rings / Rods / Wondrous Items
- These items are pre-generated in the source books
- I may add custom ones to the database in the future
### Still doing for Version 1.0
- Create EJS pages to display generated stores and items to user.
### Plans for future upgrades
- Add loot generation from dungeon master's guide and magic item compendium to website
- Add ability to search through spell table by various search criteria


# Installation instructions
1. Install Node JS.
2. Install MySQL and MySQL Server
3. Run the script "Database Creation/create databases.sql" in your mysql as root
5. Run "npm install" in the Magic Item Store folder
6. Create a ".env" file in the root folder and specify the following environment variables:
- COOKIE_DB_HOST
- COOKIE_DB_PORT
- COOKIE_DB_USER
- COOKIE_DB_NAME
- COOKIE_DB_PASSWORD
- USER_DATA_DB_HOST
- USER_DATA_DB_USER
- USER_DATA_DB_NAME
- USER_DATA_DB_PASSWORD
- DND_DATA_DB_HOST
- DND_DATA_DB_USER
- DND_DATA_DB_NAME
- DND_DATA_DB_PASSWORD
7. Run "npm start" in the Magic Item Store folder
8. Navigate to localhost: 3001 in your browser to access the program.


# Author
- Bryan Rainbow
