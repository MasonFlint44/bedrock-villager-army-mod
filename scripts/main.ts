import { EntityQueryOptions, world, system } from "@minecraft/server";

// TODO: add check to not re-add villagers to the same army
// TODO: handle if villager is a soldier in another army
world.beforeEvents.chatSend.subscribe((eventData) => {
  const player = eventData.sender;
  const message = eventData.message;

  if (message.startsWith("!addToArmy")) {
    eventData.cancel = true; // Cancel the chat message to not show it in chat

    // Extract the army name from the command
    const armyName = message.split(" ")[1];
    if (!armyName) {
      player.runCommandAsync('tellraw @s {"rawtext":[{"text":"Please specify an army name."}]}');
      return;
    }

    const searchDistance = 8;
    const villagers = world.getDimension("overworld").getEntities({
      closest: 1,
      location: player.location,
      maxDistance: searchDistance,
      type: "villager_v2",
    } as EntityQueryOptions);
    if (villagers.length == 0) {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"No nearby villagers to recruit."}]}`);
      return;
    }
    const villager = villagers[0];

    // Add villager to the specified army
    villager.setDynamicProperty("armyName", armyName);
    // Use system.run(...) to trigger event (reference: https://wiki.bedrock.dev/scripting/script-server.html#beforeevents-privilege-system)
    system.run(() => {
      villager.triggerEvent("minecraft:become_soldier");
    });

    player.runCommandAsync(
      `tellraw @a {"rawtext":[{"text":"A new soldier has been recruited for the ${armyName} army!"}]}`
    );
  }
});
