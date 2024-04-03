import { Course, isAPIError } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import { Button, Dialog, DropdownMenu, Select } from "@radix-ui/themes";
import { PropsWithChildren, useCallback, useState } from "react";

interface Props extends PropsWithChildren {
  course: Course;
}

export const StatefulInviteMembersForm: React.FC<Props> = ({
  children,
  course,
}) => {
  const backend = useBackend();
  const [role, setRole] = useState("STUDENT");
  const [invitationCode, setInvitationCode] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const onClickInvite = useCallback(async () => {
    try {
      const { code } = await backend.createCourseInvitation({
        courseId: course.id,
        role,
      });

      setInvitationCode(code);
    } catch (e) {
      if (isAPIError(e)) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  }, [backend, course.id, role]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      {error ? (
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Something went wrong.</Dialog.Title>
          <div className="flex flex-col space-y-2">
            <div>{error}</div>
          </div>
        </Dialog.Content>
      ) : invitationCode ? (
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Your invitation code is ready</Dialog.Title>
          <div className="flex flex-col space-y-2">
            <div>Please use the following code to join the classroom.</div>
            <div className="text-5xl">{invitationCode}</div>
          </div>
        </Dialog.Content>
      ) : (
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Invite members to {course.name}</Dialog.Title>
          <div className="flex space-x-2 items-center">
            <div>Role</div>
            <Select.Root
              defaultValue="STUDENT"
              value={role}
              onValueChange={setRole}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="STUDENT">Student</Select.Item>
                <Select.Item value="TEACHER">Teacher</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
          <div className="flex justify-end">
            <Button onClick={onClickInvite}>Invite</Button>
          </div>
        </Dialog.Content>
      )}
    </Dialog.Root>
  );
};
