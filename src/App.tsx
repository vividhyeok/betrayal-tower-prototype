import { useEffect, useState, type ReactNode } from 'react'
import type { Fighter, GameState, Item, Personality } from './game/types'
import { classes, lootValue, randomItem } from './game/data'
import { addLoot, advance, damage, initialState, log, setPersonality, startStage } from './game/logic'

const KEY='betrayal-tower-save-v1'
const TOTAL_STAGES=300
const pct=(f:Fighter)=>Math.max(0,f.hp/f.maxHp*100)
const absoluteStage=(game:GameState)=>Math.min(TOTAL_STAGES,(game.floor-1)*30+game.stage)
const overallPct=(game:GameState)=>Math.min(100,absoluteStage(game)/TOTAL_STAGES*100)

function Hp({fighter,tone='blue'}:{fighter:Fighter;tone?:'blue'|'red'}){
 return <div className="hp-wrap"><div className="hp-label"><span>HP</span><b>{Math.max(0,fighter.hp)} / {fighter.maxHp}</b></div><div className="hp"><i className={tone} style={{width:`${pct(fighter)}%`}} /></div></div>
}

function FighterCard({title,fighter,tone='blue',showLoot=false}:{title:string;fighter:Fighter;tone?:'blue'|'red';showLoot?:boolean}){
 return <section className={`fighter ${fighter.hp<=0?'fallen':''}`}>
  <header><span className="eyebrow">{title}</span><b>{fighter.name}</b></header>
  <div className={`sigil ${tone}`}>{title==='BOSS'?'♜':title==='OTHER PLAYER'?'♟':'♙'}</div>
  <Hp fighter={fighter} tone={tone}/>
  <div className="stats"><span>ATK {fighter.attack}</span><span>DEF {fighter.defense}</span></div>
  {showLoot&&<div className="loot-readout"><span>ITEMS {fighter.inventory.length}</span><strong>LOOT {lootValue(fighter.inventory)}</strong></div>}
 </section>
}

function Inventory({items,onUse,compact=false}:{items:Item[];onUse?:(i:Item)=>void;compact?:boolean}){
 return <div className={`inventory ${compact?'compact':''}`}>
  {items.length===0?<p className="empty">비어 있음</p>:items.map(i=><button key={i.id} className="item" onClick={()=>onUse?.(i)} title={i.description}>
   <span className={`rarity ${i.rarity==='희귀'?'rare':''}`}/>
   <span><b>{i.name}</b><small>{i.type} · 가치 {i.value}</small></span>
   {onUse&&<em>보관</em>}
  </button>)}
 </div>
}

function ProgressHud({game}:{game:GameState}){
 const current=absoluteStage(game)
 const nextBoss=game.stage%10===0?game.stage:Math.ceil(game.stage/10)*10
 const toBoss=Math.max(0,nextBoss-game.stage)
 return <div className="progress-hud">
  <div className="progress-copy">
   <div><small>RUN PROGRESS</small><strong>{current} / {TOTAL_STAGES}</strong></div>
   <span>{Math.round(overallPct(game))}% 완료</span>
  </div>
  <div className="overall-track"><i style={{width:`${overallPct(game)}%`}}/></div>
  <div className="floor-progress-row">
   <div className="floor-progress-copy">
    <b>FLOOR {game.floor}</b>
    <span>STAGE {game.stage} / 30</span>
   </div>
   <div className="stage-segments" aria-label={`Floor ${game.floor}, stage ${game.stage} of 30`}>
    {Array.from({length:30},(_,i)=>{
     const stage=i+1
     return <i key={stage} className={`${stage<game.stage?'done':''} ${stage===game.stage?'current':''} ${stage%10===0?'boss':''}`} title={`Stage ${stage}${stage%10===0?' · BOSS':''}`}/>
    })}
   </div>
   <div className={`next-boss ${toBoss===0?'now':''}`}>
    {toBoss===0?'BOSS NOW':`다음 보스까지 ${toBoss}`}
   </div>
  </div>
 </div>
}

function EncounterStatus({game}:{game:GameState}){
 let label='전투 진행 중'
 let detail='적을 처치하고 다음 스테이지로 진행하세요.'
 let tone='active'
 if(game.phase==='NORMAL_BATTLE'&&game.enemy?.hp<=0){
  label='STAGE CLEAR'
  detail=`Stage ${game.stage} 승리 · 전리품을 획득했습니다.`
  tone='clear'
 }else if(game.phase==='BOSS_BATTLE'){
  label='BOSS BATTLE'
  if(game.opponent&&game.opponent.hp<=0) detail='상대 플레이어 처치 · 보스 전투는 계속됩니다.'
  else detail='보스를 함께 잡을지, 상대를 공격할지 선택하세요.'
  tone='boss'
 }else if(game.phase==='SHELTER'){
  label='BOSS CLEAR'
  detail='보스전 승리 · 아이템을 보관한 뒤 다음 스테이지로 진행하세요.'
  tone='clear'
 }
 return <section className={`encounter-status ${tone}`}>
  <div>
   <small>CURRENT STATUS</small>
   <strong>{label}</strong>
  </div>
  <p>{detail}</p>
  <div className="status-flags">
   {game.banner==='BETRAYAL'&&<span className="betrayal-flag">BETRAYAL</span>}
   {game.notice&&<span className="status-notice">{game.notice}</span>}
  </div>
 </section>
}

export default function App(){
 const [game,setGame]=useState<GameState>(()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')||initialState()}catch{return initialState()}})
 const [modal,setModal]=useState<'info'|'test'|'inventory'|'log'|null>(null)
 const [selected,setSelected]=useState('')
 const update=(fn:(s:GameState)=>GameState)=>setGame(s=>fn(s))
 useEffect(()=>localStorage.setItem(KEY,JSON.stringify(game)),[game])

 const begin=()=>{
  if(!selected)return
  let s=initialState()
  s={...s,className:selected,visibleClass:selected==='이단숭배자'?'성직자':selected,phase:'NORMAL_BATTLE',fastMode:game.fastMode,personality:game.personality}
  setGame(startStage(s))
 }

 const die=(s:GameState):GameState=>log({...s,phase:'DEAD',player:{...s.player,hp:0,inventory:[]},enemy:null,boss:null,opponent:null,banner:'YOU DIED',notice:'미보관 아이템을 모두 잃었습니다.'},'PLAYER가 쓰러졌습니다.','미보관 아이템을 모두 잃었습니다.',`Floor ${s.floor} - Stage 1로 돌아갑니다.`)
 const bossWin=(s:GameState):GameState=>{
  const reward=addLoot([],s.fastMode?3:1)
  return log({...s,boss:s.boss?{...s.boss,hp:0}:null,player:{...s.player,inventory:[...s.player.inventory,...reward]},phase:'SHELTER',banner:'BOSS DEFEATED',notice:`보스 보상 +${reward.length}`},'BOSS 처치',`보스 보상 ${reward.length}개 획득 (프로토타입 임시 분배)`,'쉼터를 이용할 수 있습니다. (등장 규칙 미구체화)')
 }
 const enemyTurn=(s:GameState):GameState=>{
  if(!s.enemy||s.enemy.hp<=0)return s
  const hit=s.defending?Math.max(1,Math.floor(damage(s.enemy,s.player)/2)):damage(s.enemy,s.player)
  const player={...s.player,hp:s.player.hp-hit}
  const n=log({...s,player,defending:false},`${s.enemy.name} → PLAYER · ${hit} Damage${s.defending?' (방어)':''}`)
  return player.hp<=0?die(n):n
 }
 const attackEnemy=()=>update(s=>{
  if(!s.enemy)return s
  const hit=damage(s.player,s.enemy)
  const enemy={...s.enemy,hp:s.enemy.hp-hit}
  let n=log({...s,enemy,banner:'',notice:`-${hit}`},`PLAYER → ${enemy.name} · ${hit} Damage`)
  if(enemy.hp<=0){
   const count=s.fastMode?2:1
   n=log({...n,player:{...n.player,inventory:addLoot(n.player.inventory,count)},notice:`승리 · 전리품 +${count}`},`${enemy.name} 처치`,`아이템 ${count}개 획득`)
   return n
  }
  return enemyTurn(n)
 })

 function bossTurns(s:GameState):GameState{
  let n=s
  const bot=n.opponent
  if(bot&&bot.hp>0&&n.boss&&n.boss.hp>0){
   const betray=n.personality==='배신형'&&Math.random()<.55
   const targetPlayer=betray||(n.personality==='중립형'&&n.player.hp<28&&Math.random()<.25)
   if(targetPlayer){
    const h=damage(bot,n.player)
    n=log({...n,player:{...n.player,hp:n.player.hp-h},banner:'BETRAYAL',notice:`PLAYER -${h}`},`BOT → PLAYER · ${h} Damage`,'배신 발생')
   }else{
    const h=damage(bot,n.boss)
    n=log({...n,boss:{...n.boss,hp:n.boss.hp-h}},`BOT → BOSS · ${h} Damage`)
   }
  }
  if(n.player.hp<=0)return die(n)
  if(n.boss&&n.boss.hp<=0)return bossWin(n)
  if(n.boss&&n.boss.hp>0){
   const alive=[n.player,...(n.opponent&&n.opponent.hp>0?[n.opponent]:[])]
   const target=alive[Math.floor(Math.random()*alive.length)]
   const h=n.defending&&target.name==='PLAYER'?Math.max(1,Math.floor(damage(n.boss,target)/2)):damage(n.boss,target)
   if(target.name==='PLAYER')n=log({...n,player:{...n.player,hp:n.player.hp-h},defending:false},`BOSS → PLAYER · ${h} Damage`)
   else if(n.opponent)n=log({...n,opponent:{...n.opponent,hp:n.opponent.hp-h}},`BOSS → BOT · ${h} Damage`)
  }
  return n.player.hp<=0?die(n):n
 }

 const defend=()=>update(s=>{
  const n=log({...s,defending:true},'PLAYER가 방어 태세를 취했습니다.')
  return s.phase==='NORMAL_BATTLE'?enemyTurn(n):bossTurns(n)
 })
 const usePotion=()=>update(s=>{
  const i=s.player.inventory.find(x=>x.name==='체력 물약')
  if(!i)return {...s,notice:'체력 물약이 없습니다.'}
  return log({...s,player:{...s.player,hp:Math.min(s.player.maxHp,s.player.hp+25),inventory:s.player.inventory.filter(x=>x.id!==i.id)},notice:'HP +25'},'PLAYER가 체력 물약을 사용했습니다. (프로토타입 임시 규칙)')
 })
 const bossAttack=(target:'boss'|'bot')=>update(s=>{
  if(!s.boss||!s.opponent)return s
  const foe=target==='boss'?s.boss:s.opponent
  if(foe.hp<=0)return s
  const h=damage(s.player,foe)
  let n:GameState=target==='boss'
   ?{...s,boss:{...s.boss,hp:s.boss.hp-h},banner:'',notice:`BOSS -${h}`}
   :{...s,opponent:{...s.opponent,hp:s.opponent.hp-h},banner:'BETRAYAL',notice:`BOT -${h}`}
  n=log(n,`PLAYER → ${target==='boss'?'BOSS':'BOT'} · ${h} Damage`,...(target==='bot'?['배신 발생']:[]))
  if(target==='bot'&&n.opponent&&n.opponent.hp<=0){
   const stolen=n.opponent.inventory
   n=log({...n,player:{...n.player,inventory:[...n.player.inventory,...stolen]},notice:`상대 처치 · 전리품 +${stolen.length}`},'BOT이 쓰러졌습니다.',`BOT의 아이템 ${stolen.length}개를 획득했습니다.`)
  }
  if(target==='boss'&&n.boss&&n.boss.hp<=0)return bossWin(n)
  return bossTurns(n)
 })
 const store=(item:Item)=>update(s=>log({...s,player:{...s.player,inventory:s.player.inventory.filter(i=>i.id!==item.id)},storage:[...s.storage,item]},`${item.name}을(를) 보관했습니다.`))

 if(game.phase==='MENU')return <div className="landing"><div className="landing-shade"/><main><span className="kicker">PLAYABLE GAME DESIGN PROTOTYPE</span><h1>BETRAYAL<br/><i>TOWER</i></h1><p>함께 쓰러뜨릴 것인가.<br/>먼저 등을 돌릴 것인가.</p><button className="primary giant" onClick={()=>setGame({...game,phase:'CLASS_SELECT'})}>NEW RUN <span>→</span></button><button className="text-btn" onClick={()=>setModal('info')}>Prototype Info</button></main>{modal==='info'&&<Info onClose={()=>setModal(null)}/>}</div>

 if(game.phase==='CLASS_SELECT')return <div className="select-screen"><header className="select-head"><span className="kicker">CHOOSE YOUR ROLE</span><h1>직업 선택</h1><p>직업별 상세 능력은 아직 미구체화 상태입니다.</p></header><div className="class-grid">{classes.map(([name,role])=><button key={name} onClick={()=>setSelected(name)} className={selected===name?'selected':''}><span>{role}</span><b>{name}</b><small>상세 능력: 미구체화</small>{name==='이단숭배자'&&<em>상대에게 성직자로 표시</em>}</button>)}</div><div className="start-bar"><button className="secondary" onClick={()=>setGame({...game,phase:'MENU'})}>뒤로</button><button className="primary" disabled={!selected} onClick={begin}>START RUN · {selected||'직업을 선택하세요'}</button></div></div>

 const battlePhase=game.phase==='NORMAL_BATTLE'||game.phase==='BOSS_BATTLE'
 const latestLogs=game.battleLog.slice(0,8)
 const nextLabel=game.stage===30?`Floor ${game.floor+1}로`:game.stage%10===9?'다음: BOSS':'다음 스테이지'

 return <div className="game-shell">
  <header className="topbar">
   <div className="topbar-main">
    <div className="brand">BETRAYAL <b>TOWER</b><small>PROTOTYPE</small></div>
    <div className="run-info">
     <span><small>FLOOR</small><b>{String(game.floor).padStart(2,'0')}<em>/10</em></b></span>
     <span><small>STAGE</small><b>{String(game.stage).padStart(2,'0')}<em>/30</em></b></span>
     <span className="top-hp"><small>HP</small><b>{game.player.hp}/{game.player.maxHp}</b></span>
     <span><small>CLASS</small><b>{game.className}</b>{game.className==='이단숭배자'&&<em>VISIBLE: {game.visibleClass}</em>}</span>
    </div>
    <div className="tools"><button onClick={()=>setModal('info')}>INFO</button><button onClick={()=>setModal('test')}>⚙ TEST</button></div>
   </div>
   <ProgressHud game={game}/>
  </header>

  <main className="game-main">
   {!['DEAD','RUN_COMPLETE'].includes(game.phase)&&<EncounterStatus game={game}/>}
   {battlePhase&&<div className={`arena ${game.phase==='BOSS_BATTLE'?'boss-arena':''}`}>
    <FighterCard title="PLAYER" fighter={game.player} showLoot={game.phase==='BOSS_BATTLE'}/>
    {game.phase==='NORMAL_BATTLE'&&game.enemy&&<FighterCard title="ENEMY" fighter={game.enemy} tone="red"/>}
    {game.phase==='BOSS_BATTLE'&&game.boss&&game.opponent&&<><FighterCard title="BOSS" fighter={game.boss} tone="red"/><FighterCard title="OTHER PLAYER" fighter={game.opponent} showLoot/></>}
   </div>}

   {game.phase==='SHELTER'&&<section className="shelter">
    <div><span className="kicker">BOSS CLEAR</span><h2>쉼터</h2><p>보스전에서 승리했습니다. 아이템을 안전하게 보관한 뒤 계속 진행하세요.</p><mark>쉼터 등장 규칙: 미구체화</mark></div>
    <div><h3>보관하지 않은 아이템</h3><Inventory items={game.player.inventory} onUse={store}/></div>
    <div><h3>STORAGE · {game.storage.length}</h3><Inventory items={game.storage}/></div>
   </section>}

   {game.phase==='DEAD'&&<section className="death defeat-screen"><span>DEFEAT</span><h2>패배했습니다.</h2><p>미보관 아이템을 잃었습니다.<br/>보관된 아이템 {game.storage.length}개는 유지됩니다.<br/><b>Floor {game.floor} · Stage 1</b>에서 다시 시작합니다.</p><button className="primary" onClick={()=>update(s=>startStage({...s,stage:1,player:{...s.player,hp:s.player.maxHp,inventory:[]},banner:'',notice:''},s.floor,1))}>다시 일어서기</button></section>}

   {game.phase==='RUN_COMPLETE'&&<section className="death victory-screen"><span>PROTOTYPE END</span><h2>RUN COMPLETE</h2><p>10층 · 300 스테이지에 도달했습니다.</p><button className="primary" onClick={()=>setGame(initialState())}>메뉴로</button></section>}
  </main>

  {!['DEAD','RUN_COMPLETE'].includes(game.phase)&&<div className="actions">
   <span className="turn-label">YOUR TURN</span>
   {game.phase==='NORMAL_BATTLE'&&<>
    <button className="attack" disabled={!game.enemy||game.enemy.hp<=0} onClick={attackEnemy}>⚔<span>공격<small>ENEMY</small></span></button>
    <button disabled={!!game.enemy&&game.enemy.hp<=0} onClick={defend}>◈<span>방어<small>DAMAGE ½</small></span></button>
    <button disabled={!!game.enemy&&game.enemy.hp<=0} onClick={usePotion}>✦<span>아이템<small>POTION</small></span></button>
    {game.enemy&&game.enemy.hp<=0&&<button className="primary continue" onClick={()=>update(advance)}><span>{nextLabel}<small>{game.stage===30?'NEXT FLOOR':`STAGE ${game.stage+1}`}</small></span>→</button>}
   </>}
   {game.phase==='BOSS_BATTLE'&&<>
    <button className="attack" disabled={!game.boss||game.boss.hp<=0} onClick={()=>bossAttack('boss')}>⚔<span>보스 공격<small>COOPERATE</small></span></button>
    <button className="betray" disabled={!game.opponent||game.opponent.hp<=0} onClick={()=>bossAttack('bot')}>†<span>상대 공격<small>BETRAY</small></span></button>
    <button onClick={defend}>◈<span>방어<small>DAMAGE ½</small></span></button>
    <button onClick={usePotion}>✦<span>아이템<small>POTION</small></span></button>
   </>}
   {game.phase==='SHELTER'&&<button className="primary continue" onClick={()=>update(advance)}><span>{game.stage===30?'다음 층으로':'다음 스테이지'}<small>{game.stage===30?`FLOOR ${game.floor+1}`:`STAGE ${game.stage+1}`}</small></span>→</button>}
   <button className="mobile-only" onClick={()=>setModal('inventory')}>가방 {game.player.inventory.length}</button>
   <button className="mobile-only" onClick={()=>setModal('log')}>기록</button>
  </div>}

  <aside className="side">
   <div className="side-head"><span>INVENTORY</span><b>{game.player.inventory.length} · 가치 {lootValue(game.player.inventory)}</b></div>
   <Inventory items={game.player.inventory}/>
   <div className="side-head log-head">
    <span>RECENT LOG</span>
    <div className="side-head-actions"><button onClick={()=>setModal('log')}>ALL</button><button onClick={()=>update(s=>({...s,battleLog:[]}))}>CLEAR</button></div>
   </div>
   <div className="battle-log recent-log">{latestLogs.map((l,i)=><p key={i} className={/배신|BETRAYAL/.test(l)?'danger':''}>{l}</p>)}</div>
  </aside>

  {modal==='info'&&<Info onClose={()=>setModal(null)}/>}
  {modal==='test'&&<TestPanel game={game} close={()=>setModal(null)} update={update} reset={()=>setGame(initialState())}/>}
  {modal==='inventory'&&<Modal title="INVENTORY" close={()=>setModal(null)}><Inventory items={game.player.inventory}/></Modal>}
  {modal==='log'&&<Modal title="BATTLE LOG" close={()=>setModal(null)}><div className="battle-log log-modal">{game.battleLog.length===0?<p className="empty">기록 없음</p>:game.battleLog.map((l,i)=><p key={i} className={/배신|BETRAYAL/.test(l)?'danger':''}>{l}</p>)}</div></Modal>}
 </div>
}

function Modal({title,close,children}:{title:string;close:()=>void;children:ReactNode}){
 return <div className="modal-back" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="modal"><header><span>{title}</span><button onClick={close}>×</button></header>{children}</section></div>
}

function Info({onClose}:{onClose:()=>void}){
 const confirmed=['10층 / 층당 30 스테이지','10 · 20 · 30 스테이지 보스','턴제 전투와 아이템 획득','보스전에서 다른 플레이어와 조우','Boss와 Player 모두 공격 가능','협력과 배신 가능','상대 처치 시 미보관 아이템 탈취','죽으면 현재 층 Stage 1로 복귀','보관 아이템은 사망 후 유지','직업 시스템','이단숭배자는 상대에게 성직자로 보임']
 const tbd=['전투 밸런스와 계산식','직업별 능력 · 스킬 · 스킬 트리','성장 방식','일반 스테이지 종류','아이템 경제와 상세 구조','보스 패턴과 보상 분배','실제 멀티플레이 인원과 매칭','네트워크 구조','쉼터 등장 조건','세계관 · 스토리 · 최종 목표 · 엔드게임']
 return <Modal title="PROTOTYPE INFO" close={onClose}><div className="info-intro"><b>이것은 완성된 RPG가 아닙니다.</b><p>게임 아이디어를 실제로 만져보기 위한 플레이어블 프로토타입입니다.</p></div><div className="info-grid"><section><h3>확정된 게임 규칙</h3>{confirmed.map(x=><p key={x}>✓ {x}</p>)}</section><section><h3>아직 미구체화</h3>{tbd.map(x=><p key={x}>— {x}</p>)}</section></div><div className="prototype-rule"><b>PROTOTYPE RULE</b><p>전투 계산식: max(1, attack - defense). 적 수치, 아이템 효과, BOT 판단, 체력 물약, Loot Value, 보스 보상 분배는 프로토타입용 임시 규칙 / 실제 방식 미구체화.</p></div></Modal>
}

function TestPanel({game,close,update,reset}:{game:GameState;close:()=>void;update:(f:(s:GameState)=>GameState)=>void;reset:()=>void}){
 const jump=(stage:number)=>update(s=>startStage(s,s.floor,stage))
 return <Modal title="TEST PANEL" close={close}>
  <p className="test-note">기획 검증용 도구 · 아래 조작은 정식 게임 규칙이 아닙니다.</p>
  <label className="toggle"><input type="checkbox" checked={game.fastMode} onChange={e=>update(s=>({...s,fastMode:e.target.checked}))}/><span/> FAST TEST MODE</label>
  <div className="test-fields">
   <label>Floor<input type="number" min="1" max="10" value={game.floor} onChange={e=>update(s=>startStage(s,Math.max(1,Math.min(10,+e.target.value)),s.stage))}/></label>
   <label>Stage<input type="number" min="1" max="30" value={game.stage} onChange={e=>update(s=>startStage(s,s.floor,Math.max(1,Math.min(30,+e.target.value))))}/></label>
  </div>
  <h3>BOT Personality</h3>
  <div className="segmented">{(['협력형','중립형','배신형'] as Personality[]).map(p=><button className={game.personality===p?'active':''} key={p} onClick={()=>update(s=>setPersonality(s,p))}>{p}</button>)}</div>
  <div className="test-buttons">
   <button onClick={()=>update(advance)}>Next Stage</button>
   {[10,20,30].map(n=><button key={n} onClick={()=>jump(n)}>Go to Stage {n}</button>)}
   <button onClick={()=>jump(10)}>Start Boss Battle</button>
   <button onClick={()=>update(s=>({...s,phase:'SHELTER'}))}>Open Shelter</button>
   <button onClick={()=>update(s=>({...s,player:{...s.player,inventory:[...s.player.inventory,randomItem()]}}))}>Random Item</button>
   <button onClick={()=>update(s=>({...s,player:{...s.player,inventory:[]}}))}>Clear Inventory</button>
   <button onClick={()=>update(s=>({...s,player:{...s.player,hp:8}}))}>Set Player HP Low</button>
   <button onClick={()=>update(s=>({...s,opponent:s.opponent?{...s.opponent,hp:5}:s.opponent}))}>Set BOT HP Low</button>
   <button onClick={()=>update(s=>({...s,boss:s.boss?{...s.boss,hp:5}:s.boss}))}>Set Boss HP Low</button>
   <button className="danger-btn" onClick={()=>update(s=>({...s,player:{...s.player,hp:0,inventory:[]},phase:'DEAD',banner:'YOU DIED'}))}>Kill Player</button>
   <button className="danger-btn" onClick={()=>update(s=>s.opponent?{...s,opponent:{...s.opponent,hp:0},player:{...s.player,inventory:[...s.player.inventory,...s.opponent.inventory]},banner:'BETRAYAL'}:s)}>Kill BOT</button>
   <button className="danger-btn" onClick={reset}>Reset Run</button>
  </div>
 </Modal>
}
