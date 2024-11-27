import React from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/helper/apiHelper";
import { User, UserArray } from "@/utils/types";
import EditUserModal from "./EditUserModal";

const EmployeeTable = () => {
  // Fetch current user data
  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetcher<User>("user/me"),
  });

  // Fetch employee data based on the current user's role
  const {
    data: employeeData,
    isFetched,
    isSuccess,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["employeeAndManager"],
    queryFn: () => {
      try {
        const api =
          currentUser?.departmentsLink[0].role === "ADMIN"
            ? "employeeinfo/allEmployee"
            : "employeeinfo";
        return fetcher<UserArray>(api);
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!currentUser,
  });

  // Handle loading and error states
  if (isLoading || isFetching) {
    return (
      <div className="flex items-center gap-3 justify-center h-[90dvh]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="w-16 h-16"
        >
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity="0.25"
          />
          <path
            fill="currentColor"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
          >
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
        </svg>
        <p className="">Loading Employee Information</p>
      </div>
    );
  }

  if (!isSuccess || !employeeData) {
    return (
      <div className="grid place-items-center h-[90dvh]">
        {currentUser?.departmentsLink[0].role} is not allowed to access employee
        information
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="grid place-items-center h-[90dvh]">
        Please login first to get access
      </div>
    );
  }

  console.log(employeeData);

  if (isSuccess && isFetched) {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 min-h-[90dvh]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Job Title
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
              {currentUser?.departmentsLink[0].role === "ADMIN" && (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr
                key={employee.id}
                className={clsx(
                  "bg-white border-b dark:bg-gray-800 dark:border-gray-700",
                  employee.departmentsLink[0]?.role !== "USER" && "bg-yellow-50"
                )}
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {employee.fullName}
                </td>
                <td className="px-6 py-4">{employee.username}</td>
                <td className="px-6 py-4">
                  {employee.departmentsLink[0]?.jobTitle || "N/A"}
                </td>
                <td className="px-6 py-4">
                  {employee.departmentsLink[0]?.department.name || "N/A"}
                </td>
                <td className="px-6 py-4">
                  {employee.departmentsLink[0]?.role || "N/A"}
                </td>
                <td className="px-6 py-4">{employee.salary}</td>
                {currentUser?.departmentsLink[0].role === "ADMIN" && (
                  <td className="px-6 py-4 cursor-pointer">
                    <EditUserModal
                      role={employee.departmentsLink[0].role}
                      id={employee.id}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default EmployeeTable;
