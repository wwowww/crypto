import { useState } from "react"
import { ZodObject, ZodRawShape } from "zod";

export const useFormValidate = <T>(schema: ZodObject<ZodRawShape>) => {
  const [errors, setErrors] = useState<Partial<T>>();

  const validateField = (name: string, value: string) => {
    setErrors({
      ...errors,
      [name]: undefined, // 에러메세지 초기화
    })

    const parseValue = schema.pick({ [name]: true }).safeParse({
      [name]: value
    });

    console.log(parseValue, "parseValue")

    if (!parseValue.success) {
      setErrors({
        ...errors, // 기존 에러 객체 복사
        ...parseValue.error.flatten().fieldErrors // 필드에러스 객체 복사
      })
    }
  }

  return { errors, validateField }
}