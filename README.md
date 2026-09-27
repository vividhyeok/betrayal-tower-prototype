# Betrayal Tower — Floor 1 Prototype

React + TypeScript + Vite 기반 턴제 PvPvE 웹 프로토타입입니다. Stage 1부터 장비를 파밍하고 Stage 10에서 AI 플레이어와 협력하거나 배신할 수 있습니다.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Playable Flow

- Stage 1–8: 일반 몬스터 싱글 전투
- Stage 9: 오우거 엘리트 전투
- Stage 10: Player 1 + AI Player + Boss PvPvE 전투
- 일반전 승리: Gold 획득, 확률적으로 장비 3개 중 1개 선택
- Stage 전환: HP와 Mana 완전 회복
- Stage 10: 배신, 인과응보의 거울, 타짜의 장갑, 주사위와 교차 드래프트

## Systems

- Speed Turn Queue
- Accuracy / Evasion / MISS
- HP / Mana / Skill Mana Cost
- Base Stats + Item Modifiers
- Attack, Max HP, Defense, Max Mana, Accuracy, Evasion 장비 효과
- 일반·엘리트·보스 StageData
- 공격자/대상 강조, 공격선, Hit Animation, Damage/Heal/Miss Number
- 플레이어별 배신 상태와 최초 배신 확인 모달
- AI 최초 배신 중앙 경고
- StatusEffect 타입 기반: freeze, burn, poison, stun 확장 준비

## Architecture

- `src/game/types.ts`: 데이터와 상태 계약
- `src/game/data.ts`: Job, Skill, Enemy, Item, Stage 데이터
- `src/game/engine.ts`: 전투, 턴, 명중, 피해, AI, 배신, 보스 Loot
- `src/game/stageEngine.ts`: Run 진행, Stage 연결, 일반전 보상
- `src/App.tsx`: UI와 사용자 입력

## Out of Scope

온라인 매칭, Steam 연동, 음성채팅, 실제 아이템 약탈, 장비 슬롯 제한, reroll, 장기 저장, 상태이상의 실제 전투 적용은 이후 범위입니다.

## Deployment

`vercel.json`을 이용해 Vercel에 Vite SPA로 배포할 수 있습니다.
