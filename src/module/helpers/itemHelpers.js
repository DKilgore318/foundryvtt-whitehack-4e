import { wh4e } from "../config.js";
import * as c from "../constants.js";

/**
 * Update encumbrance when actor items change
 * @param {Object} actor
 */
export const updateActorEncumbrance = async (actor) => {
  const items = actor.items;
  // Calculate encumbrance
  let encEquipped = 0;
  let encStored = 0;
  const equippedArmour = items.filter(
    (item) =>
      item.type === c.ARMOUR && item.system.equippedStatus === c.EQUIPPED
  );
  encEquipped = encEquipped + getEncumbranceForItems(equippedArmour);
  encEquipped =
    encEquipped +
    getEncumbranceForItems(
      items.filter(
        (item) =>
          item.type === c.WEAPON && item.system.equippedStatus === c.EQUIPPED
      )
    );
  encEquipped =
    encEquipped +
    getEncumbranceForItems(
      items.filter(
        (item) =>
          item.type === c.GEAR && item.system.equippedStatus === c.EQUIPPED
      )
    );
  encStored =
    encStored +
    getEncumbranceForItems(
      items.filter(
        (item) =>
          item.type === c.ARMOUR && item.system.equippedStatus === c.STORED
      )
    );
  encStored =
    encStored +
    getEncumbranceForItems(
      items.filter(
        (item) =>
          item.type === c.WEAPON && item.system.equippedStatus === c.STORED
      )
    );
  encStored =
    encStored +
    getEncumbranceForItems(
      items.filter(
        (item) =>
          item.type === c.GEAR && item.system.equippedStatus === c.STORED
      )
    );

  await actor.update({
    system: {
      encumbrance: {
        equipped: encEquipped,
        stored: encStored,
      },
    },
  });
};

/**
 * Update DF when actor items change
 * @param {Object} actor
 */
export const updateActorDefenseValue = async (actor) => {
  const items = actor.items;
  const equippedArmour = items.filter(
    (item) =>
      item.type === c.ARMOUR && item.system.equippedStatus === c.EQUIPPED
  );

  // Calculate defense value
  let df = 0;
  if (equippedArmour.length > 0) {
    df = getDefenseValueForItems(equippedArmour);
  }

  await actor.update({
    system: {
      combat: {
        defenseValue: df,
      },
    },
  });
};

/**
 * Update Vocation and Species for actor when actor items change
 * @param {Object} actor
 */
export const updateActorGroups = async (actor) => {
  const items = actor.items;

  // Get vocation and species
  const speciesObj = items.filter(
    (item) => item.type === c.ABILITY && item.system.type === c.SPECIES
  );
  const vocationObj = items.filter(
    (item) => item.type === c.ABILITY && item.system.type === c.VOCATION
  );
  const species =
    speciesObj.length > 0
      ? speciesObj[0].name
      : game.settings.get("whitehack4e", "defaultSpecies");
  const vocation = vocationObj.length > 0 ? vocationObj[0].name : c.EMPTYSTRING;

  await actor.update({
    system: {
      basics: {
        vocation: vocation,
        species: species,
      },
    },
  });
};

const getDefenseValueForItems = (items) => {
  let maxDf = 0;
  let modifierDf = 0;
  items.forEach((item) => {
    let itemDf = item.system.defenseValue;
    console.log("Item DF", item.system.defenseValue);
    if (
      [
        c.PLUSONE,
        c.PLUSTWO,
        c.PLUSTHREE,
        c.MINUSONE,
        c.MINUSTWO,
        c.MINUSTHREE,
      ].includes(itemDf)
    ) {
      modifierDf = modifierDf + +wh4e.defenseValues[itemDf];
    } else if (itemDf !== c.SPECIAL) {
      itemDf = +itemDf;
      maxDf = itemDf > maxDf ? itemDf : maxDf;
    }
  });
  return maxDf + modifierDf;
};

const getEncumbranceForItems = (items) => {
  let encCount = 0;
  items.forEach((item) => {
    if (item.type == c.WEAPON || item.type === c.GEAR) {
      const quantity =
        item.system.quantity === undefined ? 1 : item.system.quantity;
      switch (item.system.weight) {
        case c.REGULAR:
          encCount = encCount + quantity;
          break;
        case c.HEAVY:
          encCount = encCount + quantity * 2;
          break;
        case c.MINOR:
          encCount = encCount + quantity / 2;
          break;
        case c.SMALL:
          encCount = encCount + quantity / 5;
          break;
        case c.TENTH:
          encCount = encCount + quantity / 10;
          break;
        case c.NEGLIGIBLE:
          encCount = encCount + quantity / 100;
          break;
        default:
          encCount = encCount++;
      }
    } else {
      if (item.system.defenseValue !== c.SPECIAL) {
        encCount =
          encCount + Math.abs(+wh4e.defenseValues[item.system.defenseValue]);
      } else {
        encCount = encCount + 1;
      }
    }
  });
  return encCount;
};
