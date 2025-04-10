# TechBay Projeckt
### Készítette: Semjéni Gyula
## Bemutatása
>A TechBay webáruház egy olyan webáruház ami a magyar piacon a legkelendőbb informatikai alkatrészeket és különböző cikkeket árul a legjobb áron és a legprofibb szakemberekkel
## Fejlesztési környezet
- Node.js
- MySQL
## Adatbázis
- users
    - user_id => (ez az elsődleges kulcs) ez azonosítja a felhasználót
    - email => ez az email cím ezzel kell bejelentkezni
    - password => ez is kell a bejelentekéshez
    - create_at => ez a mező mutatja meg hogy mikor regisztrált
    - name => ez a felhasználó neve
    - proflie_pic => ez a felhasználó profilképe
    - admin => ez az admin vagyis hogy admin a felhasználó vagy nem
- user_info
    - userinfo_id => (ez az elsődleges kulcs) ez azonosítja az adatokat
    - city => ez a város vagy falu lehet
    - street => az utca és házszám
    - fullname => ez a neve a felhasználónak (szállításhoz)
    - postcode => azonosításhoz
    - user_id => ez kapcsolja össze az users táblával
- cart
    - cart_id => (ez az elsődleges kulcs) ez azonsítja a kosarat
    - user_id => ennek a mező alapaján tudjuk hogy melyik kosár kié
- cart_items
    - cart_item_id => (ez az elsődleges kulcs) ez a mező azonosító
    - cart_id => ez a mező kapcsolja egybe a cart-ot és a cart_items táblát
    - product_id => ez a mező tartalmazza a terméket amit meg akar venni a vásárló
    - quantity => ez a darabszám hogy hány darabot 
    - cat_id => ez jelöli a kategóriát és ez kapcsolja össze a categoryasdad-ot  
- categoryasdad 
    - cat_id => (ez az elsődleges kulcs) ez a mező mazonosító és ezzel a mezővel kapcsoljuk egybe a cart_items táblát
    - category_name => ez a kategória megnevezése
- orders
    - order_id => (ez az elsődleges kulcs) ez azonosítja a order_items-et ezzel a táblával
    - user_id => ez kapcsolja egybe az users-el a a táblát
    - order_date => ez mutatja meg mikor adtad le arendelést
    - total_amount => ez a végösszeg ami megmutatja mennyit kell fizetni 
- order_items
    - order_item_id => (ez az elsődleges kulcs)
    - order_id => ez kapcsolja össze a orders táblát ezzel 
    - product_id => ez a termék idje 
    - quantity => ez a darabszám
    - unit_price => ez az adott termék vagy termékek összeített ára
- order_items_archive
    - order_item_id => (ez az elsődleges kulcs)
    - order_id => ez a mező kapcsolja össze a order_items táblát
    - product_id => ez a termék idje 
    - quantity => ez a darabszám
    - unit_price => ez a rendelés összege
    - order_time => ez mutatja meg mikor rendelték meg
    - status => ez a szám mutatja meg a státszát hogy elfogadták vagy még nem
    - order_order_id => ez kapcsolja össze az orders táblát ezzel
- product
    - product_id => (ez az elsődleges kulcs) ez azonosítja a terméket
    - product_name => ez a termék neve
    - price => ez a termék ára /darab
    - in_stock => ez a mennyisége
    - cat_id => ez a kategória idje ezzel azonosítja
    - sale => ez a termék ára ha akciós
    - product_pic => ez a termék képe
    - sale_ => ez a mező dönti el hogy akciós az áru vagy nem 
    - description => ez a termék leírása
- pc_config 
    - pc_id => (ez az elsődleges kulcs) ez azonosítja a pc-t
    - cpu => processzor neve
    - mother_board => alaplap neve
    - house => gépház neve
    - ram => ram neve
    - gpu => Videókártya neve
    - hdd => hdd neve
    - ssd => ssd neve
    - power_supply => tápegység neve
    - cpu_cooler => processzor_hűtő neve
    - pc_price => ez a config ára
    - in_stock => ez a mennyisége
    - cat_id => ezzel azonosítjuk a kategóriát
    - sale => ez a pc ára ha akciós
    - sale_ => ez a mező dönti el hogy akciós a pc vagy nem
    - pc_name => ez a pc neve
    - pc_pic => ez a pc képe
    - pc_description => ez a pc leírása
    - active => ez a mező dönti el hogy aktív e ha nem akkor a felhasználó nem látja
- Yourbuild
    - pc_id => (ez az elsődleges kulcs) ez azonosítja a pc-t
    - user_id => ez alapján azonosítja hogy ki rakta össze a gépet
    - cpu => processzor idje
    - mother_board => alaplap idje
    - house => gépház idje
    - ram => ram idje
    - gpu => Videókártya idje
    - hdd => hdd idje
    - ssd => ssd idje
    - power_supply => tápegység idje
    - cpu_cooler => processzor_hűtő idje
    - cat_id => ezzel azonosítjuk a kategóriát
- Yourbuild_price
    - pc_id => (ez az elsődleges kulcs) ez azonosítja a pc-t és hozzárendeljük a felhasználóhoz
    - cpu_price => processzor ára
    - motherboard_price => alaplap ára
    - house_price => gépház ára
    - ram_price => ram ára
    - gpu_price => Videókártya ára
    - hdd_price => hdd ára
    - ssd_price => ssd ára
    - powersupply_price => tápegység ára
    - cpucooler_price => processzor_hűtő ára
    - price => ezzel a mezővel számoljuk ki a az árát
### Összegzés:
>Az users táblába vannak a felhaszálók
>Az user_info táblába vannak az adatai
>A cart táblába a kosárnak az azonosítója van 
>A cart_itemsbe a kiválasztott termékek
>A categoryasdadba a kategóriák megnevezéssel
>Az orders táblába rendelések összegzése
>Az order_items táblába a rendelésnél kiválaszott dolgok
>Az order_items_archivebe pedig a rendelési előzmény találhtó
>A product táblába a termékek vannak
>A pc_config táblába pedig a configurációk
>A yourbuild táblába azok a dolgok vannak amiket kiválasztottál a gépösszerakóva
>A yourbuild_price táblába pedig az összegek eggyesével és összegezve

