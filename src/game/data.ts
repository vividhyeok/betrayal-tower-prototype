import type { ItemData,JobData } from './types'
export const jobs:JobData[]=[
 {id:'warrior',name:'전사',role:'균형 근접',description:'공격과 생존의 균형이 좋은 전투원.',maxHp:112,attack:18,defense:8,speed:11,art:'/art/classes/barbarian.webp',skills:[{id:'power_strike',name:'강타',description:'기본 공격보다 강한 단일 피해.',kind:'damage',power:1.45,targets:'enemy'},{id:'brace',name:'전투 태세',description:'이번 공격의 피해를 크게 줄인다.',kind:'guard',power:.7,targets:'self'}]},
 {id:'cleric',name:'성직자',role:'회복 지원',description:'자신이나 다른 플레이어를 회복할 수 있다.',maxHp:98,attack:14,defense:7,speed:10,art:'/art/classes/priest.webp',skills:[{id:'heal',name:'치유',description:'플레이어 한 명의 HP를 회복.',kind:'heal',power:24,targets:'player'},{id:'smite',name:'징벌',description:'단일 대상에게 피해.',kind:'damage',power:1.15,targets:'enemy'}]},
 {id:'assassin',name:'암살자',role:'단일 대상 피해',description:'빠르고 위협적인 단일 대상 공격형.',maxHp:86,attack:22,defense:5,speed:16,art:'/art/classes/assassin.webp',skills:[{id:'execution',name:'처형',description:'HP가 낮은 대상에게 더 강한 피해.',kind:'damage',power:1.55,targets:'enemy'},{id:'quick_cut',name:'속격',description:'빠른 단일 대상 공격.',kind:'damage',power:1.25,targets:'enemy'}]},
 {id:'guardian',name:'방패수호자',role:'방어 특화',description:'높은 방어력과 피해 감소를 지닌다.',maxHp:132,attack:13,defense:13,speed:7,art:'/art/classes/shield-guardian.webp',skills:[{id:'shield_bash',name:'방패 강타',description:'방어력을 활용한 단일 피해.',kind:'damage',power:1.25,targets:'enemy'},{id:'fortify',name:'철벽',description:'이번 공격의 피해를 크게 줄인다.',kind:'guard',power:.8,targets:'self'}]}
]
export const itemCatalog:ItemData[]=[
 {id:'potion',name:'체력 물약',rarity:'일반',description:'전투 중 HP를 28 회복한다.',effect:'HP +28',art:'/art/items/health-potion.webp',kind:'potion'},
 {id:'dice_glove',name:'타짜의 장갑',rarity:'영웅',description:'보상 주사위 최종 결과에 +5.',effect:'LOOT ROLL +5',art:'/art/items/attack-ring.webp',kind:'dice_glove'},
 {id:'karma_mirror',name:'인과응보의 거울',rarity:'영웅',description:'상대에게 처음 받은 피해를 100% 반사. 발동 후 소모.',effect:'첫 PvP 피해 100% 반사',art:'/art/items/defense-ring.webp',kind:'karma_mirror'},
 {id:'iron_sword',name:'철검',rarity:'희귀',description:'견고한 전리품.',effect:'데모 전리품',art:'/art/items/iron-sword.webp',kind:'loot'},
 {id:'shield',name:'낡은 방패',rarity:'일반',description:'전투의 흔적이 남은 방패.',effect:'데모 전리품',art:'/art/items/shield.webp',kind:'loot'},
 {id:'ruby',name:'붉은 보석',rarity:'희귀',description:'붉은 빛을 품은 보석.',effect:'데모 전리품',art:'/art/items/gem.webp',kind:'loot'},
 {id:'worn_blade',name:'부서진 검',rarity:'일반',description:'날이 크게 상한 검.',effect:'데모 전리품',art:'/art/items/worn-sword.webp',kind:'loot'}
]
export const itemById=(id:string)=>itemCatalog.find(i=>i.id===id)!
export const jobById=(id?:string)=>jobs.find(j=>j.id===id)
