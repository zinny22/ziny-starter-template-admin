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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, KeyboardEvent } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { PasswordField, SelectField, TextField } from "@/components/common/field";
import { useIsMobile } from "@/hooks";
import { cn } from "@/lib/utils";

const SignUpPage = () => {
  const router = useRouter();
  const { isLoggedIn, login } = useAuthStore();
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    team: "",
    position: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSignUp = async () => {
    const { email, password, name, team, position } = formData;
    if (!email || !password || !name || !team || !position) return;

    try {
      setIsLoading(true);
      //  TODO: 회원가입 API 연결
      await new Promise((resolve) => setTimeout(resolve, 1500));
      login(email);
      router.replace("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onkeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignUp();
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
    <div className="h-screen overflow-y-hidden w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-500">
      <div
        className={`w-full max-w-xl transform transition-all duration-700 ease-out ${
          isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <Card className="border-none shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md overflow-hidden rounded-3xl ring-1 ring-black/5 max-h-[85vh] flex flex-col">
          <CardHeader
            className={cn(
              "flex flex-col items-center pb-2  flex-shrink-0",
              isMobile ? "pt-2" : "pt-8"
            )}
          >
            {isMobile ? null : (
              <div
                className={`relative w-20 h-20 mb-4 transform transition-all duration-700 delay-100 ${
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
            )}
            <CardTitle className="text-2xl font-bold tracking-tight text-center">
              회원가입
            </CardTitle>
            <CardDescription className="text-center text-slate-500 dark:text-slate-400">
              새로운 계정을 만들어 시작하세요
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2 overflow-y-auto">
            <div
              className={cn(
                "space-y-4 transition-all duration-700 delay-200",
                isMounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
                "pb-7"
              )}
            >
              <TextField
                label="이메일"
                icon={Mail}
                id="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                onKeyDown={onkeyPress}
              />
              <PasswordField
                label="비밀번호"
                value={formData.password}
                onChange={(value) => handleChange("password", value)}
                placeholder="••••••••"
              />
              <TextField
                label="이름"
                icon={User}
                id="name"
                placeholder="실명을 입력해주세요"
                value={formData.name}
                onChange={(value) => handleChange("name", value)}
                onKeyDown={onkeyPress}
              />

              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="소속 팀"
                  placeholder="팀 선택"
                  options={[
                    { value: "development", label: "개발팀" },
                    { value: "design", label: "디자인팀" },
                    { value: "marketing", label: "마케팅팀" },
                    { value: "sales", label: "영업팀" },
                    { value: "hr", label: "인사팀" },
                  ]}
                  value={formData.team}
                  onChange={(value) => handleChange("team", value)}
                />
                <SelectField
                  label="직책"
                  placeholder="직책 선택"
                  options={[
                    { value: "intern", label: "인턴" },
                    { value: "junior", label: "주니어" },
                    { value: "senior", label: "시니어" },
                    { value: "lead", label: "리드" },
                    { value: "manager", label: "매니저" },
                    { value: "director", label: "이사" },
                  ]}
                  value={formData.position}
                  onChange={(value) => handleChange("position", value)}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-y-2 px-8 ">
            <Button
              onClick={handleSignUp}
              disabled={
                isLoading ||
                !formData.email ||
                !formData.password ||
                !formData.name ||
                !formData.team ||
                !formData.position
              }
              className={`group w-full h-12 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 ${
                isLoading
                  ? "cursor-not-allowed opacity-70"
                  : "hover:-translate-y-0.5"
              }`}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              )}
              회원가입
            </Button>

            <div className="text-center text-xs text-slate-500 mt-2">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors"
              >
                로그인하기
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
