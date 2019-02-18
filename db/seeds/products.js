const productsData = [
  {
    title: 'Counter Strike: Global Offensive',
    description:
      'Counter-Strike: Global Offensive (CS:GO) expands upon the team-based first person shooter gameplay the original Counter-Strike pioneered when it launched in 1999. Two teams compete in multiple rounds of objective-basedgame modes with the goal of winning enough rounds to win the match.',
    price: 8.19,
    thumbnail: 'https://www.pcgamesn.com/wp-content/uploads/2018/12/csgo-580x334.jpg',
  },
  {
    title: 'Portal 2',
    description:
      'Portal 2 draws from the award-winning formula of innovative gameplay, story, and music that earnedthe original Portal over 70 industry accolades and created a cult following The single-player portion of Portal 2introduces a cast of dynamic new characters, a host of fresh puzzle elements, and  a much larger set of devious testchambers. Players will explore never-before-seen areas of the Aperture Science Labs  and be reunited with GLaDOS, theoccasionally murderous computer companion who guided them through the original game. The game’s two-player cooperativemode features its own entirely separate campaign with a unique story, test chambers,   and two new player characters.This new mode forces players to reconsider everything they thought they knew about  portals. Success will require themto not just act cooperatively, but to think cooperatively.',
    price: 22.5,
    thumbnail: 'https://i.ytimg.com/vi/AjqHWsDOSis/maxresdefault.jpg',
  },
  {
    title: 'Far Cry New Dawn',
    description:
      'Dive into a transformed, vibrant, post-apocalyptic Hope County, Montana, 17 years after a globalnuclear catastrophe. Lead the fight against the Highwaymen as they seek to take over the last remaining resources inthe latest installment  of Far Cry.',
    price: 59.99,
    thumbnail:
      'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc2EAt4WcTWVZmAb109NiT_eVYg6cZ40RqSvMSIEiu7HzkG9sH3iZ3YrfZjnyA_DO8GTP5pKvlL9XjT85ycyxi_SortFau0erv_k9MRqoUDVHP95DMlslfQZffmiUAFYFmmhRhG0VKjVo2wVR8zXzz81oRNXs9uzCdIHMzVTGbTAA-&h=720&w=1280&format=jpg',
  },
  {
    title: 'The Punisher',
    description:
      'The Punisher is a third-person shooter video game developed by Volition and published by THQ. It wasreleased in 2005 for the PlayStation 2, Xbox, and Microsoft Windows; a mobile phone game was also developed byAmplified Games and released in 2004. The game stars the Marvel Comics antihero, The Punisher. After his family wasmurdered by the Mafia, Frank Castle devoted his life to the punishment of criminals. Players take control of thetitular ruthless vigilante to track down and kill criminals. ',
    price: 5.99,
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Punisher_game_cover.jpg/220px-Punisher_game_cover.jpg',
  },
  {
    title: 'Dirt Rally 2.0',
    description:
      "Dirt Rally is basically the best video game incarnation of the sport you’ll ever find, especially ifyou’re playing the intense-as-hell VR version. The 2.0 version is bringing new tracks, a create-a-team mode, and newenvironment types for you to absolutely botch a run in. Don't hold your breath for a new VR version, though.",
    price: 29.99,
    thumbnail: 'http://www.codemasters.com/wp-content/uploads/2018/09/hero_dirtrally2_2019.jpg',
  },
  {
    title: 'Doom Eternal',
    description:
      "Doom Eternal brings hell to Earth, a nice change of setting from 2016's excellent reboot. Expect tofight twice as many demons in this instalment, using a brutal upgraded armoury. This includes a new version of theSuper Shotgun, which features a grapple-friendly 'meat hook' on the end, and hopefully a ton more ludicrous weaponmods. ",
    price: 35.0,
    thumbnail: 'https://i.ytimg.com/vi/_oVwrpfo_QA/maxresdefault.jpg',
  },
  {
    title: 'Dying Light',
    description:
      "Dying Light 2 brings big choices to the open world zombie series. With writer Chris Avellone helpingin the system's creation, your decisions will shape what happens to the city around you. Liberate a water tower, forexample, and you can hand it over to authoritarian rulers so everyone can drink from it—they'll even repair the areaaround it, too, making it easier to navigate. You can also choose to hand it to shadier characters, who'll sell accessto the water but give you a cut. Expect to see a lot more of how these decisions affect this ambitious game across2019. ",
    price: 30.25,
    thumbnail: 'https://s1.gaming-cdn.com/images/products/471/screenshot/dying-light-wallpaper-5.jpg',
  },
  {
    title: 'Mortal Kombat 11',
    description:
      "Like its predecessor, Mortal Kombat 11 is a 2.5D fighting game. Alongside the returning Fatalitiesand Brutalities, new gameplay features are introduced, called Fatal Blow and Krushing Blow. Fatal Blow is a specialmove that deals a large amount of damage, but only becomes available when a player's health drops below 30%. FatalBlows can only be performed once per match. Krushing Blow is a special cinematic variation of a given special move,triggered when certain requirements are met. Also new is a Flawless Block mechanic, which allows for a comeback windowafter blocking an attack with precise timing.",
    price: 49.99,
    thumbnail: 'https://nerdist.com/wp-content/uploads/2019/01/HEADER-template-5.png',
  },
  {
    title: 'Quake Champions',
    description:
      'Quake Champions is another, the fifth installment of a popular first-person shooter, with itsspecifics relating to the popular Quake III Arena. The game’s mechanics In Quake Champions we become a selectedpersonalized character by means of whom we’ll be carrying combats with our opponents. Interestingly, none of thesecharacters has weaponry assigned to him. ',
    price: 20.99,
    thumbnail:
      'https://m.media-amazon.com/images/M/MV5BMjc5OTQ3YTUtMDEyMC00ZWRkLTg4MmItNGI4ZjNmMThkMmQzXkEyXkFqcGdeQXVyNzQzNDM3NTI@._V1_.jpg',
  },
  {
    title: 'Wolfenstein Youngblood',
    description:
      'Wolfenstein Youngblood is another installment of a popular series of shooters, in which we move backto 80s of the 20th century, and take the roles of Jessica and Sophie, daughters of the famous B.J. Blaskowittza, thehero of the previous parts of Wolfenstein series. The game’s storyline Wolfenstein Youngblood is, at least in terms ofnarrative, a pretty simple...',
    price: 42.3,
    thumbnail:
      'https://cdn2.vox-cdn.com/thumbor/wUH1uhZnV2-y8lDICht1WG3ZBEg=/0x1080/volume-assets.voxmedia.com/production/0efa6d463a5370a80f7c1e3ba04fbccc/PLY_TRA_1209_WolfensteinYoungblood_Bethesda.jpg',
  },
  {
    title: "Player Unknown's battlegrounds",
    description:
      "PLAYERUNKNOWN'S BATTLEGROUNDS is a battle royale shooter that pits 100 players against each other ina struggle for survival. Gather supplies and outwit your opponents to become the last person standing. PLAYERUNKNOWN,aka Brendan Greene, is a pioneer of the battle royale genre and the creator of the battle royale game modes in the ARMAseries and H1Z1: King of the Kill. At PUBG Corp., Greene is working with a veteran team of developers to make PUBG intothe world's premiere battle royale experience. ",
    price: 29.99,
    thumbnail: 'https://cdn-images-1.medium.com/max/2600/1*xPre_5HZeoTKyKaZNSRLuQ.jpeg',
  },
  {
    title: 'Battlefield V',
    description:
      'Battlefield V is a first-person shooter video game developed by EA DICE and published by ElectronicArts. Battlefield V is the sixteenth installment in the Battlefield series. It was released worldwide for MicrosoftWindows, PlayStation 4, and Xbox One on November 20, 2018. Those who pre-ordered the Deluxe Edition of the game weregranted early access to the game on November 15, 2018,[2] and Origin Access Premium subscribers on PC received accessto the game on November 9, 2018.[3] The game is based on World War II and is a thematic continuation of its World War Ibased precursor Battlefield 1. ',
    price: 34.49,
    thumbnail:
      'https://cdn.vox-cdn.com/thumbor/2dimplD0tRkepn3i6PmnAjerNVw=/0x0:1920x1080/1200x675/filters:focal(815x105:1121x411)/cdn.vox-cdn.com/uploads/chorus_image/image/59843175/BFV_CampaignArt_StandardBoxArt_16x9.0.png',
  },
  {
    title: 'Resident Evil 2',
    description:
      'Resident Evil 2 is a survival horror game developed and published by Capcom. Players control policeofficer Leon S. Kennedy and college student Claire Redfield as they attempt to escape from Raccoon City during a zombieapocalypse. It is a remake of the 1998 game Resident Evil 2, and was released worldwide for the PlayStation 4, Windows,and Xbox One on January 25, 2019. The game received acclaim for its presentation, gameplay, and faithfulness to theoriginal. ',
    price: 55.99,
    thumbnail:
      'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTchpnDkHidQtkhYyatU.jQc7m3vshJ6wl7gV.L9zTogvfI_JcyAzV4jqjz0ovsBoz_dMokfvKTtIRaaUV97l0_3C6A1FQQ2LJ1c.solN6BDkEN2LJU4JYapXsFD5NWPMZsi.p1MVfF_mDB0WDBLzNrgd.BmDLE.beLbVehuM1jMd8-&h=1080&w=1920&format=jpg',
  },
  {
    title: 'Subnautica',
    description:
      'Subnautica is an open-world survival-adventure video game developed and published by Unknown WorldsEntertainment. It allows the player to freely explore the ocean on an alien planet, known as planet 4546B, collectingunique resources to survive.',
    price: 19.55,
    thumbnail:
      'https://cdn2.unrealengine.com/Diesel%2Fproduct%2Fsubnautica%2Fgallery%2FSubnautica_KelpForest_1920x1080-1920x1080-078dbbec6550dc5fda06acf7f0ce96f87313cd45.jpg',
  },
  {
    title: 'Forza Horizon 4',
    description:
      "orza Horizon 4 is an open world racing video game developed by Playground Games and published byMicrosoft Studios.[1] It was released on 2 October 2018 on Xbox One and Microsoft Windows after being announced atXbox's E3 2018 conference.[2][3] The game is set in a fictionalised representation of the United Kingdom.[1][2][3] Itis the fourth Forza Horizon title and eleventh instalment in the Forza series. The game is noted for its introductionof changing seasons to the series. It is also the last game in the Forza series to be published under the MicrosoftStudios moniker before their name was changed to Xbox Game Studios in February 2019. ",
    price: 25.99,
    thumbnail:
      'https://store-images.s-microsoft.com/image/apps.3963.14397339579473373.8be13e4b-0854-4076-a4e9-8f8d5d5f97cf.c883619e-1680-49ac-98ea-c51b686de903',
  },
];

exports.seed = async knex => {
  await knex('products').del();
  return knex('products').insert(productsData);
};
