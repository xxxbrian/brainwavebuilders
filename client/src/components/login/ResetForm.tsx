import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useCallback } from "react";

interface Props {
  email: string;
  onChangeEmail: (email: string) => void;
  password: string;
  onChangePassword: (password: string) => void;

  onClickBack: () => void;
  onClickSendResetEmail: () => void;
}

export const ResetForm: React.FC<Props> = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  onClickBack,
  onClickSendResetEmail,
}) => {
  const onChangeEmailInner = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeEmail(e.currentTarget.value);
    },
    [onChangeEmail],
  );

  const onChangePasswordInner = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangePassword(e.currentTarget.value);
    },
    [onChangePassword],
  );
  return (
    <Card variant="surface" size="4" style={{ width: 400 }}>
      <Box height="7" mb="4">
        <Heading as="h3" size="6" mt="-1">
          Reset password
        </Heading>
      </Box>
      <Box mb="5">
        <label>
          <Text as="div" size="2" weight="medium" mb="2">
            Email address
          </Text>
          <TextField.Input
            variant="surface"
            placeholder="Enter your email"
            value={email}
            onChange={onChangeEmailInner}
          />
        </label>
      </Box>

      <Box mb="5" position="relative">
        <label>
          <Text as="div" size="2" weight="medium" mb="2">
            Password
          </Text>
          <TextField.Input
            variant="surface"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={onChangePasswordInner}
          />
        </label>
      </Box>

      <Flex mt="6" justify="end" gap="3">
        <Button variant="soft" onClick={onClickBack}>
          Back
        </Button>
        <Button variant="solid" onClick={onClickSendResetEmail}>
          Confirm
        </Button>
      </Flex>
    </Card>
  );
};
