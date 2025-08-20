"use client";

import { Button, Card, Input, Label } from "@/components/ui";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, KeyboardEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/auth.context";

const SignInPage = () => {
  const router = useRouter();
  const { isLoggedIn, logIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickSignIn = () => {
    if (!email || !password) return;

    try {
      setIsLoading(true);
      logIn(email, "/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onkeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onClickSignIn();
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-[1rem] sm:px-0">
      <Card className="w-full max-w-3xl p-[2rem] sm:p-[5rem] rounded-4xl shadow-xl">
        <div className="text-center mb-5">
          <Image
            src="/images/yes_i_can.jpg"
            alt="Image"
            height={10}
            width={100}
            className="my-7 mx-auto"
          />
          <p className="text-gray-900 dark:text-white text-2xl font-bold mb-3">
            환영합니다!
          </p>
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={onkeyPress}
            className="w-full h-[50px]"
          />
        </div>
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="email">비밀번호</Label>
          <Input
            type={showPassword ? "text" : "password"}
            id="email"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={onkeyPress}
            className="w-full h-[50px]"
            icon={
              showPassword ? (
                <Eye className="text-gray-400" width={16} height={16} />
              ) : (
                <EyeOff className="text-gray-400" width={16} height={16} />
              )
            }
            iconPosition="end"
            iconClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        </div>

        <Button
          variant="default"
          onClick={onClickSignIn}
          disabled={isLoading}
          className="w-full h-[50px] bg-blue-600 font-bold text-xl mt-5 hover:bg-blue-500 "
        >
          로그인
        </Button>
      </Card>
    </div>
  );
};

export default SignInPage;
