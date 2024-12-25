"use client";

import { ChangeEvent, useEffect, useActionState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormCard from "./FormCard";
import FormMessage from "./FormMessage";
import Submit from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { LoginFormError } from "@/types";
import { LoginSchema } from "@/schemas/auth";
import { login } from "@/actions/login";
import toast from "react-hot-toast";
import { useUserStore } from "@/stores/useUserStore";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [error, action] = useActionState(login, undefined);
  const { errors, validateField } = useFormValidate<LoginFormError>(LoginSchema);
  const updateUser = useUserStore((state) => state.updateUser);
  const searchParams = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value)
  }

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage)
    }

    if (error?.user) {
      updateUser(error.user); 
    }

    if (searchParams.get("signupSuccess") === "true") {
      toast.success("회원가입이 완료되었습니다. 로그인 해주세요.");
    }
  }, [error, updateUser, searchParams]);

  return (
    <FormCard
      title="로그인"
      footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}
    >
      <form action={action} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            error={!!errors?.email}
            onChange={handleChange}
          />
          {errors?.email && <FormMessage message={errors?.email[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            error={!!errors?.password}
            onChange={handleChange}
          />
          {errors?.password && <FormMessage message={errors?.password[0]} />}
        </div>
        <Submit className="w-full">로그인</Submit>
      </form>
    </FormCard>
  )
}

export default LoginForm;