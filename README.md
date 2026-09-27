# Betrayal Tower Prototype

Playable prototype for testing the core game loop. This is a game-design test, not a finished RPG.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deployment

Vercel — connect the GitHub repository and deploy without extra server configuration.

GitHub: https://github.com/vividhyeok/betrayal-tower-prototype

## Confirmed Rules

- 10 floors, 30 stages per floor; stages 10, 20, and 30 are boss encounters.
- Turn-based normal battles award items.
- Boss encounters include PLAYER, BOT, and BOSS. PLAYER and BOT may attack the boss or each other.
- Defeating the other player transfers all of their unstored items.
- Death loses unstored items and returns the player to Stage 1 of the current floor.
- Stored items survive death.
- The Cultist (이단숭배자) is shown to others as a Priest (성직자).

## Prototype Rules

These rules exist only to make this prototype playable. They are marked in the UI and code.

- Damage: `max(1, attack - defense)`.
- Enemy, boss, player, and BOT combat values.
- Potion healing, loot value, item bonuses/data, BOT decision probabilities, boss rewards, and Fast Test Mode modifiers.
- A shelter can be opened after a boss for test convenience.

## TBD

Combat balance, class abilities, skills and skill trees, progression, stage types, detailed item economy, boss patterns, boss reward distribution, multiplayer count, matchmaking, networking, shelter appearance rules, world setting, story, final objective, and endgame.

## Controls

- PC: use the central action bar; inventory and battle log remain visible on the right.
- Mobile: use the fixed bottom actions. Open `가방` for inventory and battle log, `TEST` for test controls.
- Normal battle: Attack, Defend, Item. Boss battle: Attack Boss, Attack Other Player, Defend, Item.

## Test Panel

Change Floor/Stage, jump to boss stages, start a boss encounter, open shelter, add/clear items, lower or kill combatants, choose BOT personality, toggle Fast Test Mode, advance, or reset the run.

All state is local to the browser and is persisted with `localStorage`.
