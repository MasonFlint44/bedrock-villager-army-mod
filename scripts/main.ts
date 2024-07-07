import { EntityQueryOptions, world, system } from "@minecraft/server";

// TODO: add check to not re-add villagers to the same army
// TODO: handle if villager is a soldier in another army
world.beforeEvents.chatSend.subscribe(async (eventData) => {
  const player = eventData.sender;
  const message = eventData.message;

  if (!message.startsWith("!addToArmy")) {
    return;
  }
  eventData.cancel = true; // Cancel the chat message to not show it in chat

  // Extract the army name from the command
  let armyName = message.split(" ")[1];
  if (!armyName) {
    await player.runCommandAsync('tellraw @s {"rawtext":[{"text":"Please specify an army name."}]}');
    return;
  }
  armyName = armyName.toUpperCase();

  const searchDistance = 8;
  const villagers = world.getDimension("overworld").getEntities({
    closest: 1,
    location: player.location,
    maxDistance: searchDistance,
    type: "villager_v2",
  } as EntityQueryOptions);
  if (villagers.length == 0) {
    await player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"No nearby villagers to recruit."}]}`);
    return;
  }
  const villager = villagers[0];

  const villagerArmyName = villager.getDynamicProperty("armyName");
  if (villagerArmyName) {
    await player.runCommandAsync(
      `tellraw @s {"rawtext":[{"text":"This villager is already part of the ${villagerArmyName} army."}]}`
    );
    return;
  }

  // Add villager to the specified army
  villager.setDynamicProperty("armyName", armyName);
  // Use system.run(...) to trigger event (reference: https://wiki.bedrock.dev/scripting/script-server.html#beforeevents-privilege-system)
  system.run(() => {
    villager.triggerEvent("minecraft:become_soldier");
  });

  await player.runCommandAsync(
    `tellraw @a {"rawtext":[{"text":"A new soldier has been recruited for the ${armyName} army!"}]}`
  );
});
