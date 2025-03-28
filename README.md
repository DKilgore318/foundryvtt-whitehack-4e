# Whitehack 4e system (unofficial) for FoundryVTT

**This repo is under active development in order to be brought up to the Fourth edition ruleset and Foundry v12.331 Compatibility. Please do not use this until released**

This system provides support for the [Whitehack RPG 4th edition](https://whitehackrpg.wordpress.com/) in [FoundryVTT](https://foundryvtt.com). It is published with the approval of Christian Mehrstam, the creator of the Whitehack RPG (Permission not yet explicitly obtained for this fork).

## Installation

Please note that the below link currently routes to the 3e, unmaintained version
The recommended method of installing the Whitehack 4e system is from within FoundryVTT using the **Install System** option in the **Game Systems** tab. Alternatively you can install it using the manifest [link](https://raw.githubusercontent.com/hellbrandt/foundryvtt-whitehack-3e/main/src/system.json) or download the zip package from the repository's dist folder and install to your FoundryVTT `Data/Systems` folder.

## Usage

This system includes actor sheets for:

- Characters
- Monsters/NPCs

It supports items which can be created in the items panel and dragged onto characters, can be created directly in actors:

- Ability
- Armour
- Gear
- Weapon

Players and GMs can make attribute task checks, saves and attack rolls from actor sheets. Armour Class and Encumbrance are calculated based on Armour, Gear and Weapons (see below). Vocation and Species fields are populated from the Abilities tab and cannot be added directly.

There are compendiums for:

- Armour
- Gear
- Weapons

Which can be dragged directly onto a character or into the items panel.

The system supports the FoundryVTT initiative system. After actors have been added to the combat tracker you can roll initiative from there or from the relevant token on a battle map.

Full documentation can be accessed in FoundryVTT in the **Game Settings** tab and is also available on the github page for this project [here](https://neilbenson.github.io/foundryvtt-whitehack-3e/)

## License

This unofficial system requires Whitehack, &copy;2013&ndash;2023 Christian Mehrstam. You can find it [here](https://whitehackrpg.wordpress.com).

Whitehack is an RPG trademark through established use, owned by Christian Mehrstam. This third party product is unaffiliated. The Whitehack name is used with permission (Permission not yet explicitly obtained for this fork).

## Credits

Thanks to:

- Christian Mehrstam for producing the fantastic Whitehack RPG and giving approval to release this FoundryVTT system.

- [Cédric Hauteville's series on FoundryVTT development](https://www.youtube.com/playlist?list=PLFV9z59nkHDccUbRXVt623UdloPTclIrz) which put me on the right path, highly recommended.

- Chris Sharp for guidance and insight, both in Twitter chats and by referencing his fantastic [Operation Whitebox FoundryVTT system](https://github.com/chrisesharp/foundryvtt-owb/), I highly recommend checking that out.

The background texture for actor and item sheets and dialogs is from https://www.myfreetextures.com/worn-parchment-paper-4/ and is used in accordance with the [My Free Textures Licence/Terms of Use](https://www.myfreetextures.com/use-license/).

Compendium icons courtesy of [game-icons.net](https://game-icons.net) license [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/). Sled icon by me, but it's hardly a work of art so I ain't too worried.

## TO DO:
- [ ] Convert Remaining 3e names and references to 4e equivalents
- [ ] Identify and implement rules changes in 4e Using [This Document](https://whitehackrpg.wordpress.com/wp-content/uploads/2023/04/newin4e-2-1.pdf) as a first reference
- [ ] Identify and resolve any and all Foundry v12 compatibility issues
-- Leftover from forked repo
- [ ] Info on classes and class abilities to add to character sheet
- [ ] Saving throw modifiers e.g. the Strong bonuses?
