let empty_me = 0x412425D8;// 0xA308, 0xA306, 0xE43, 0xE41
let nh_trash = 0x5B8F8F9E;
let skip = [0x3196];

let contents = client.findObject(empty_me).contents;
let trash_can = client.findObject(nh_trash);

for (let trash of contents) {
  if (skip.includes(trash.graphic)) { continue; }
  player.moveItem(trash, trash_can);
  sleep(600);
}
