import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AccountProps {
  visible?: boolean;
  ImgSrc: string;
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

const AccountMenu: React.FC<AccountProps> = ({ visible = false, ImgSrc }) => {
  const router = useRouter();
  const user = useActiveUser();

  if (!visible) {
    return null;
  }

  const signOut = () => {
    localStorage.removeItem("activeUser");
    router.push("/auth");
  };

  return (
    <div
      className="
        bg-gray-950 w-48 absolute rounded-lg border-2
        top-8 right-0 py-5 flex-col border-gray-800 flex
      "
    >
      <div className="flex flex-col gap-3">
        <div
          className="px-3 group flex flex-row gap-3 items-center w-full"
          onClick={() => router.push("/profile")}
        >
          <img src={`/images/default-${ImgSrc}.png`} alt="" className="w-6" />
          <p className="cursor-pointer text-white text-lg hover:underline">
            {user}
          </p>
        </div>
        <hr className="bg-gray-500 border-0 h-px my-4" />
        <div
          onClick={signOut}
          className="px-3 text-white text-center hover:underline cursor-pointer"
        >
          Sign Out Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
