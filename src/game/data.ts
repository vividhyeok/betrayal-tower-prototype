import type { Item } from './types'
export const classes=[['이단숭배자','배신 특화'],['암살자','배신 특화'],['도둑','배신 특화'],['성직자','서포트'],['연금술사','서포트'],['바바리안','전사'],['용기사','전사'],['방패수호자','탱커'],['엘프','원거리'],['정령술사','원거리']]
const samples:Omit<Item,'id'>[]=[{name:'낡은 검',type:'무기',rarity:'낡음',value:18,description:'오래된 검.',attackBonus:1},{name:'철검',type:'무기',rarity:'일반',value:45,description:'단단한 철검.',attackBonus:2},{name:'방패',type:'방어구',rarity:'일반',value:38,description:'몸을 지키는 방패.',defenseBonus:1},{name:'체력 물약',type:'소모품',rarity:'일반',value:25,description:'HP를 회복한다.'},{name:'공격 반지',type:'장신구',rarity:'희귀',value:80,description:'공격을 돕는 반지.',attackBonus:2},{name:'방어 반지',type:'장신구',rarity:'희귀',value:75,description:'방어를 돕는 반지.',defenseBonus:2},{name:'보석',type:'전리품',rarity:'희귀',value:120,description:'가치 있는 보석.'}]
export const randomItem=():Item=>({...samples[Math.floor(Math.random()*samples.length)],id:`item-${Date.now()}-${Math.random()}`})
export const lootValue=(items:Item[])=>items.reduce((n,i)=>n+i.value,0)
