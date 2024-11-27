import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { poster } from "@/helper/apiHelper";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const EditUserModal = ({ role, id }: { role: string; id: string }) => {
  const queryClient = useQueryClient();

  const [newRole, setNewRole] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Manage dialog visibility

  const changeRole = async (newRole: string) => {
    const payload = {
      employeeId: id,
    };

    console.log(newRole);

    if (newRole === "USER") {
      await poster("user/demote", payload);
    } else {
      await poster("user/promote", payload);
    }

    setNewRole("");
    queryClient.refetchQueries({ queryKey: ["employeeAndManager"] });
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <p className="font-medium text-blue-600 hover:underline">Edit</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Role</DialogTitle>
            <DialogDescription>
              You can change the user role. Changing from user to manager will
              promote the user to the manager role in its department.
            </DialogDescription>
          </DialogHeader>
          <Select onValueChange={setNewRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={role} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="MANAGER">MANAGER</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            disabled={newRole && newRole !== role ? false : true}
            onClick={() => changeRole(newRole)}
            variant={"default"}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserModal;
