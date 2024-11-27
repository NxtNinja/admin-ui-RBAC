import { fetcher } from "@/helper/apiHelper";
import { User } from "@/utils/types";
import { userAtom } from "@/utils/userAtom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const { data, isSuccess, isFetched } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const data = await fetcher<User>("user/me");
      setUser(data);
      return data;
    },
  });

  console.log(user);

  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueryData<User>(["currentUser"]);

  console.log("Cached User Data:", cachedData);

  if (isFetched && isSuccess) {
    return (
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Brand Text */}
          <div
            className="text-2xl font-semibold cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            ADMIN PANEL
          </div>

          {/* Avatar */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/64/64572.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <p className="">{data.fullName}</p>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
