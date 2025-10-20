const TREES = [
    //New Haven area
    0x0CD9, //Tall pines
    0x0CD7,
    0x0CDA, //Oak
    0x0CDD,
    0x0C9E, //Bushy tree
    0x0CE4, //Walnut tree
    0x0CE3,
    0x0CE0,
    0x0CE6, //Willow
    0x0CCD, //Tree with white bark
    0x0CD0,
    0x0CD3, 
];
const WOOD = 0x1BDD; //All wood is the same type just different hues
const SEARCH_RADIUS = 2;
const DUMP = true;

while (true) {
    const playerX = player.x;
    const playerY = player.y;
    const playerZ = player.z;
    const local_trees = [];
    for (let x = playerX - SEARCH_RADIUS; x <= playerX + SEARCH_RADIUS; x++) {
        for (let y = playerY - SEARCH_RADIUS; y <= playerY + SEARCH_RADIUS; y++) {
            const terrainTiles = client.getTerrainList(x, y);
            if (terrainTiles && terrainTiles.length > 0) {
                for (const tile of terrainTiles) {
                    //console.log(tile);
                    if (TREES.includes(tile.graphic) && Math.abs(tile.z - playerZ) < 5) {
                        local_trees.push(tile);
                    }
                }
            }
        }
    }
    //console.log(local_trees);

    for (const tree of local_trees) {
        let axe = client.findType(0xF49);
        player.use(axe)
        sleep(500);
        target.terrain(tree.x, tree.y, tree.z, tree.graphic)
        sleep(500)
    }
    if (DUMP) {
        let logs = client.findAllOfType(
            WOOD,
            null,
            player.backpack,
            null,
            2
        );
        for (const log of logs) {
            player.moveItemOnGroundOffset(log, 1, 0, 0);
        }
        //console.log(logs)
    }
}
