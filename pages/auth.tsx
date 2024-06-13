import Input from "@/components/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FaGit, FaGithub, FaGoogle } from "react-icons/fa";

const AuthPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginVariant, setLoginVariant] = useState("login");
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setLoginVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(() => {
    try {
      // await signIn("credentials", {
      //   email,
      //   password,
      //   redirect: false,
      //   callbackUrl: "/",
      // });
      localStorage.setItem("activeUser", JSON.stringify({ user: email }));

      router.push("/");
    } catch (error) {
      console.log("ERROR :", error);
    }
  }, [email, password, router]);
  const register = useCallback(() => {
    try {
      // await axios.post("/api/register", {
      //   email,
      //   name,
      //   password,
      // });
      login();
    } catch (error) {
      console.log("ERROR :", error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black h-full w-full bg-opacity-45">
        <nav className="px-12 py-6">
          <img src="/images/logo.png" alt="" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-85 p-20 self-center mt-2 lg:w-2/5 rounded-xl w-full">
            <h2 className="text-white text-5xl mb-8 font-semibold">
              {loginVariant === "login" ? "Sign-In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {loginVariant === "register" && (
                <Input
                  id="name"
                  label="Fullname"
                  onChange={(e: any) => setName(e.target.value)}
                  value={name}
                  type="text"
                />
              )}

              <Input
                id="email"
                label="Email Address"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
                type="email"
              />
              <Input
                id="password"
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
                type="password"
              />
            </div>
            <button
              onClick={loginVariant === "login" ? login : register}
              className="bg-red-700 py-3 text-white rounded-md w-full mt-10 hover:bg-red-800 transition"
            >
              {loginVariant === "login" ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-10 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profile" })}
                className="flex bg-white text-red-700 w-12 h-12 rounded-full items-center justify-center cursor-pointer"
              >
                <FaGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profile" })}
                className="flex bg-white text-black w-12 h-12 rounded-full items-center justify-center cursor-pointer"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-600 mt-12">
              {loginVariant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                className="text-white ml-2 cursor-pointer hover:underline transition"
                onClick={toggleVariant}
              >
                {loginVariant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
