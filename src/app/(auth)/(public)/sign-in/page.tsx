"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, KeyboardEvent } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/shared/providers";

const SignInPage = () => {
  const router = useRouter();
  const { isLoggedIn, logIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const onClickSignIn = async () => {
    if (!email || !password) return;

    try {
      setIsLoading(true);
      await logIn(email, "/");
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
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-500">
      <div
        className={`w-full max-w-xl transform transition-all duration-700 ease-out ${
          isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <Card className="border-none shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md overflow-hidden rounded-3xl ring-1 ring-black/5">
          <CardHeader className="space-y-1 flex flex-col items-center pb-2 pt-8">
            <div
              className={`relative w-24 h-24 mb-4 transform transition-all duration-700 delay-100 ${
                isMounted ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              <Image
                src="/images/yes_i_can.jpg"
                alt="Logo"
                fill
                className="object-cover rounded-2xl shadow-lg"
              />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-center">
              환영합니다!
            </CardTitle>
            <CardDescription className="text-center text-slate-500 dark:text-slate-400">
              계정에 로그인하여 계속하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4 px-8">
            <div
              className={`space-y-4 transition-all duration-700 delay-200 ${
                isMounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="space-y-2 group">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium transition-colors group-focus-within:text-indigo-600"
                >
                  이메일
                </Label>
                <div className="relative transition-all duration-300 transform focus-within:scale-[1.01]">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-indigo-600" />
                  <Input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={onkeyPress}
                    className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-600 transition-all shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-2 group">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium transition-colors group-focus-within:text-indigo-600"
                  >
                    비밀번호
                  </Label>
                </div>
                <div className="relative transition-all duration-300 transform focus-within:scale-[1.01]">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-indigo-600" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={onkeyPress}
                    className="pl-10 pr-10 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-600 transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-8 pb-8 pt-2">
            <Button
              onClick={onClickSignIn}
              disabled={isLoading || !email || !password}
              className={`w-full h-12 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 ${
                isLoading
                  ? "cursor-not-allowed opacity-70"
                  : "hover:-translate-y-0.5"
              }`}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-5 w-5" />
              )}
              로그인
            </Button>

            <div className="text-center text-sm text-slate-500 mt-2">
              계정이 없으신가요?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors"
              >
                회원가입하기
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
