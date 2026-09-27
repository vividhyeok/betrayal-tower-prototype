import type { EnemyData,ItemData,JobData,StageData } from './types'
export const jobs:JobData[]=[
 {id:'warrior',name:'전사',role:'균형 근접',description:'공격과 생존의 균형이 좋은 전투원.',maxHp:112,maxMana:48,attack:18,defense:8,speed:11,accuracy:88,evasion:6,art:'/art/classes/barbarian.webp',skills:[{id:'power_strike',name:'강타',description:'강한 단일 피해.',kind:'damage',power:1.45,manaCost:12,targets:'enemy'},{id:'brace',name:'전투 태세',description:'다음 피해를 크게 줄인다.',kind:'guard',power:.7,manaCost:8,targets:'self'}]},
 {id:'cleric',name:'성직자',role:'회복 지원',description:'자신이나 다른 플레이어를 회복한다.',maxHp:98,maxMana:72,attack:14,defense:7,speed:10,accuracy:90,evasion:5,art:'/art/classes/priest.webp',skills:[{id:'heal',name:'치유',description:'플레이어 HP 24 회복.',kind:'heal',power:24,manaCost:15,targets:'player'},{id:'smite',name:'징벌',description:'단일 대상 피해.',kind:'damage',power:1.15,manaCost:10,targets:'enemy'}]},
 {id:'assassin',name:'암살자',role:'단일 대상 피해',description:'빠르고 위협적인 공격형.',maxHp:86,maxMana:55,attack:22,defense:5,speed:16,accuracy:92,evasion:12,art:'/art/classes/assassin.webp',skills:[{id:'execution',name:'처형',description:'HP가 낮은 대상에게 강한 피해.',kind:'damage',power:1.55,manaCost:16,targets:'enemy'},{id:'quick_cut',name:'속격',description:'빠른 단일 공격.',kind:'damage',power:1.25,manaCost:9,targets:'enemy'}]},
 {id:'guardian',name:'방패수호자',role:'방어 특화',description:'높은 방어력과 피해 감소.',maxHp:132,maxMana:42,attack:13,defense:13,speed:7,accuracy:84,evasion:3,art:'/art/classes/shield-guardian.webp',skills:[{id:'shield_bash',name:'방패 강타',description:'방어력을 활용한 피해.',kind:'damage',power:1.25,manaCost:10,targets:'enemy'},{id:'fortify',name:'철벽',description:'다음 피해를 크게 줄인다.',kind:'guard',power:.8,manaCost:8,targets:'self'}]}
]
const art={sword:'/art/items/iron-sword.webp',worn:'/art/items/worn-sword.webp',shield:'/art/items/shield.webp',potion:'/art/items/health-potion.webp',ring:'/art/items/attack-ring.webp',gem:'/art/items/gem.webp',charm:'/art/items/defense-ring.webp'}
export const itemCatalog:ItemData[]=[
 {id:'potion',name:'체력 물약',rarity:'일반',description:'전투 중 HP를 28 회복한다.',effect:'HP +28',art:art.potion,kind:'potion'},
 {id:'dice_glove',name:'타짜의 장갑',rarity:'영웅',description:'보상 주사위 최종 결과에 +5.',effect:'LOOT ROLL +5',art:art.ring,kind:'dice_glove'},
 {id:'karma_mirror',name:'인과응보의 거울',rarity:'영웅',description:'처음 받은 PvP 피해를 100% 반사.',effect:'첫 PvP 피해 반사',art:art.charm,kind:'karma_mirror'},
 {id:'worn_iron_sword',name:'낡은 철검',rarity:'일반',description:'여전히 쓸 만한 검.',effect:'Attack +3',art:art.worn,kind:'equipment',modifiers:{attack:3}},
 {id:'mercenary_sword',name:'용병의 검',rarity:'희귀',description:'균형이 잘 잡힌 검.',effect:'Attack +6',art:art.sword,kind:'equipment',modifiers:{attack:6}},
 {id:'steel_armor',name:'강철 갑옷',rarity:'일반',description:'두꺼운 강철 갑옷.',effect:'Max HP +20',art:art.shield,kind:'equipment',modifiers:{maxHp:20}},
 {id:'guardian_plate',name:'수호자의 흉갑',rarity:'희귀',description:'충격을 흘려내는 흉갑.',effect:'Defense +4',art:art.shield,kind:'equipment',modifiers:{defense:4}},
 {id:'mana_crystal',name:'마나 수정',rarity:'일반',description:'마나를 담은 수정.',effect:'Max Mana +12',art:art.gem,kind:'equipment',modifiers:{maxMana:12}},
 {id:'sage_charm',name:'현자의 부적',rarity:'희귀',description:'마나 흐름을 안정시킨다.',effect:'Max Mana +20',art:art.charm,kind:'equipment',modifiers:{maxMana:20}},
 {id:'hawk_necklace',name:'매의 눈 목걸이',rarity:'희귀',description:'집중력을 높이는 목걸이.',effect:'Accuracy +8',art:art.charm,kind:'equipment',modifiers:{accuracy:8}},
 {id:'wind_boots',name:'바람의 장화',rarity:'희귀',description:'가볍고 빠른 장화.',effect:'Evasion +7',art:art.charm,kind:'equipment',modifiers:{evasion:7}},
 {id:'knight_shield',name:'기사의 방패',rarity:'희귀',description:'기사단의 단단한 방패.',effect:'Defense +6',art:art.shield,kind:'equipment',modifiers:{defense:6}},
 {id:'red_ring',name:'붉은 반지',rarity:'희귀',description:'힘과 생명력을 높인다.',effect:'Attack +3 · Max HP +8',art:art.ring,kind:'equipment',modifiers:{attack:3,maxHp:8}},
 {id:'scout_gloves',name:'정찰자의 장갑',rarity:'일반',description:'정교한 손놀림을 돕는다.',effect:'Accuracy +5',art:art.ring,kind:'equipment',modifiers:{accuracy:5}},
 {id:'mist_cloak',name:'안개 망토',rarity:'희귀',description:'움직임을 흐릿하게 만든다.',effect:'Evasion +5 · Max HP +6',art:art.charm,kind:'equipment',modifiers:{evasion:5,maxHp:6}},
 {id:'battle_band',name:'전투의 팔찌',rarity:'일반',description:'공격과 방어를 보조한다.',effect:'Attack +2 · Defense +2',art:art.ring,kind:'equipment',modifiers:{attack:2,defense:2}},
 {id:'focus_gem',name:'집중의 보석',rarity:'희귀',description:'마력과 명중을 돕는다.',effect:'Max Mana +10 · Accuracy +4',art:art.gem,kind:'equipment',modifiers:{maxMana:10,accuracy:4}},
 {id:'frost_relic',name:'서리 유물',rarity:'영웅',description:'향후 상태이상용 보스 아이템.',effect:'Freeze 기반',art:art.gem,kind:'boss',statusEffect:'freeze'}
]
export const normalItems=itemCatalog.filter(i=>i.kind==='equipment')
export const itemById=(id:string)=>itemCatalog.find(i=>i.id===id)!
export const jobById=(id?:string)=>jobs.find(j=>j.id===id)
export const enemies:EnemyData[]=[
 {id:'goblin',name:'고블린',maxHp:38,attack:11,defense:3,speed:10,accuracy:80,evasion:7,goldReward:14,art:'/art/classes/thief.webp'},
 {id:'wolf',name:'늑대',maxHp:34,attack:13,defense:2,speed:15,accuracy:84,evasion:11,goldReward:16,art:'/art/classes/elf.webp'},
 {id:'skeleton',name:'스켈레톤',maxHp:45,attack:12,defense:5,speed:8,accuracy:82,evasion:3,goldReward:18,art:'/art/classes/cultist.webp'},
 {id:'bandit',name:'도적',maxHp:48,attack:14,defense:4,speed:12,accuracy:86,evasion:8,goldReward:21,art:'/art/classes/assassin.webp'},
 {id:'slime',name:'슬라임',maxHp:54,attack:10,defense:7,speed:5,accuracy:76,evasion:1,goldReward:19,art:'/art/items/gem.webp'},
 {id:'ogre',name:'오우거',maxHp:105,attack:19,defense:8,speed:6,accuracy:82,evasion:2,goldReward:42,art:'/art/classes/barbarian.webp'}
]
export const enemyById=(id:string)=>enemies.find(e=>e.id===id)!
export const stages:StageData[]=Array.from({length:10},(_,i)=>{const n=i+1;return{stageNumber:n,type:n===10?'BOSS':n===9?'ELITE':'NORMAL',enemyIds:n===9?['ogre']:[[ 'goblin','wolf','skeleton','bandit','slime'][i%5]],goldReward:n===10?0:10+n*3,itemDropChance:n===9?1:.58,theme:n===9?'elite-hall':n===10?'boss-sanctum':'lower-tower'}})
export const stageByNumber=(n:number)=>stages.find(s=>s.stageNumber===n)!
