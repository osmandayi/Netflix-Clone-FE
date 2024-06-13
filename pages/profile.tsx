import useCurrentUser from "@/hooks/useCurrentUser";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface CardProps {
  name: string;
}

const useActiveUser = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const activeUser = JSON.parse(
      localStorage.getItem("activeUser") ?? '{"user": ""}'
    );
    if (activeUser.user !== "") {
      setUser(activeUser.user);
    }
  }, []);

  return user;
};

const ImagesUserProfile = ["blue", "green", "red", "slate"];
const src = ImagesUserProfile[Math.floor(Math.random() * 4)];

const CardUser: React.FC<CardProps> = ({ name }) => {
  const [ImgSrc, setImgSrc] = useState("red");

  const trySomething = useCallback(() => {
    setImgSrc(src);
  }, []);

  useEffect(() => {
    trySomething();
  }, []);

  return (
    <div className="group w-52 flex flex-col justify-center items-center">
      <div
        className="w-48 h-48 rounded-xl items-center
       justify-center border-2 border-transparent
       group-hover:border-white overflow-hidden"
      >
        <img draggable={false} src={`/images/default-${ImgSrc}.png`} />
      </div>

      <div className="group-hover:text-white mt-6 text-gray-300 text-2xl text-center lg:text-3xl">
        {name}
      </div>
    </div>
  );
};
const CardNewUser = () => {
  return (
    <div className="group w-52 flex flex-col justify-center items-center">
      <div
        className="w-48 h-48 rounded-xl flex items-center
       justify-center border-2 border-transparent
       group-hover:border-white overflow-hidden bg-zinc-500 bg-opacity-85 group-hover:bg-opacity-100"
      >
        <PlusIcon className="w-10 h-10 text-neutral-300 group-hover:text-white" />
      </div>

      <div className="group-hover:text-white mt-6 text-gray-300 text-2xl text-center lg:text-3xl">
        kullanıcı oluştur
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const router = useRouter();
  const user = useActiveUser();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  const selectProfile = useCallback(() => {
    // localStorage.setItem("activeUser", JSON.stringify({ user: user }));
    localStorage.setItem("activeProfile", src);
    router.push("/");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className="text-white text-4xl lg:text-7xl text-center">
          Who is watching ?{" "}
        </h1>

        <div className="flex items-center justify-center gap-8 mt-14">
          <div onClick={() => selectProfile()} className="flex flex-row gap-20">
            <CardUser name={user}></CardUser>
            <CardNewUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
