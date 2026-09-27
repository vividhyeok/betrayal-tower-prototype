export type Phase='MENU'|'CLASS_SELECT'|'NORMAL_BATTLE'|'BOSS_BATTLE'|'SHELTER'|'DEAD'|'RUN_COMPLETE'
export type Personality='협력형'|'중립형'|'배신형'
export type Item={id:string;name:string;type:string;rarity:'낡음'|'일반'|'희귀';value:number;description:string;attackBonus?:number;defenseBonus?:number;hpBonus?:number}
export type Fighter={name:string;hp:number;maxHp:number;attack:number;defense:number;inventory:Item[]}
export type GameState={floor:number;stage:number;phase:Phase;player:Fighter;opponent:Fighter|null;enemy:Fighter|null;boss:Fighter|null;storage:Item[];battleLog:string[];fastMode:boolean;personality:Personality;className:string;visibleClass:string;banner:string;notice:string;defending:boolean}
