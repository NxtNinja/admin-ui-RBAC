import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcher } from "@/helper/apiHelper";
import { useRegister } from "@/hooks/useAuth";
import { registerSchema, Registerschemtype } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Department } from "@/utils/types";
import { useState } from "react";

export function SignupForm() {
  const [role, setRole] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Registerschemtype>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerNewUser, isPending } = useRegister();

  const {
    data: departments,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: () => fetcher<Department[]>("auth/departments"),
  });

  console.log(departments);

  const registerUser = async (data: Registerschemtype) => {
    if (role && departmentId) {
      const reqObj = {
        fullName: data.fullName,
        username: data.username,
        password: data.password,
        contactInfo: data.contactInfo,
        role: role,
        departmentId: departmentId,
      };
      try {
        registerNewUser(reqObj);
      } catch (error) {
        console.error("Login Error: ", error);
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(registerUser)}>
          <div className="grid gap-4">
            {/* Full Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                {...register("fullName")}
                id="fullname"
                type="text"
                placeholder="Your Full Name"
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Username Field */}
            <div className="grid gap-2">
              <Label htmlFor="username">Email</Label>
              <Input
                {...register("username")}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Your password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Contact Info Field */}
            <div className="grid gap-2">
              <Label htmlFor="contactInfo">Contact Info</Label>
              <Input
                {...register("contactInfo")}
                id="contactInfo"
                type="text"
                placeholder="Your contact info"
              />
              {errors.contactInfo && (
                <p className="text-red-500">{errors.contactInfo.message}</p>
              )}
            </div>

            {/* Role Selection Field */}
            <div className="grid gap-2">
              <Select onValueChange={setRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={"Select Role"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="USER">USER</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!role && <p className="text-red-500">Select a Role</p>}
            </div>

            {/* Department Selection Field */}
            <div className="grid gap-2">
              <Select onValueChange={setDepartmentId}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={"Select Department"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Department</SelectLabel>
                    {isFetched &&
                      isSuccess &&
                      departments.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!departmentId && (
                <p className="text-red-500">Select a Department</p>
              )}
            </div>

            {/* Submit Button */}
            {isPending ? (
              <Button disabled>
                <Loader2 className="animate-spin w-full" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Register
              </Button>
            )}
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
