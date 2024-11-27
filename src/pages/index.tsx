import { useEffect } from "react";
import { useRouter } from "next/router";
import EmployeeTable from "@/components/EmployeeTable";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    router.push("/auth/login");
  }, [router]);

  return (
    <>
      {/* You can keep this content for later use */}
      <EmployeeTable />
    </>
  );
};

export default Index;
