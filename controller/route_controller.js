const dnd_data_controller = require("./dnd_data_controller");
const user_data_controller = require("./user_data_controller");

// Importing weapon and armor models for testing - delete these after testing is complete
const armorModel = require('../models/armorModel');
const weaponModel = require('../models/weaponModel');



function organizeShopData(shops_list, user_name, user_id) {
    let shops_data = {
        username: user_name,
        userId: user_id,
        shops: shops_list
    }

    return shops_data;
}


let routeController = {
    welcome: (req, res) => {
        let name = null;
        if (req.user != null) {
            name = req.user.username;
        }
        res.render("generic/welcome", {user: name});
    },

    shop_generator_form: async function (req, res) {
        book_list = await dnd_data_controller.getBooks();
        res.render("shop_generator/shop_generator", {books: book_list});
    },

    view_shops: async function (req, res) {
        let user_shops = await user_data_controller.getShopDetailsByUser(req.user.id);
        let [user_name] = await user_data_controller.getUserName(req.user.id);
        user_shops = organizeShopData(user_shops, user_name.username, req.user.id);
        res.render("shop_generator/view_shops", user_shops);
    },

    viewOneShop: async function (req, res) {
        let userId = req.params.userId;
        let shopId = req.params.shopId;
        
        let [shop_name] = await user_data_controller.getShopName(shopId);
        let Armor_in_shop = await user_data_controller.getArmorInShop(shopId);
        let Weapons_in_shop = await user_data_controller.getWeaponsInShop(shopId);
        let Wondrous_Items_in_shop = await user_data_controller.getWondrousItemsInShop(shopId);
        let Rings_in_shop = await user_data_controller.getRingsInShop(shopId);
        let Rods_in_shop = await user_data_controller.getRodsInShop(shopId);
        let Staffs_in_shop = await user_data_controller.getStaffsInShop(shopId);
        let Misc_Items_in_shop = await user_data_controller.getMiscItemsInShop(shopId);
        let Potions_in_shop = await user_data_controller.getPotionsInShop(shopId);
        let Wands_in_shop = await user_data_controller.getWandsInShop(shopId);
        let Scrolls_in_shop = await user_data_controller.getScrollsInShop(shopId);

        res.render("shop_generator/view_single_shop", {
            shopId: shopId,
            shopName: shop_name.shop_name,
            shopArmor: Armor_in_shop,
            shopWeapons: Weapons_in_shop,
            shopWondrousItems: Wondrous_Items_in_shop,
            shopRings: Rings_in_shop,
            shopRods: Rods_in_shop,
            shopStaffs: Staffs_in_shop,
            shopMiscItems: Misc_Items_in_shop,
            shopPotions: Potions_in_shop,
            shopWands: Wands_in_shop,
            shopScrolls: Scrolls_in_shop
        });
    },

    viewSingleWeapon: async function (req, res) {
        let shopId = req.params.shopId;
        let weaponId = req.params.weaponId;

        let [weapon] = await user_data_controller.getSingleWeaponDetails(shopId,weaponId);
        let [weapon_material] = await user_data_controller.getSingleWeaponMaterial(shopId, weaponId);
        let weapon_properties = await user_data_controller.getSingleWeaponProperties(shopId,weaponId,0);
        let double_weapon_properties = await user_data_controller.getSingleWeaponProperties(shopId, weaponId, 1);

        res.render("shop_generator/view_single_item/view_single_weapon", {
            user_ID: req.user.id,
            shop_ID: shopId,
            weapon: weapon,
            weapon_material: weapon_material,
            weapon_properties: weapon_properties,
            weapon_double_side_properties: double_weapon_properties
        });
    },

    viewSingleArmor: async function (req, res) {
        let shopId = req.params.shopId;
        let armorId = req.params.armorId;

        let [armor] = await user_data_controller.getSingleArmorDetails(shopId, armorId);
        let [armor_material] = await user_data_controller.getSingleArmorMaterial(shopId, armorId);
        let armor_properties = await user_data_controller.getSingleArmorProperties(shopId, armorId);

        res.render("shop_generator/view_single_item/view_single_armor", {
            user_ID: req.user.id,
            shop_ID: shopId,
            armor: armor,
            armor_material: armor_material,
            armor_properties: armor_properties
        });
    },

    viewSinglePotion: async function (req, res) {
        let shopId = req.params.shopId;
        let potionId = req.params.potionId;

        let [potion] = await user_data_controller.getSinglePotionDetails(shopId, potionId);
        let [spell] = await dnd_data_controller.getSingleSpellNameAndDesc(potion.Spell_ID);

        res.render("shop_generator/view_single_item/view_single_potion", {
            user_ID: req.user.id,
            shop_ID: shopId,
            potion: potion,
            spell: spell
        });
    },

    viewSingleWandOrScroll: async function (req, res) {
        let shopId = req.params.shopId;
        let wand_or_scroll_id = req.params.wandOrScrollId;

        let [wand_or_scroll] = await user_data_controller.getSingleWandOrScrollDetails(shopId, wand_or_scroll_id);
        let [spell_obj] = await dnd_data_controller.getClassSpellInformationForWandOrScroll(wand_or_scroll.Spell_ID, wand_or_scroll.Class_ID);

        res.render("shop_generator/view_single_item/view_single_scroll_or_wand", {
            user_ID: req.user.id,
            shop_ID: shopId,
            wand_or_scroll: wand_or_scroll,
            spell_obj: spell_obj
        });
    },

    viewSingleMagicItem: async function (req, res) {
        let shopId = req.params.shopId;
        let magic_item_id = req.params.magicItemId;

        let [item] = await user_data_controller.getSingleMagicItemDetails(shopId, magic_item_id);

        res.render("shop_generator/view_single_item/view_single_magic_item", {
            user_ID: req.user.id,
            shop_ID: shopId,
            item: item
        });
    },

    test: async function (req, res) {
        let armorItem = await armorModel.generateArmorItem(0,100000,1,"1,2");
        console.log(armorItem);
        let weaponItem = await weaponModel.generateWeaponItem(0,100000,1,"1,2");
        console.log(weaponItem);
        // if (req.user != undefined) {
        //     console.log("User: " + req.user.username + ", id: " + req.user.id);
        // }
        book_list = await dnd_data_controller.getBooks();
        res.render("generic/test", {books: book_list});
    }
}

module.exports = routeController;