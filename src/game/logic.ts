import type { Fighter, GameState, Item, Personality } from './types'
import { randomItem } from './data'
// PROTOTYPE RULE — 실제 전투 수치와 적/보스 밸런스는 아직 미구체화.
export const damage=(a:Fighter,d:Fighter)=>Math.max(1,a.attack-d.defense)
export const createEnemy=(floor:number,fast:boolean):Fighter=>({name:['해골병사','탑의 망령','갑옷 파수꾼'][Math.floor(Math.random()*3)],hp:fast?10:22+floor*3,maxHp:fast?10:22+floor*3,attack:6+floor,defense:2+Math.floor(floor/2),inventory:[]})
export const createBoss=(floor:number,fast:boolean):Fighter=>({name:'붉은 문지기',hp:fast?35:90+floor*12,maxHp:fast?35:90+floor*12,attack:9+floor,defense:3+Math.floor(floor/2),inventory:[]})
export const createBot=(fast:boolean):Fighter=>{const hp=fast?50:82;return {name:'떠도는 등반자',hp,maxHp:hp,attack:11,defense:3,inventory:Array.from({length:fast?7:5},randomItem)}}
export const initialState=():GameState=>({floor:1,stage:1,phase:'MENU',player:{name:'PLAYER',hp:100,maxHp:100,attack:12,defense:4,inventory:[]},opponent:null,enemy:null,boss:null,storage:[],battleLog:['프로토타입 준비 완료'],fastMode:true,personality:'중립형',className:'',visibleClass:'',banner:'',notice:'',defending:false})
export const log=(s:GameState,...lines:string[])=>({...s,battleLog:[...lines,...s.battleLog].slice(0,80)})
export const startStage=(s:GameState,floor=s.floor,stage=s.stage):GameState=>{if(floor>10)return {...s,floor:10,stage:30,phase:'RUN_COMPLETE',banner:'RUN COMPLETE'};const base={...s,floor,stage,banner:stage%10===0?'BOSS ENCOUNTER':'',notice:'',defending:false};if(stage%10===0){const next={...base,phase:'BOSS_BATTLE' as const,enemy:null,boss:createBoss(floor,s.fastMode),opponent:createBot(s.fastMode)};return log(next,`Floor ${floor} - Stage ${stage} · BOSS ENCOUNTER`,'다른 플레이어와 조우했습니다.')}const enemy=createEnemy(floor,s.fastMode);return log({...base,phase:'NORMAL_BATTLE',enemy,boss:null,opponent:null},`Floor ${floor} - Stage ${stage}`,`${enemy.name} 등장`)}
export const advance=(s:GameState)=>s.stage===30?startStage(s,s.floor+1,1):startStage(s,s.floor,s.stage+1)
export const setPersonality=(s:GameState,p:Personality)=>({...s,personality:p})
export const addLoot=(items:Item[],count:number)=>[...items,...Array.from({length:count},randomItem)]
