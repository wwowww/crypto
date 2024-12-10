import { user } from "@/db/schema";
// drizzle-orm 라이브러리를 사용해 데이터베이스의 스키마 타입을 기반으로 TypeScript 타입을 추론하는 기능
// user.$inferSelect는 데이터베이스에서 해당 테이블(user)에서 조회(select)된 결과를 기반으로 TypeScript 타입을 유추
export type User = typeof user.$inferSelect;

// 예를 들어, 위 스키마에서 id, name, email 필드가 있다면, 다음과 같은 타입이 자동으로 생성
// type User = {
//   id: string;
//   name: string;
//   email: string;
// }
// 타입 추론 자동화, 유지보수 용이 등의 장점이 있음
// - 데이터베이스 테이블 구조를 변경하면, TypeScript 타입도 자동으로 업데이트
