'use client';

import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormCard from "./FormCard";
import Submit from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { SignUpSchema } from "@/schemas/auth";
import { SignUpFormError } from "@/types";
import FormMessage from "./FormMessage";
const SignUpForm = () => {
  const {errors, validateField} = useFormValidate<SignUpFormError>(SignUpSchema);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    validateField(name, value);
  }

  return (
    <FormCard
      title="회원가입"
      footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}
    >
      <form className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input 
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            onChange={handleChange}
            error={!!errors?.name}
          />
          {errors?.name && <FormMessage message={errors.name[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            onChange={handleChange}
            error={!!errors?.email}
          />
          {errors?.email && <FormMessage message={errors.email[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            error={!!errors?.password}
          />
          {errors?.password && <FormMessage message={errors.password[0]} />}
        </div>
        <Submit className="w-full">가입하기</Submit>
      </form>
    </FormCard>
  )
}
export default SignUpForm;