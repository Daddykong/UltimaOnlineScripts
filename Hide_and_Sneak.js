let walk_delay = 300;
let hide_delay = 2000;

while (true) {
  let chiv = player.getSkill(Skills.Chivalry).value;

  if (!player.isHidden) {
    if (journal.containsText("You must wait")){
      sleep(hide_delay);
      journal.clear();
    }
    player.useSkill(Skills.Hiding);
    sleep(walk_delay);
  }

  while (player.isHidden) {
    let steps = 4;
    let direction = [
      Directions.West, Directions.East,
      Directions.North, Directions.South
    ];
    while (steps > 0) {
      if (!player.isHidden) { break; }
      player.walk(direction[steps - 1]);
      sleep(walk_delay);
      if (Math.random() > .7) {
        steps--;
      }
    }
  }
}
