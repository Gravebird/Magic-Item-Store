

/*
    Item levels are as follows:

    Level       Market Price
    0.5         1-50 gp
    1           51-150 gp
    2           151-400 gp
    3           401-800 gp
    4           801-1300 gp
    5           1301-1800 gp
    6           1801-2300 gp
    7           2301-3000 gp
    8           3001-4000 gp
    9           4001-5000 gp
    10          5001-6500 gp
    11          6501-8000 gp
    12          8001-10000 gp
    13          10001-13000 gp
    14          13001-18000 gp
    15          18001-25000 gp
    16          25001-35000 gp
    17          35001-48000 gp
    18          48001-64000 gp
    19          64001-80000 gp
    20          80001-100000 gp
    21          100001-120000 gp
    22          120001-140000 gp
    23          140001-160000 gp
    24          160001-180000 gp
    25          180001-200000 gp
    26          200001-220000 gp
    27          220001-240000 gp
    28          240001-260000 gp
    29          260001-280000 gp
    30          280001-300000 gp
*/

-- Weapons and Armor will need to be handled uniquely by the app. It will need to
-- determine the target item level first, and then build an item with properties
-- or special materials to try to hit that target

-- Wondrous Items

UPDATE Wondrous_Item
SET MIC_Item_Level = 0.5
WHERE Magic_Item_Cost <= 50.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 1.0
WHERE Magic_Item_Cost BETWEEN 50.01 AND 150.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 2.0
WHERE Magic_Item_Cost BETWEEN 150.01 AND 400.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 3.0
WHERE Magic_Item_Cost BETWEEN 400.01 AND 800.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 4.0
WHERE Magic_Item_Cost BETWEEN 800.01 AND 1300.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 5.0
WHERE Magic_Item_Cost BETWEEN 1300.01 AND 1800.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 6.0
WHERE Magic_Item_Cost BETWEEN 1800.01 AND 2300.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 7.0
WHERE Magic_Item_Cost BETWEEN 2300.01 AND 3000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 8.0
WHERE Magic_Item_Cost BETWEEN 3000.01 AND 4000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 9.0
WHERE Magic_Item_Cost BETWEEN 4000.01 AND 5000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 10.0
WHERE Magic_Item_Cost BETWEEN 5000.01 AND 6500.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 11.0
WHERE Magic_Item_Cost BETWEEN 6500.01 AND 8000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 12.0
WHERE Magic_Item_Cost BETWEEN 8000.01 AND 10000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 13.0
WHERE Magic_Item_Cost BETWEEN 10000.01 AND 13000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 14.0
WHERE Magic_Item_Cost BETWEEN 13000.01 AND 18000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 15.0
WHERE Magic_Item_Cost BETWEEN 18000.01 AND 25000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 16.0
WHERE Magic_Item_Cost BETWEEN 25000.01 AND 35000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 17.0
WHERE Magic_Item_Cost BETWEEN 35000.01 AND 48000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 18.0
WHERE Magic_Item_Cost BETWEEN 48000.01 AND 64000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 19.0
WHERE Magic_Item_Cost BETWEEN 64000.01 AND 80000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 20.0
WHERE Magic_Item_Cost BETWEEN 80000.01 AND 100000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 21.0
WHERE Magic_Item_Cost BETWEEN 100000.01 AND 120000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 22.0
WHERE Magic_Item_Cost BETWEEN 120000.01 AND 140000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 23.0
WHERE Magic_Item_Cost BETWEEN 140000.01 AND 160000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 24.0
WHERE Magic_Item_Cost BETWEEN 160000.01 AND 180000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 25.0
WHERE Magic_Item_Cost BETWEEN 180000.01 AND 200000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 26.0
WHERE Magic_Item_Cost BETWEEN 200000.01 AND 220000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 27.0
WHERE Magic_Item_Cost BETWEEN 220000.01 AND 240000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 28.0
WHERE Magic_Item_Cost BETWEEN 240000.01 AND 260000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 29.0
WHERE Magic_Item_Cost BETWEEN 260000.01 AND 280000.00;

UPDATE Wondrous_Item
SET MIC_Item_Level = 30.0
WHERE Magic_Item_Cost BETWEEN 280000.01 AND 300000.00;

-- Potions

UPDATE Potion
SET MIC_Item_Level = 0.5
WHERE Potion_cost <= 50.00;

UPDATE Potion
SET MIC_Item_Level = 1.0
WHERE Potion_cost BETWEEN 50.01 AND 150.00;

UPDATE Potion
SET MIC_Item_Level = 2.0
WHERE Potion_cost BETWEEN 150.01 AND 400.00;

UPDATE Potion
SET MIC_Item_Level = 3.0
WHERE Potion_cost BETWEEN 400.01 AND 800.00;

UPDATE Potion
SET MIC_Item_Level = 4.0
WHERE Potion_cost BETWEEN 800.01 AND 1300.00;

UPDATE Potion
SET MIC_Item_Level = 5.0
WHERE Potion_cost BETWEEN 1300.01 AND 1800.00;

UPDATE Potion
SET MIC_Item_Level = 6.0
WHERE Potion_cost BETWEEN 1800.01 AND 2300.00;

UPDATE Potion
SET MIC_Item_Level = 7.0
WHERE Potion_cost BETWEEN 2300.01 AND 3000.00;

UPDATE Potion
SET MIC_Item_Level = 8.0
WHERE Potion_cost BETWEEN 3000.01 AND 4000.00;

UPDATE Potion
SET MIC_Item_Level = 9.0
WHERE Potion_cost BETWEEN 4000.01 AND 5000.00;

UPDATE Potion
SET MIC_Item_Level = 10.0
WHERE Potion_cost BETWEEN 5000.01 AND 6500.00;

UPDATE Potion
SET MIC_Item_Level = 11.0
WHERE Potion_cost BETWEEN 6500.01 AND 8000.00;

UPDATE Potion
SET MIC_Item_Level = 12.0
WHERE Potion_cost BETWEEN 8000.01 AND 10000.00;

UPDATE Potion
SET MIC_Item_Level = 13.0
WHERE Potion_cost BETWEEN 10000.01 AND 13000.00;

UPDATE Potion
SET MIC_Item_Level = 14.0
WHERE Potion_cost BETWEEN 13000.01 AND 18000.00;

UPDATE Potion
SET MIC_Item_Level = 15.0
WHERE Potion_cost BETWEEN 18000.01 AND 25000.00;

UPDATE Potion
SET MIC_Item_Level = 16.0
WHERE Potion_cost BETWEEN 25000.01 AND 35000.00;

UPDATE Potion
SET MIC_Item_Level = 17.0
WHERE Potion_cost BETWEEN 35000.01 AND 48000.00;

UPDATE Potion
SET MIC_Item_Level = 18.0
WHERE Potion_cost BETWEEN 48000.01 AND 64000.00;

UPDATE Potion
SET MIC_Item_Level = 19.0
WHERE Potion_cost BETWEEN 64000.01 AND 80000.00;

UPDATE Potion
SET MIC_Item_Level = 20.0
WHERE Potion_cost BETWEEN 80000.01 AND 100000.00;

UPDATE Potion
SET MIC_Item_Level = 21.0
WHERE Potion_cost BETWEEN 100000.01 AND 120000.00;

UPDATE Potion
SET MIC_Item_Level = 22.0
WHERE Potion_cost BETWEEN 120000.01 AND 140000.00;

UPDATE Potion
SET MIC_Item_Level = 23.0
WHERE Potion_cost BETWEEN 140000.01 AND 160000.00;

UPDATE Potion
SET MIC_Item_Level = 24.0
WHERE Potion_cost BETWEEN 160000.01 AND 180000.00;

UPDATE Potion
SET MIC_Item_Level = 25.0
WHERE Potion_cost BETWEEN 180000.01 AND 200000.00;

UPDATE Potion
SET MIC_Item_Level = 26.0
WHERE Potion_cost BETWEEN 200000.01 AND 220000.00;

UPDATE Potion
SET MIC_Item_Level = 27.0
WHERE Potion_cost BETWEEN 220000.01 AND 240000.00;

UPDATE Potion
SET MIC_Item_Level = 28.0
WHERE Potion_cost BETWEEN 240000.01 AND 260000.00;

UPDATE Potion
SET MIC_Item_Level = 29.0
WHERE Potion_cost BETWEEN 260000.01 AND 280000.00;

UPDATE Potion
SET MIC_Item_Level = 30.0
WHERE Potion_cost BETWEEN 280000.01 AND 300000.00;

-- Rings

UPDATE Ring
SET MIC_Item_Level = 0.5
WHERE Ring_Cost <= 50.00;

UPDATE Ring
SET MIC_Item_Level = 1.0
WHERE Ring_Cost BETWEEN 50.01 AND 150.00;

UPDATE Ring
SET MIC_Item_Level = 2.0
WHERE Ring_Cost BETWEEN 150.01 AND 400.00;

UPDATE Ring
SET MIC_Item_Level = 3.0
WHERE Ring_Cost BETWEEN 400.01 AND 800.00;

UPDATE Ring
SET MIC_Item_Level = 4.0
WHERE Ring_Cost BETWEEN 800.01 AND 1300.00;

UPDATE Ring
SET MIC_Item_Level = 5.0
WHERE Ring_Cost BETWEEN 1300.01 AND 1800.00;

UPDATE Ring
SET MIC_Item_Level = 6.0
WHERE Ring_Cost BETWEEN 1800.01 AND 2300.00;

UPDATE Ring
SET MIC_Item_Level = 7.0
WHERE Ring_Cost BETWEEN 2300.01 AND 3000.00;

UPDATE Ring
SET MIC_Item_Level = 8.0
WHERE Ring_Cost BETWEEN 3000.01 AND 4000.00;

UPDATE Ring
SET MIC_Item_Level = 9.0
WHERE Ring_Cost BETWEEN 4000.01 AND 5000.00;

UPDATE Ring
SET MIC_Item_Level = 10.0
WHERE Ring_Cost BETWEEN 5000.01 AND 6500.00;

UPDATE Ring
SET MIC_Item_Level = 11.0
WHERE Ring_Cost BETWEEN 6500.01 AND 8000.00;

UPDATE Ring
SET MIC_Item_Level = 12.0
WHERE Ring_Cost BETWEEN 8000.01 AND 10000.00;

UPDATE Ring
SET MIC_Item_Level = 13.0
WHERE Ring_Cost BETWEEN 10000.01 AND 13000.00;

UPDATE Ring
SET MIC_Item_Level = 14.0
WHERE Ring_Cost BETWEEN 13000.01 AND 18000.00;

UPDATE Ring
SET MIC_Item_Level = 15.0
WHERE Ring_Cost BETWEEN 18000.01 AND 25000.00;

UPDATE Ring
SET MIC_Item_Level = 16.0
WHERE Ring_Cost BETWEEN 25000.01 AND 35000.00;

UPDATE Ring
SET MIC_Item_Level = 17.0
WHERE Ring_Cost BETWEEN 35000.01 AND 48000.00;

UPDATE Ring
SET MIC_Item_Level = 18.0
WHERE Ring_Cost BETWEEN 48000.01 AND 64000.00;

UPDATE Ring
SET MIC_Item_Level = 19.0
WHERE Ring_Cost BETWEEN 64000.01 AND 80000.00;

UPDATE Ring
SET MIC_Item_Level = 20.0
WHERE Ring_Cost BETWEEN 80000.01 AND 100000.00;

UPDATE Ring
SET MIC_Item_Level = 21.0
WHERE Ring_Cost BETWEEN 100000.01 AND 120000.00;

UPDATE Ring
SET MIC_Item_Level = 22.0
WHERE Ring_Cost BETWEEN 120000.01 AND 140000.00;

UPDATE Ring
SET MIC_Item_Level = 23.0
WHERE Ring_Cost BETWEEN 140000.01 AND 160000.00;

UPDATE Ring
SET MIC_Item_Level = 24.0
WHERE Ring_Cost BETWEEN 160000.01 AND 180000.00;

UPDATE Ring
SET MIC_Item_Level = 25.0
WHERE Ring_Cost BETWEEN 180000.01 AND 200000.00;

UPDATE Ring
SET MIC_Item_Level = 26.0
WHERE Ring_Cost BETWEEN 200000.01 AND 220000.00;

UPDATE Ring
SET MIC_Item_Level = 27.0
WHERE Ring_Cost BETWEEN 220000.01 AND 240000.00;

UPDATE Ring
SET MIC_Item_Level = 28.0
WHERE Ring_Cost BETWEEN 240000.01 AND 260000.00;

UPDATE Ring
SET MIC_Item_Level = 29.0
WHERE Ring_Cost BETWEEN 260000.01 AND 280000.00;

UPDATE Ring
SET MIC_Item_Level = 30.0
WHERE Ring_Cost BETWEEN 280000.01 AND 300000.00;

-- Rods

UPDATE Rod
SET MIC_Item_Level = 0.5
WHERE Rod_Cost <= 50.00;

UPDATE Rod
SET MIC_Item_Level = 1.0
WHERE Rod_Cost BETWEEN 50.01 AND 150.00;

UPDATE Rod
SET MIC_Item_Level = 2.0
WHERE Rod_Cost BETWEEN 150.01 AND 400.00;

UPDATE Rod
SET MIC_Item_Level = 3.0
WHERE Rod_Cost BETWEEN 400.01 AND 800.00;

UPDATE Rod
SET MIC_Item_Level = 4.0
WHERE Rod_Cost BETWEEN 800.01 AND 1300.00;

UPDATE Rod
SET MIC_Item_Level = 5.0
WHERE Rod_Cost BETWEEN 1300.01 AND 1800.00;

UPDATE Rod
SET MIC_Item_Level = 6.0
WHERE Rod_Cost BETWEEN 1800.01 AND 2300.00;

UPDATE Rod
SET MIC_Item_Level = 7.0
WHERE Rod_Cost BETWEEN 2300.01 AND 3000.00;

UPDATE Rod
SET MIC_Item_Level = 8.0
WHERE Rod_Cost BETWEEN 3000.01 AND 4000.00;

UPDATE Rod
SET MIC_Item_Level = 9.0
WHERE Rod_Cost BETWEEN 4000.01 AND 5000.00;

UPDATE Rod
SET MIC_Item_Level = 10.0
WHERE Rod_Cost BETWEEN 5000.01 AND 6500.00;

UPDATE Rod
SET MIC_Item_Level = 11.0
WHERE Rod_Cost BETWEEN 6500.01 AND 8000.00;

UPDATE Rod
SET MIC_Item_Level = 12.0
WHERE Rod_Cost BETWEEN 8000.01 AND 10000.00;

UPDATE Rod
SET MIC_Item_Level = 13.0
WHERE Rod_Cost BETWEEN 10000.01 AND 13000.00;

UPDATE Rod
SET MIC_Item_Level = 14.0
WHERE Rod_Cost BETWEEN 13000.01 AND 18000.00;

UPDATE Rod
SET MIC_Item_Level = 15.0
WHERE Rod_Cost BETWEEN 18000.01 AND 25000.00;

UPDATE Rod
SET MIC_Item_Level = 16.0
WHERE Rod_Cost BETWEEN 25000.01 AND 35000.00;

UPDATE Rod
SET MIC_Item_Level = 17.0
WHERE Rod_Cost BETWEEN 35000.01 AND 48000.00;

UPDATE Rod
SET MIC_Item_Level = 18.0
WHERE Rod_Cost BETWEEN 48000.01 AND 64000.00;

UPDATE Rod
SET MIC_Item_Level = 19.0
WHERE Rod_Cost BETWEEN 64000.01 AND 80000.00;

UPDATE Rod
SET MIC_Item_Level = 20.0
WHERE Rod_Cost BETWEEN 80000.01 AND 100000.00;

UPDATE Rod
SET MIC_Item_Level = 21.0
WHERE Rod_Cost BETWEEN 100000.01 AND 120000.00;

UPDATE Rod
SET MIC_Item_Level = 22.0
WHERE Rod_Cost BETWEEN 120000.01 AND 140000.00;

UPDATE Rod
SET MIC_Item_Level = 23.0
WHERE Rod_Cost BETWEEN 140000.01 AND 160000.00;

UPDATE Rod
SET MIC_Item_Level = 24.0
WHERE Rod_Cost BETWEEN 160000.01 AND 180000.00;

UPDATE Rod
SET MIC_Item_Level = 25.0
WHERE Rod_Cost BETWEEN 180000.01 AND 200000.00;

UPDATE Rod
SET MIC_Item_Level = 26.0
WHERE Rod_Cost BETWEEN 200000.01 AND 220000.00;

UPDATE Rod
SET MIC_Item_Level = 27.0
WHERE Rod_Cost BETWEEN 220000.01 AND 240000.00;

UPDATE Rod
SET MIC_Item_Level = 28.0
WHERE Rod_Cost BETWEEN 240000.01 AND 260000.00;

UPDATE Rod
SET MIC_Item_Level = 29.0
WHERE Rod_Cost BETWEEN 260000.01 AND 280000.00;

UPDATE Rod
SET MIC_Item_Level = 30.0
WHERE Rod_Cost BETWEEN 280000.01 AND 300000.00;

-- Staffs

UPDATE Staff
SET MIC_Item_Level = 0.5
WHERE Staff_Cost <= 50.00;

UPDATE Staff
SET MIC_Item_Level = 1.0
WHERE Staff_Cost BETWEEN 50.01 AND 150.00;

UPDATE Staff
SET MIC_Item_Level = 2.0
WHERE Staff_Cost BETWEEN 150.01 AND 400.00;

UPDATE Staff
SET MIC_Item_Level = 3.0
WHERE Staff_Cost BETWEEN 400.01 AND 800.00;

UPDATE Staff
SET MIC_Item_Level = 4.0
WHERE Staff_Cost BETWEEN 800.01 AND 1300.00;

UPDATE Staff
SET MIC_Item_Level = 5.0
WHERE Staff_Cost BETWEEN 1300.01 AND 1800.00;

UPDATE Staff
SET MIC_Item_Level = 6.0
WHERE Staff_Cost BETWEEN 1800.01 AND 2300.00;

UPDATE Staff
SET MIC_Item_Level = 7.0
WHERE Staff_Cost BETWEEN 2300.01 AND 3000.00;

UPDATE Staff
SET MIC_Item_Level = 8.0
WHERE Staff_Cost BETWEEN 3000.01 AND 4000.00;

UPDATE Staff
SET MIC_Item_Level = 9.0
WHERE Staff_Cost BETWEEN 4000.01 AND 5000.00;

UPDATE Staff
SET MIC_Item_Level = 10.0
WHERE Staff_Cost BETWEEN 5000.01 AND 6500.00;

UPDATE Staff
SET MIC_Item_Level = 11.0
WHERE Staff_Cost BETWEEN 6500.01 AND 8000.00;

UPDATE Staff
SET MIC_Item_Level = 12.0
WHERE Staff_Cost BETWEEN 8000.01 AND 10000.00;

UPDATE Staff
SET MIC_Item_Level = 13.0
WHERE Staff_Cost BETWEEN 10000.01 AND 13000.00;

UPDATE Staff
SET MIC_Item_Level = 14.0
WHERE Staff_Cost BETWEEN 13000.01 AND 18000.00;

UPDATE Staff
SET MIC_Item_Level = 15.0
WHERE Staff_Cost BETWEEN 18000.01 AND 25000.00;

UPDATE Staff
SET MIC_Item_Level = 16.0
WHERE Staff_Cost BETWEEN 25000.01 AND 35000.00;

UPDATE Staff
SET MIC_Item_Level = 17.0
WHERE Staff_Cost BETWEEN 35000.01 AND 48000.00;

UPDATE Staff
SET MIC_Item_Level = 18.0
WHERE Staff_Cost BETWEEN 48000.01 AND 64000.00;

UPDATE Staff
SET MIC_Item_Level = 19.0
WHERE Staff_Cost BETWEEN 64000.01 AND 80000.00;

UPDATE Staff
SET MIC_Item_Level = 20.0
WHERE Staff_Cost BETWEEN 80000.01 AND 100000.00;

UPDATE Staff
SET MIC_Item_Level = 21.0
WHERE Staff_Cost BETWEEN 100000.01 AND 120000.00;

UPDATE Staff
SET MIC_Item_Level = 22.0
WHERE Staff_Cost BETWEEN 120000.01 AND 140000.00;

UPDATE Staff
SET MIC_Item_Level = 23.0
WHERE Staff_Cost BETWEEN 140000.01 AND 160000.00;

UPDATE Staff
SET MIC_Item_Level = 24.0
WHERE Staff_Cost BETWEEN 160000.01 AND 180000.00;

UPDATE Staff
SET MIC_Item_Level = 25.0
WHERE Staff_Cost BETWEEN 180000.01 AND 200000.00;

UPDATE Staff
SET MIC_Item_Level = 26.0
WHERE Staff_Cost BETWEEN 200000.01 AND 220000.00;

UPDATE Staff
SET MIC_Item_Level = 27.0
WHERE Staff_Cost BETWEEN 220000.01 AND 240000.00;

UPDATE Staff
SET MIC_Item_Level = 28.0
WHERE Staff_Cost BETWEEN 240000.01 AND 260000.00;

UPDATE Staff
SET MIC_Item_Level = 29.0
WHERE Staff_Cost BETWEEN 260000.01 AND 280000.00;

UPDATE Staff
SET MIC_Item_Level = 30.0
WHERE Staff_Cost BETWEEN 280000.01 AND 300000.00;

-- Scrolls

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 0.5
WHERE Scroll_Total_Cost <= 50.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 1.0
WHERE Scroll_Total_Cost BETWEEN 50.01 AND 150.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 2.0
WHERE Scroll_Total_Cost BETWEEN 150.01 AND 400.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 3.0
WHERE Scroll_Total_Cost BETWEEN 400.01 AND 800.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 4.0
WHERE Scroll_Total_Cost BETWEEN 800.01 AND 1300.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 5.0
WHERE Scroll_Total_Cost BETWEEN 1300.01 AND 1800.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 6.0
WHERE Scroll_Total_Cost BETWEEN 1800.01 AND 2300.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 7.0
WHERE Scroll_Total_Cost BETWEEN 2300.01 AND 3000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 8.0
WHERE Scroll_Total_Cost BETWEEN 3000.01 AND 4000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 9.0
WHERE Scroll_Total_Cost BETWEEN 4000.01 AND 5000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 10.0
WHERE Scroll_Total_Cost BETWEEN 5000.01 AND 6500.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 11.0
WHERE Scroll_Total_Cost BETWEEN 6500.01 AND 8000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 12.0
WHERE Scroll_Total_Cost BETWEEN 8000.01 AND 10000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 13.0
WHERE Scroll_Total_Cost BETWEEN 10000.01 AND 13000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 14.0
WHERE Scroll_Total_Cost BETWEEN 13000.01 AND 18000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 15.0
WHERE Scroll_Total_Cost BETWEEN 18000.01 AND 25000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 16.0
WHERE Scroll_Total_Cost BETWEEN 25000.01 AND 35000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 17.0
WHERE Scroll_Total_Cost BETWEEN 35000.01 AND 48000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 18.0
WHERE Scroll_Total_Cost BETWEEN 48000.01 AND 64000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 19.0
WHERE Scroll_Total_Cost BETWEEN 64000.01 AND 80000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 20.0
WHERE Scroll_Total_Cost BETWEEN 80000.01 AND 100000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 21.0
WHERE Scroll_Total_Cost BETWEEN 100000.01 AND 120000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 22.0
WHERE Scroll_Total_Cost BETWEEN 120000.01 AND 140000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 23.0
WHERE Scroll_Total_Cost BETWEEN 140000.01 AND 160000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 24.0
WHERE Scroll_Total_Cost BETWEEN 160000.01 AND 180000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 25.0
WHERE Scroll_Total_Cost BETWEEN 180000.01 AND 200000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 26.0
WHERE Scroll_Total_Cost BETWEEN 200000.01 AND 220000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 27.0
WHERE Scroll_Total_Cost BETWEEN 220000.01 AND 240000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 28.0
WHERE Scroll_Total_Cost BETWEEN 240000.01 AND 260000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 29.0
WHERE Scroll_Total_Cost BETWEEN 260000.01 AND 280000.00;

UPDATE Class_Spells
SET MIC_Scroll_Item_Level = 30.0
WHERE Scroll_Total_Cost BETWEEN 280000.01 AND 300000.00;

-- Wands

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 0.5
WHERE Wand_Total_Cost <= 50.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 1.0
WHERE Wand_Total_Cost BETWEEN 50.01 AND 150.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 2.0
WHERE Wand_Total_Cost BETWEEN 150.01 AND 400.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 3.0
WHERE Wand_Total_Cost BETWEEN 400.01 AND 800.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 4.0
WHERE Wand_Total_Cost BETWEEN 800.01 AND 1300.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 5.0
WHERE Wand_Total_Cost BETWEEN 1300.01 AND 1800.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 6.0
WHERE Wand_Total_Cost BETWEEN 1800.01 AND 2300.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 7.0
WHERE Wand_Total_Cost BETWEEN 2300.01 AND 3000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 8.0
WHERE Wand_Total_Cost BETWEEN 3000.01 AND 4000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 9.0
WHERE Wand_Total_Cost BETWEEN 4000.01 AND 5000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 10.0
WHERE Wand_Total_Cost BETWEEN 5000.01 AND 6500.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 11.0
WHERE Wand_Total_Cost BETWEEN 6500.01 AND 8000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 12.0
WHERE Wand_Total_Cost BETWEEN 8000.01 AND 10000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 13.0
WHERE Wand_Total_Cost BETWEEN 10000.01 AND 13000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 14.0
WHERE Wand_Total_Cost BETWEEN 13000.01 AND 18000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 15.0
WHERE Wand_Total_Cost BETWEEN 18000.01 AND 25000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 16.0
WHERE Wand_Total_Cost BETWEEN 25000.01 AND 35000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 17.0
WHERE Wand_Total_Cost BETWEEN 35000.01 AND 48000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 18.0
WHERE Wand_Total_Cost BETWEEN 48000.01 AND 64000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 19.0
WHERE Wand_Total_Cost BETWEEN 64000.01 AND 80000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 20.0
WHERE Wand_Total_Cost BETWEEN 80000.01 AND 100000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 21.0
WHERE Wand_Total_Cost BETWEEN 100000.01 AND 120000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 22.0
WHERE Wand_Total_Cost BETWEEN 120000.01 AND 140000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 23.0
WHERE Wand_Total_Cost BETWEEN 140000.01 AND 160000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 24.0
WHERE Wand_Total_Cost BETWEEN 160000.01 AND 180000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 25.0
WHERE Wand_Total_Cost BETWEEN 180000.01 AND 200000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 26.0
WHERE Wand_Total_Cost BETWEEN 200000.01 AND 220000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 27.0
WHERE Wand_Total_Cost BETWEEN 220000.01 AND 240000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 28.0
WHERE Wand_Total_Cost BETWEEN 240000.01 AND 260000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 29.0
WHERE Wand_Total_Cost BETWEEN 260000.01 AND 280000.00;

UPDATE Class_Spells
SET MIC_Wand_Item_Level = 30.0
WHERE Wand_Total_Cost BETWEEN 280000.01 AND 300000.00;

-- Generic Weapons

UPDATE Generic_Weapon
SET MIC_Item_Level = 0.5
WHERE Generic_Weapon_Cost <= 50.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 1.0
WHERE Generic_Weapon_Cost BETWEEN 50.01 AND 150.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 2.0
WHERE Generic_Weapon_Cost BETWEEN 150.01 AND 400.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 3.0
WHERE Generic_Weapon_Cost BETWEEN 400.01 AND 800.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 4.0
WHERE Generic_Weapon_Cost BETWEEN 800.01 AND 1300.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 5.0
WHERE Generic_Weapon_Cost BETWEEN 1300.01 AND 1800.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 6.0
WHERE Generic_Weapon_Cost BETWEEN 1800.01 AND 2300.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 7.0
WHERE Generic_Weapon_Cost BETWEEN 2300.01 AND 3000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 8.0
WHERE Generic_Weapon_Cost BETWEEN 3000.01 AND 4000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 9.0
WHERE Generic_Weapon_Cost BETWEEN 4000.01 AND 5000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 10.0
WHERE Generic_Weapon_Cost BETWEEN 5000.01 AND 6500.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 11.0
WHERE Generic_Weapon_Cost BETWEEN 6500.01 AND 8000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 12.0
WHERE Generic_Weapon_Cost BETWEEN 8000.01 AND 10000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 13.0
WHERE Generic_Weapon_Cost BETWEEN 10000.01 AND 13000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 14.0
WHERE Generic_Weapon_Cost BETWEEN 13000.01 AND 18000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 15.0
WHERE Generic_Weapon_Cost BETWEEN 18000.01 AND 25000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 16.0
WHERE Generic_Weapon_Cost BETWEEN 25000.01 AND 35000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 17.0
WHERE Generic_Weapon_Cost BETWEEN 35000.01 AND 48000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 18.0
WHERE Generic_Weapon_Cost BETWEEN 48000.01 AND 64000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 19.0
WHERE Generic_Weapon_Cost BETWEEN 64000.01 AND 80000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 20.0
WHERE Generic_Weapon_Cost BETWEEN 80000.01 AND 100000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 21.0
WHERE Generic_Weapon_Cost BETWEEN 100000.01 AND 120000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 22.0
WHERE Generic_Weapon_Cost BETWEEN 120000.01 AND 140000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 23.0
WHERE Generic_Weapon_Cost BETWEEN 140000.01 AND 160000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 24.0
WHERE Generic_Weapon_Cost BETWEEN 160000.01 AND 180000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 25.0
WHERE Generic_Weapon_Cost BETWEEN 180000.01 AND 200000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 26.0
WHERE Generic_Weapon_Cost BETWEEN 200000.01 AND 220000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 27.0
WHERE Generic_Weapon_Cost BETWEEN 220000.01 AND 240000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 28.0
WHERE Generic_Weapon_Cost BETWEEN 240000.01 AND 260000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 29.0
WHERE Generic_Weapon_Cost BETWEEN 260000.01 AND 280000.00;

UPDATE Generic_Weapon
SET MIC_Item_Level = 30.0
WHERE Generic_Weapon_Cost BETWEEN 280000.01 AND 300000.00;

-- Generic_Armors

UPDATE Generic_Armor
SET MIC_Item_Level = 0.5
WHERE Generic_Armor_Cost <= 50.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 1.0
WHERE Generic_Armor_Cost BETWEEN 50.01 AND 150.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 2.0
WHERE Generic_Armor_Cost BETWEEN 150.01 AND 400.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 3.0
WHERE Generic_Armor_Cost BETWEEN 400.01 AND 800.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 4.0
WHERE Generic_Armor_Cost BETWEEN 800.01 AND 1300.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 5.0
WHERE Generic_Armor_Cost BETWEEN 1300.01 AND 1800.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 6.0
WHERE Generic_Armor_Cost BETWEEN 1800.01 AND 2300.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 7.0
WHERE Generic_Armor_Cost BETWEEN 2300.01 AND 3000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 8.0
WHERE Generic_Armor_Cost BETWEEN 3000.01 AND 4000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 9.0
WHERE Generic_Armor_Cost BETWEEN 4000.01 AND 5000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 10.0
WHERE Generic_Armor_Cost BETWEEN 5000.01 AND 6500.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 11.0
WHERE Generic_Armor_Cost BETWEEN 6500.01 AND 8000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 12.0
WHERE Generic_Armor_Cost BETWEEN 8000.01 AND 10000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 13.0
WHERE Generic_Armor_Cost BETWEEN 10000.01 AND 13000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 14.0
WHERE Generic_Armor_Cost BETWEEN 13000.01 AND 18000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 15.0
WHERE Generic_Armor_Cost BETWEEN 18000.01 AND 25000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 16.0
WHERE Generic_Armor_Cost BETWEEN 25000.01 AND 35000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 17.0
WHERE Generic_Armor_Cost BETWEEN 35000.01 AND 48000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 18.0
WHERE Generic_Armor_Cost BETWEEN 48000.01 AND 64000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 19.0
WHERE Generic_Armor_Cost BETWEEN 64000.01 AND 80000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 20.0
WHERE Generic_Armor_Cost BETWEEN 80000.01 AND 100000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 21.0
WHERE Generic_Armor_Cost BETWEEN 100000.01 AND 120000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 22.0
WHERE Generic_Armor_Cost BETWEEN 120000.01 AND 140000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 23.0
WHERE Generic_Armor_Cost BETWEEN 140000.01 AND 160000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 24.0
WHERE Generic_Armor_Cost BETWEEN 160000.01 AND 180000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 25.0
WHERE Generic_Armor_Cost BETWEEN 180000.01 AND 200000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 26.0
WHERE Generic_Armor_Cost BETWEEN 200000.01 AND 220000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 27.0
WHERE Generic_Armor_Cost BETWEEN 220000.01 AND 240000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 28.0
WHERE Generic_Armor_Cost BETWEEN 240000.01 AND 260000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 29.0
WHERE Generic_Armor_Cost BETWEEN 260000.01 AND 280000.00;

UPDATE Generic_Armor
SET MIC_Item_Level = 30.0
WHERE Generic_Armor_Cost BETWEEN 280000.01 AND 300000.00;