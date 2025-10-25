const collectables = [0xEED];

while (true) {
  for (const loot of collectables) {
    let found = client.findAllItemsOfType(loot, null, "world", null, 3);
    for (let i of found) {
      player.moveItem(i, player.backpack);
      sleep(300);
    }
  }
}
