let junk_bin = 0x4071EB27;
let knife = 0x4023E271;
const MIN = -10;
const MAX = 10
const DUMP = true;
const CUT = true;
const RANDO = false;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let start_inv = [];
for (const i of (player.backpack.contents){
  start_inv.push(i.serial);
}

while (true) {
  client.headMsg("Fishing", player.serial);
  journal.clear();
  player.useItemInHand();
  sleep(300);

  //player offset
  let x = 0;
  let y = 10;

  if (RANDO) {
    x = getRandomInt(MIN, MAX);
    y = getRandomInt(MIN, MAX); 
  }

  if (journal.containsText("seen") && !RANDO) {
    break;
  }
  if (journal.containsText("biting") && !RANDO) {
    break;
  }
  target.terrainWithOffset(x, y, 0);
  journal.clear();
  sleep(6000);

  let new_items = [];
  for (const i of player.backpack.contents) {
    if (!start_inv.includes(i.serial)) {
      new_items.push(i);
    }
  }
  if (journal.containsText("Chest!") || journal.containsText("bitting")) {
    client.headMsg("Stopped Fishing", player.serial);
    break;
  }
  //sleep(1000);
  for (const i of new_items) {
    if (DUMP) {
      player.moveItem(i, junk_bin);
    }
    if (CUT) {
      player.use(knife);
      sleep(500);
      target.entity(i);
    }
  }
  sleep(500);
}
