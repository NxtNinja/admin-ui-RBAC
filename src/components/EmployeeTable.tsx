import React, { useState } from "react";
import clsx from "clsx";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/userAtom";

const EmployeeTable = () => {
  const [user] = useAtom(userAtom);

  console.log(user);

  // State to track the user's role
  const [role, setRole] = useState("ADMIN"); // Change to 'USER' to see the difference
  const [employeeIdToEdit, setEmployeeIdToEdit] = useState<number>();

  // Mock data for employees
  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      title: "Software Engineer",
      department: "Development",
      role: "USER",
      salary: "$80,000",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      title: "Project Manager",
      department: "Management",
      role: "ADMIN",
      salary: "$95,000",
    },
    {
      id: 3,
      name: "Sam Johnson",
      email: "sam.johnson@example.com",
      title: "UX Designer",
      department: "Design",
      role: "USER",
      salary: "$70,000",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      title: "Data Analyst",
      department: "Analytics",
      role: "ADMIN",
      salary: "$90,000",
    },
  ];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Employee name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Title</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Department</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Role</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Salary</div>
            </th>
            {role === "ADMIN" && (
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-end">Action</div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className={clsx(
                "bg-white border-b dark:bg-gray-800 dark:border-gray-700",
                employee.role !== "USER" && "bg-yellow-50"
              )}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {employee.name}
              </th>
              <td className="px-6 py-4">{employee.email}</td>
              <td className="px-6 py-4">{employee.title}</td>
              <td className="px-6 py-4">{employee.department}</td>
              <td className="px-6 py-4">{employee.role}</td>
              <td className="px-6 py-4">{employee.salary}</td>
              {role === "ADMIN" && (
                <td
                  className="px-6 py-4 text-right"
                  onClick={() => setEmployeeIdToEdit(employee.id)}
                >
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
