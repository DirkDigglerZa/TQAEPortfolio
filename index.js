const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
let Loot = require('./models/loot');
const TQDB = require('./models/tqdb');

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  fs.readFile('tqdata.json', 'utf8', function (err, data) {
    if (err)  {
      console.log(err);
    }

    var obj = JSON.parse(data);

    var prefixes = obj.affixes.prefixes;
    var suffixes = obj.affixes.suffixes;
    var creatures = obj.creatures;
    var equipment = obj.equipment;
    var quests = obj.quests;
    var sets = obj.sets;
    var skills = obj.skills;

    const db = new TQDB('./TQADatabase');

    db.all("SELECT * FROM Affixes").then((d) => console.log(d));


    for(var prefix in prefixes){
        console.log("Name: " + prefixes[prefix].name);
        console.log("Level Requirement: " + prefixes[prefix].levelRequirement);
        console.log("Items: " + prefixes[prefix].equipment);
        console.log("Number of Properties: " + prefixes[prefix].properties.length);
        db.run("INSERT INTO Affixes (Type, Name, LevelRequirement) values ('Prefix', '" + prefixes[prefix].name + "','" + prefixes[prefix].levelRequirement + "')");
    }

    db.all("SELECT * FROM Affixes").then((d) => console.log(d));
    // for(var suffix in suffixes){
    //   console.log("Name: " + suffixes[suffix].name);
    //   console.log("Level Requirement: " + suffixes[suffix].levelRequirement);
    //   console.log("Items: " + suffixes[suffix].equipment);
    //   console.log("Number of Properties: " + suffixes[suffix].properties.length);
    // }

    // for(var c in creatures){
    //   console.log("Classification: " + creatures[c].classification);
    //   console.log("Name: " + creatures[c].name);
    //   console.log("Race: " + creatures[c].race);
    //   console.log("Tag: " + creatures[c].tag);
    //   console.log("No of Properties: " + creatures[c].properties.length);
    //   console.log("No of Abilities: " + creatures[c].abilities.length);

    //   for(var a in creatures[c].properties) {
    //     console.log(creatures[c].properties[a]);
    //   }

    //   for(var l in creatures[c].loot) {
    //     console.log(creatures[c].loot[l]);
    //   }
    //}
  });
});

