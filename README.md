# 코인 시세와 차트를 확인할 수 있는 코인 마켓
- 작업일지 보러가기: https://kwoneunjee.notion.site/14ab6a7ed2da80d99364e143f0a9765c?v=14ab6a7ed2da81a7ad0a000cec76ad95&pvs=4
- Demo: https://crypto-roan-one.vercel.app/
- 사용 도구 및 기술: `Typescript`, `NextJS`, `TailwindCSS`, `React Query`, `Zustand`, `Neon Postgres`


## 설명
코인의 시세를 확인할 수 있는 사이트입니다. 이전에 사용하면서 정확히 모르고 사용했던 기술이나, Next.js의 App Router 등 사용해보고 싶은 기술을 공부하기 위해 프로젝트를 진행했습니다. 데일리 작업 일지를 작성하며 오류, 개념, 기능 구현에 대해 작성했습니다.

<img width="600px" alt="코인 테이블 화면" src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fcf99ef79-8cd5-4ba7-a4bb-32555a37ce76%2Ff5b9f4d1-b3ea-4be5-aae9-ce8ce3d4d347%2F7405f6db-68aa-45e6-881c-df9c5db0f568.png?table=block&id=170b6a7e-d2da-800a-b9e4-f92f01402453&spaceId=cf99ef79-8cd5-4ba7-a4bb-32555a37ce76" />

<img width="600px" alt="코인 테이블 화면" src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fcf99ef79-8cd5-4ba7-a4bb-32555a37ce76%2F273b6f62-3a5f-45a1-a979-ed6333d3784f%2F0d240a01-6e8a-4140-aa37-e67c05e36864.png?table=block&id=170b6a7e-d2da-80f2-8780-fdfaa5507fce&spaceId=cf99ef79-8cd5-4ba7-a4bb-32555a37ce76" />

### Neon Postgres와 Drizzle ORM을 활용하여 필요한 API 구현

- Neon Postgres는 PostgreSQL 서버리스 데이터베이스로 빠르고 무료로 사용이 가능하고, Drizzle ORM은 TypeScript 환경에서 사용(타입 안정성을 제공)할 수 있다고 하여 사용해보기로 했습니다. 공식문서의 가이드를 따라하면 쉽게 테이블을 만들어 사용할 수 있어 간편하게 user 정보를 만들 수 있었습니다.
- [[개발환경] Neon Postgres과 Drizzle ORM을 활용해 테이블 만들기](https://www.notion.so/Neon-Postgres-Drizzle-ORM-42588752451d4dcfae9daef16e7d1b69?pvs=21)

### **TanStack React Table을 사용해** 테이블 구현

- 여러 테이블 라이브러리 중, 많이 사용하고, Typescript와 지원되며 용량이 가볍고, 대규모 데이터에 효율적으로 처리할 수 있다는 장점이 있고 한 번도 써본 적 없는 TanStack React Table를 사용해 테이블을 만들었습니다.
- 이전에 Material-UI Table을 사용 해본 적 있는데, 상대적으로 TanStack React Table이 진입 난이도는 높았지만 테이블에서 제공하는 filter나 등 다른 기능들이 잘 돼 있었고, 컴포넌트를 분리, 가독성 측면에서 좋다고 느꼈습니다.

### 유효성 검사 처리

- 기존에는 커스텀 훅을 만들어 함수로 유효성 검사를 처리했었는데, **Zod**를 사용하면서 **유효성 검사**가 훨씬 간결하고 직관적으로 변했습니다.
- 가독성이 좋아 코드 유지보수가 용이하고, 오류를 사전에 방지할 수 있다는 점이 장점이라 생각합니다.
    - [[사용자] 회원가입 + zod로 유효성검사 처리](https://www.notion.so/zod-156b6a7ed2da8078a078ceae6d04a695?pvs=21)

### react-financial-charts를 활용한 캔들차트 구현

- 유료 라이브러리와는 달리 무료로 제공되면서도 캔들 차트 구현에 필요한 핵심 기능을 쉽게 사용할 수 있어 매우 유용했습니다. 특히, 제로부터 구현해야 하는 번거로움 없이 **React 기반**에서 빠르게 커스터마이징 가능하고, 실시간 데이터 업데이트나 상호작용을 효율적으로 처리할 수 있는 점이 장점이었습니다.
    - [[사용자] **React-financial-charts 로 캔들차트 구현하기**](https://www.notion.so/React-financial-charts-c1d3bf49cdc14788a1000299aaf00d73?pvs=21)
