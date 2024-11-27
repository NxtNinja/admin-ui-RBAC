import { userAtom } from "@/utils/userAtom";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const [userData] = useAtom(userAtom);

  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useLogout();

  const logoutUser = () => {
    logout();
    queryClient.removeQueries();
  };

  if (userData) {
    return (
      <div className="p-4 md:p-8 bg-white dark:bg-gray-900 shadow rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl mb-6 underline text-gray-800 dark:text-gray-100">
            Profile Information
          </h1>
          {isPending ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={logoutUser} variant={"destructive"}>
              Logout
            </Button>
          )}
        </div>
        <div className="space-y-6">
          {/* Email Section */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Email
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {userData?.username || "Not Available"}
            </p>
          </div>

          {/* Full Name Section */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {userData?.fullName || "Not Available"}
            </p>
          </div>

          {/* Departments Section */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Departments
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData?.departmentsLink?.length > 0 ? (
                userData.departmentsLink.map((link: any) => (
                  <div
                    key={link.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Department:</span>{" "}
                      {link.department?.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Title:</span>{" "}
                      {link.jobTitle || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Role:</span>{" "}
                      {link.role || "N/A"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No department information available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
