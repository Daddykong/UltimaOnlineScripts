let junk_bin = 0x4124925D;
let knife = 0x4023E271;
const DUMP = false;
const CUT = true;

let start_inv = [];
for (const i of (player.backpack.contents){
  start_inv.push(i.serial);
}

while (true) {
  client.headMsg("Fishing", player.serial);
  journal.clear();
  player.useItemInHand();
  sleep(300);
  target.terrainWithOffset(0, 10, 0);
  sleep(9000);

  let new_items = [];
  for (const i of player.backpack.contents) {
    if (!start_inv.includes(i.serial)) {
      new_items.push(i);
    }
  }
  if (journal.containsText("Chest!") || journal.containsText("bitting")) {
    client.headMsg("Stopped Fishgin", player.serial);
    break;
  }
  sleep(1000);
  console.log(new_items)
  for (const i of new_items) {
    if (DUMP) {
      player.moveItem(i, junk_bin);
    }
    if (CUT) {
      player.use(knife);
      sleep(300);
      target.entity(i);
    }
  }
  sleep(500);
}
