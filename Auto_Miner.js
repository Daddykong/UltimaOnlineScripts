let pet_ser = 0xC27A95F
let pet = client.findObject(pet_ser);

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


let max_weight = player.weightMax;
let current_weight = player.weight;
let stripped = false;
while (current_weight < max_weight && !stripped) {
    let now = new Date().getSeconds();
    var x = player.x;
    var y = player.y;
    var z = player.z;
    let terrains = [0x53F, 0x53E, 0x53D, 0x53C, 0x53B];
    for (let terrain of terrains) {
        player.useItemInHand();
        sleep(300);
        target.terrain(x, y, z, terrain);
        //sleep(300);
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
        client.headMsg("All gone", player.serial);
        journal.clear();
    }
    let queue = journal.containsText("too many objects");
    sleep(1000);
    journal.clear();
};
