let junk_bin = 0x4124925D;

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
  if (journal.containsText("Chest!")) {
    console.log("Got Chest");
    break;
  }
  sleep(1000);
  console.log(new_items)
  for (const i of new_items) {
    player.moveItem(i, junk_bin);
  }
  sleep(500);
}
