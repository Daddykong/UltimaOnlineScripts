let pet_ser = 0xB1B2167
let pet = client.findObject(pet_ser);

while (true) {
  //Is our pet even around?
  if (!pet) { continue; }
  console.log(`Found pet ${pet.serial}`);

  //Is our pet in casting range?
  let x_dist = Math.abs(player.x - pet.x);
  let y_dist = Math.abs(player.y - pet.y);
  let close_enough = x_dist < 10 && y_dist < 10;
  if (!close_enough) { continue; }
  console.log(`Location: ${x_dist}, ${y_dist}, in range: ${close_enough}`);

  //Are we moving?
  let start_x = player.x;
  let start_y = player.y;
  sleep(500);
  let moving = start_x - player.x != 0 || start_y - player.y != 0;
  console.log(`Is Moving: ${moving}`);
  if (moving) { continue; }
  //Player skills
  let vet = player.getSkill(Skills.Veterinary).value;
  let magic = player.getSkill(Skills.Magery).value;
  let chiv = player.getSkill(Skills.Chivalry);

  //Check inventory for bandages, 2 levels deep
  const bandageType = 0xe21;
  const bandages = client.findType(bandageType, null, null, null, 2);
  console.log(`Banages serial: ${bandages.serial}`);

  //If poisoned handle that first
  if (pet.isPoisoned) {
    if (magic > 80) {
      player.cast(Spells.Cure);
      sleep(3500); //Wait for targeting
      target.entity(pet);
      sleep(1200); //Spell cooldown
    }
  }

  //Do we need healing and are we next to each other?
  if (pet.hits <= pet.maxHits * .7 || pet.isDead) {
    if (vet > 50 && bandages && x_dist < 3 && y_dist < 3) {
      player.use(bandages);
      target.entity(pet);
      client.headMsg('Bandage Heal', pet.serial);
      sleep(4000) //Heals take 6 seconds but we also cooldown at the end of this loop
    }
    if (magic > 80) {
      player.cast(Spells.GreaterHeal);
      sleep(3500)
      target.entity(pet);
      client.headMsg('Greater Heal', pet.serial);
    }
    if (chiv > 50) {
      player.cast(Spells.CloseWounds);
      sleep(3500);
      target.entity(pet);
      client.headMsg('Close Wounds', pet.serial);
    }
  }
  sleep(1200); //Casting cool down
}
