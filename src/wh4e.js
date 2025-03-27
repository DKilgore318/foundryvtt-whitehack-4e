import { wh4e } from "./module/config.js";
import WH3Item from "./module/WH4Item.js";
import WH4ItemSheet from "./module/sheets/WH4ItemSheet.js";
import WH4CharacterSheet from "./module/sheets/WH4CharacterSheet.js";
import WH4MonsterSheet from "./module/sheets/WH4MonsterSheet.js";
import WH4Actor from "./module/WH4Actor.js";
import { registerHelpers } from "./module/helpers/handleBarsHelpers.js";
import { registerPartials } from "./module/partials.js";
import { registerSettings } from "./module/settings.js";
import * as c from "./module/constants.js"; // c = constants

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/whitehack4e/templates/partials/character-header.hbs",
    "systems/whitehack4e/templates/partials/character-stats.hbs",
    "systems/whitehack4e/templates/partials/ability-info.hbs",
    "systems/whitehack4e/templates/partials/weapon-info.hbs",
    "systems/whitehack4e/templates/partials/gear-info.hbs",
    "systems/whitehack4e/templates/partials/armour-info.hbs",
    "systems/whitehack4e/templates/partials/notes-tab.hbs",
    "systems/whitehack4e/templates/chat/partials/roll-results.hbs",
  ];

  return loadTemplates(templatePaths);
}

/**
 * FoundryVTT hooks
 */
Hooks.once("init", () => {
  console.log("wh4e | Initialising Whitehack 4e System");

  CONFIG.wh4e = wh4e;

  CONFIG.Item.documentClass = WH3Item;
  CONFIG.Actor.documentClass = WH4Actor;

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("wh4e", WH4ItemSheet, { makeDefault: true });

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("wh4e", WH4CharacterSheet, { makeDefault: true, types: [c.CHARACTER] });
  Actors.registerSheet("wh4e", WH4MonsterSheet, { makeDefault: true, types: [c.MONSTER] });

  preloadHandlebarsTemplates();

  registerHelpers();
  registerPartials();
  registerSettings();
});

// License and KOFI infos
Hooks.on("renderSidebarTab", async (object, html) => {
  if (object instanceof Settings) {
    let gamesystem = html.find("#game-details");

    // License text
    const template = "systems/whitehack4e/templates/license.hbs";
    const rendered = await renderTemplate(template);
    gamesystem.find(".system").append(rendered);

    // User guide
    let docs = html.find("button[data-action='docs']");
    const styling = "border:none;margin-right:2px;vertical-align:middle;margin-bottom:5px";
    $(
      `<button data-action="userguide"><img src='/systems/whitehack4e/assets/icons/svg/battle-gear.svg' width='16' height='16' style='${styling}'/>Whitehack 4e Guide</button>`
    ).insertAfter(docs);
    html.find('button[data-action="userguide"]').click((ev) => {
      new FrameViewer("https://neilbenson.github.io/foundryvtt-whitehack-4e", { resizable: true }).render(true);
    });
  }
});
