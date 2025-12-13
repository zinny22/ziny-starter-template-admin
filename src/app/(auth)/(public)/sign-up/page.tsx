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
import { useAuth } from "@/shared/providers";

const SignUpPage = () => {
  const router = useRouter();
  const { isLoggedIn, logIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    team: "",
    position: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
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
      logIn(email, "/");
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
          <CardHeader className="space-y-1 flex flex-col items-center pb-2 pt-8 flex-shrink-0">
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
            <CardTitle className="text-2xl font-bold tracking-tight text-center">
              회원가입
            </CardTitle>
            <CardDescription className="text-center text-slate-500 dark:text-slate-400">
              새로운 계정을 만들어 시작하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2 px-8 overflow-y-auto">
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
                  className="text-xs font-medium text-slate-500 ml-1"
                >
                  이메일
                </Label>
                <div className="relative transition-all duration-300 transform focus-within:scale-[1.01]">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-indigo-600 z-10" />
                  <Input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={onkeyPress}
                    className="pl-10 h-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-600 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium text-slate-500 ml-1"
                >
                  비밀번호
                </Label>
                <div className="relative transition-all duration-300 transform focus-within:scale-[1.01]">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-indigo-600 z-10" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={onkeyPress}
                    className="pl-10 pr-10 h-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-600 transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-10"
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2 group">
                <Label
                  htmlFor="name"
                  className="text-xs font-medium text-slate-500 ml-1"
                >
                  이름
                </Label>
                <div className="relative transition-all duration-300 transform focus-within:scale-[1.01]">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-indigo-600 z-10" />
                  <Input
                    type="text"
                    id="name"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={handleChange}
                    onKeyPress={onkeyPress}
                    className="pl-10 h-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-600 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <Label
                    htmlFor="team"
                    className="text-xs font-medium text-slate-500 ml-1"
                  >
                    소속 팀
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("team", value)}
                    value={formData.team}
                  >
                    <SelectTrigger className="h-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-indigo-600 w-full">
                      <SelectValue placeholder="팀 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">개발팀</SelectItem>
                      <SelectItem value="design">디자인팀</SelectItem>
                      <SelectItem value="marketing">마케팅팀</SelectItem>
                      <SelectItem value="sales">영업팀</SelectItem>
                      <SelectItem value="hr">인사팀</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 group">
                  <Label
                    htmlFor="position"
                    className="text-xs font-medium text-slate-500 ml-1"
                  >
                    직책
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("position", value)
                    }
                    value={formData.position}
                  >
                    <SelectTrigger className="h-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-indigo-600 w-full">
                      <SelectValue placeholder="직책 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="intern">인턴</SelectItem>
                      <SelectItem value="junior">주니어</SelectItem>
                      <SelectItem value="senior">시니어</SelectItem>
                      <SelectItem value="lead">리드</SelectItem>
                      <SelectItem value="manager">매니저</SelectItem>
                      <SelectItem value="director">이사</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-8 pb-8 pt-2">
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
              className={`w-full h-12 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 ${
                isLoading
                  ? "cursor-not-allowed opacity-70"
                  : "hover:-translate-y-0.5"
              }`}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-5 w-5" />
              )}
              회원가입
            </Button>

            <div className="text-center text-sm text-slate-500 mt-2">
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
