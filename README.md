# Betrayal Tower — PvPvE Vertical Slice

React + TypeScript + Vite 기반의 웹 플레이어블 프로토타입입니다. 한 명의 사용자와 한 명의 AI 플레이어가 보스전에 참여하며, 협력과 배신 사이의 판단을 검증합니다.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Current Vertical Slice

- Player 1(사용자), Player 2(AI), Boss 동시 전투
- Speed 기반 Turn Queue
- 기본 공격, 스킬, 방어, 아이템
- 공격 시 Boss 또는 Other Player 선택
- 첫 직접 PvP 공격 시 `BETRAYAL`
- 플레이어 사망 후 생존자와 Boss의 전투 지속
- Boss 기본 공격, 강한 단일 공격, 광역 공격
- Boss 저체력 시 강한 행동 확률 증가
- 4개 데이터 기반 직업과 각 2개 스킬
- 타짜의 장갑: 보상 주사위 +5
- 인과응보의 거울: 처음 받은 PvP 피해 100% 반사 후 소모
- Boss 처치 후 1–100 주사위와 6개 아이템 교차 드래프트
- PC와 모바일 반응형 UI

## Architecture

- `src/game/types.ts`: 순수 전투/데이터 타입
- `src/game/data.ts`: 직업, 스킬, 아이템 데이터
- `src/game/engine.ts`: 전투 판정, 턴 진행, AI, 보상 로직
- `src/App.tsx`: 화면 상태와 UI 입력 연결

전투 엔진은 UI 컴포넌트를 참조하지 않습니다. 이후 네트워크 명령이나 서버 권위 모델로 교체할 때 동일한 `BattleAction` 입력 구조를 사용할 수 있습니다.

## Out of Scope

온라인 매칭, Steam 연동, 음성채팅, 장기 성장, 장비 장착, 스테이지 진행, 저장 상자, 실제 아이템 약탈은 이번 Vertical Slice에 포함하지 않습니다.

## Deployment

루트의 `vercel.json`을 사용해 Vercel에 Vite SPA로 배포할 수 있습니다.
