let pet_ser = 0xC27A95F
let pet = client.findObject(pet_ser);
let in_dungeon = true;

async function smelt(pet) {
    let ore_list = [0x19B9, 0x19B7, 0x19BA, 0x19B8];
    for (let ore_type of ore_list) {
        let ore = client.findAllItemsOfType(ore_type, null, player.backpack);
        for (let pile of ore) {
            player.use(pile);
            sleep(300);
            target.entity(pet);
        }
    }
}
async function drop() {
    let ore_list = [0x19B7, 0x19BA, 0x19B8];
    for (let ore_type of ore_list) {
        let ore = client.findAllItemsOfType(ore_type, null, player.backpack);
        for (let pile of ore) {
            player.moveItemOnGroundOffset(pile, 1, 0, 0);
        }
    }
}

journal.clear();

let max_weight = player.weightMax;
let current_weight = player.weight;
let stripped = false;
while (current_weight < max_weight && !stripped) {
    let now = new Date().getSeconds();
    var x = player.x;
    var y = player.y;
    var z = player.z;
    let terrains = client.getTerrainList(x, y);
    for (let terrain of terrains) {
        player.useItemInHand();
        sleep(300);
        if (!in_dungeon) {
            target.terrain(x, y, z, terrain.graphic);
        } else {
            target.terrain(x, y, z);
        }
    }
    if (current_weight > max_weight * .8) {
        smelt(pet);
        sleep(300);
        drop();
        sleep(300);
    }
    current_weight = player.weight;
    stripped = journal.containsText("There is no metal");
    if (stripped) {
        smelt(pet);
        client.headMsg("All gone", player.serial);
        journal.clear();
    }
    sleep(300);
};
