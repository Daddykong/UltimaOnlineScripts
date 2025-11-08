let pet_ser = 0x41212049;
let pet = client.findObject(pet_ser);

while (true) {
  player.useSkill(Skills.AnimalLore);
  sleep(300);
  target.entity(pet);
  let gump = Gump.findOrWait("Wyrmwood");
  sleep(300);
  gump.close();
}
