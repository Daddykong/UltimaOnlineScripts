let pets = [0xC5CCD7A, 0xC27A95F, 0xC43C8CD, 0xBB7DD89]

let pet = null;
for (let i of pets) {
  let found = client.findObject(i);
  if (found) {
    pet = found;
    break;
  }
}
let delay = 2600 //Casting delay, tune to  your casting speed
let skip_band = false; //skip bandages and only use magic
let skip_mag = false;
if (pet) {
  client.headMsg("Pet Heal Activated", pet.serial)
}

while (true && pet) {
  //Is our pet even around?
  console.log(`Found pet ${pet.serial}`);

  //Are we mounted?
  if (player.equippedItems.mount) { continue; }

  //Is our pet in casting range?
  let x_dist = Math.abs(player.x - pet.x);
  let y_dist = Math.abs(player.y - pet.y);
  let close_enough = x_dist < 10 && y_dist < 10;
  if (!close_enough) { continue; }
  console.log(`Location: ${x_dist}, ${y_dist}, in range: ${close_enough}`);

  //Are we moving?
  let start_x = player.x;
  let start_y = player.y;
  sleep(1000);
  let moving = start_x - player.x != 0 || start_y - player.y != 0;
  console.log(`Is Moving: ${moving}`);
  if (moving) { continue; }

  //Are we actively fighting?
  if (player.inWarMode) { continue; }

  //Are we hidden?
  if (player.isHidden) { continue; }

  //Player skills
  let vet = player.getSkill(Skills.Veterinary).value;
  let magic = player.getSkill(Skills.Magery).value;
  let chiv = player.getSkill(Skills.Chivalry).value;
 
  //Check inventory for bandages, 2 levels deep
  const bandageType = 0xe21;
  const bandages = client.findType(bandageType, null, null, null, 2);
  //console.log(`Banadges serial: ${bandages.serial}`);

  //If poisoned handle that first
  if (pet.isPoisoned && !pet.isDead) {
    if (magic > 80) {
      player.cast(Spells.ArchCure);
      sleep(delay); //Wait for targeting
      target.entity(pet);
      sleep(500); //Spell cooldown
    }
  }

  //Do we need healing and are we next to each other?
  let magic_threshold = pet.hits <= pet.maxHits * .95;
  let band_threshold = pet.hits <= pet.maxHits * .8;
  let min_mana = player.mana < player.maxMana * .5;
  if ( magic_threshold || pet.isDead) {
    if (vet > 50 && bandages && x_dist < 3 && y_dist < 3) {
      if ((!skip_band && band_threshold) || pet.isDead) {
        player.use(bandages);
        sleep(300);
        target.entity(pet);
        client.headMsg('Bandage Heal', pet.serial);
        if (min_mana) { sleep(3000); }
      }
    }
     //Are we low on mana?
    if (min_mana) { continue; };
    if (magic > 80 && !pet.isDead && !skip_mag && !player.equippedItems.mount) {
      player.cast(Spells.GreaterHeal);
      sleep(delay)
      target.entity(pet);
      client.headMsg('Greater Heal', pet.serial);
    }
    if (chiv > 50 && !pet.isDead && !skip_mag) {
      player.cast(Spells.CloseWounds);
      sleep(delay);
      target.entity(pet);
      client.headMsg('Close Wounds', pet.serial);
    }
  }
  sleep(1000); //Casting cool down
}
