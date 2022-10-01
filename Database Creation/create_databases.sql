-- This is the master script that will run every other script to set up the
-- databases for the Magic Item Store app.

source create_user_database.sql;
source create_dnd_database.sql;