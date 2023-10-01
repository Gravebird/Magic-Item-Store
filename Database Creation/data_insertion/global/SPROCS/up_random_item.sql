DELIMITER //
CREATE PROCEDURE up_random_item (IN item_type VARCHAR(13), IN amount INT)
	BEGIN
		IF (item_type = 'all') THEN
         SELECT * 
         FROM Magic_Item_Loot_Table
         ORDER BY RAND()
         LIMIT amount;
		ELSE
		 SELECT *
         FROM Magic_Item_Loot_Table
         WHERE Type = item_type
         ORDER BY RAND()
         LIMIT amount;
		END IF;
    END//

DELIMITER ;