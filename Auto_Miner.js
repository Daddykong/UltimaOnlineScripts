// ============================================================================
// CONFIGURATION: Replace these values with your shard's graphic IDs
// ============================================================================
const EXCEPTIONAL_PICKAXE_ID = 0x0E86;
const TINKERING_TOOLS_ID = 0x1EB8;
const INGOT_ID = 0x1BF2;    // Basic Iron Ingots
const ORE_IDS = [0x19B8, 0x19B9, 0x19BA];
const MINABLE_TILE_IDS = [
    0x053B, 0x023B, 0x00DE, 0x022D, 0x022E, 0x022F,
    0x0236, 0x00E3 
];
const FORGE_TILE_IDS = [0x0FB1, 0x0FB2];
const RECALL_RUNE_ID = 0x1F14; // Example graphic ID for a recall rune
const MAX_MOVE_ATTEMPTS = 5;
const SEARCH_RADIUS = 2;

let miningLocation = null;
let isMoving = false;
let moveAttempts = 0;

async function stepOneCheckEquipment() {
    // Check for pickaxe
    const pickaxe = client.findType(
        EXCEPTIONAL_PICKAXE_ID,
        null,
        player.backpack,
        null,
        2
    )
    if (pickaxe) {
        let in_hand = player.equippedItems.oneHanded || player.equippedItems.twoHanded;
        if (in_hand) {
            player.moveItem(in_hand, player.backpack)
        }
        if (!player.equippedItems.oneHanded && !player.equippedItems.twoHanded) {
            player.equip(pickaxe);
            await sleep(1500); // Wait for equip animation
        }
    } else {
        client.sysMsg("No pickaxe found. Checking for ingots and tools to make one...", 44);
        const tinkeringTools = client.findType(
            TINKERING_TOOLS_ID,
            null,
            player.backpack,
            null,
            2
        );
        const ingots = client.findType(
            INGOT_ID,
            null,
            player.backpack,
            null,
            2
        );
        if (tinkeringTools && ingots && ingots.amount >= 20) {
            await makePickaxeAndEquip(tinkeringTools, ingots);
        } else {
            client.sysMsg("Cannot make a new pickaxe. Ingots or tools missing.", 33);
            await sleep(5000);
        }
    }
}

async function makePickaxeAndEquip(tools, ingots) {
    player.use(tools);
    const gump = Gump.findOrWait("Tinkering Menu", 1500);
    if (gump.exists && gump.hasButton(322)) {
        gump.reply(322)
    }
    // After crafting, re-run equip check
    await stepOneCheckEquipment();
}

async function stepTwoFindMiningSpots() {
    let bestSpot = null;
    let bestDistance = Infinity;
    const playerX = player.x;
    const playerY = player.y;
    const playerZ = player.z
    const local_minable = [];

    for (let x = playerX - SEARCH_RADIUS; x <= playerX + SEARCH_RADIUS; x++) {
        for (let y = playerY - SEARCH_RADIUS; y <= playerY + SEARCH_RADIUS; y++) {
            const terrainTiles = client.getTerrainList(x, y);
            if (terrainTiles && terrainTiles.length > 0) {
                for (const tile of terrainTiles) {
                    if (MINABLE_TILE_IDS.includes(tile.graphic) && Math.abs(tile.z - playerZ) < 5) {
                        local_minable.push(tile);
                    }
                }
            }
        }
    }
    return local_minable;
}
//You dig some
//You have found
//There is no metal
