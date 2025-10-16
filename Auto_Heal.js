//TODO: Add poisoning check and fix, maybe curse check and fix?
//TODO: Add check to make sure you are not already casting.

while (true) {
  const bandageType = 0xe21;
  const bandages = client.findType(bandageType);

  if (player.hits <= player.maxHits * .8) {
    if (player.getSkill(Skills.Healing).value > 50 && bandages) {
      player.use(bandages);
      target.waitTargetSelf();
      //client.headMsg('Bandage Heal', player.serial);
      //It takes 6 seconds to apply bandages so sleep for 4 at least
      sleep(4000)
    }
  }
  if (player.hits <= player.maxHits * .6) {
    if (player.getSkill(Skills.Magery).value > 50) {
      player.cast(Spells.GreaterHeal);
      target.waitTargetSelf();
      //client.headMsg('Greater Heal', player.serial);
      sleep(3000)
    }
    if (player.getSkill(Skills.Chivalry).value > 50) {
      player.cast(Spells.CloseWounds);
      target.waitTargetSelf();
      //client.headMsg('Close Wounds', player.serial);
      sleep(3000)
    }
  }
  sleep(500);
}
