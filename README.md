# Villager Army Mod for Minecraft

Create and manage unique villager armies in Minecraft Bedrock Edition with this Villager Army Mod, developed using TypeScript and custom scripts.

## Required Tools

Before starting, make sure you have installed:

- **Node.js**: Necessary for package management and script execution. Download and install it from the official [Node.js website](https://nodejs.org/).
  
- **Visual Studio Code**: Recommended for editing TypeScript and JSON files. Available for download on the [Visual Studio Code website](https://code.visualstudio.com).

## Installation and Setup

1. Clone this mod repository to your local machine:

```bash
git clone https://github.com/masonflint44/villager-army-mod.git
cd villager-army-mod
```

2. Once you have navigated into the project directory, install the required Node.js packages:

```bash
npm install
```

3. To make the Gulp build tools accessible from anywhere in your terminal, install Gulp CLI globally:

```bash
npm install -g gulp-cli
```

4. Open the project in Visual Studio Code for easy access and management:

```bash
code .
```

During this process, Visual Studio Code might suggest installing additional extensions such as Minecraft Debugger and Blockception's Minecraft Extension. These extensions will assist in developing Minecraft mods, and it is recommended to install them.

## Build and Run

After setting up, you can compile the TypeScript scripts and start working on the mod:

1. Compile the TypeScript scripts:

```bash
gulp build
```

2. Once the build is successful, launch Minecraft Bedrock Edition, load your world, and apply the behavior pack to activate the Villager Army mod.

## Project Directory Overview

- **gulpfile.js**: Contains Gulp build instructions for compiling TypeScript code.
- **scripts**: Holds the TypeScript files that make up the mod.
- **behavior_packs**: Includes resources and JSON files that define the behavior pack for the mod.

## Conclusion

You are now set up to develop and test the Villager Army mod in Minecraft Bedrock Edition. This setup is an excellent starting point to experiment with different army configurations and enhance your gameplay experience.

Feel free to make modifications, test different scenarios, and share your unique villager armies with the community!
