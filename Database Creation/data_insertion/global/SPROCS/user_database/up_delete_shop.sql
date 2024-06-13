DELIMITER //
CREATE PROCEDURE up_delete_shop (IN shopId INT)
    BEGIN
        DELETE FROM Armor_Property WHERE shop_id = shopId;
        DELETE FROM Armor WHERE shop_id = shopId;
        DELETE FROM Weapon_Property WHERE shop_id = shopId;
        DELETE FROM Weapon WHERE shop_id = shopId;
        DELETE FROM Magic_Item WHERE shop_id = shopId;
        DELETE FROM Misc_Item WHERE shop_id = shopId;
        DELETE FROM Potion WHERE shop_id = shopId;
        DELETE FROM Wand_or_Scroll WHERE shop_id = shopId;
        DELETE FROM Shop WHERE shop_id = shopId;
    END//

DELIMITER ;