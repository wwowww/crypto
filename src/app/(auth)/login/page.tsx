import LoginForm from "@/components/auth/LoginForm";
import Spinner from "@/components/Skeleton/Spinner";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
