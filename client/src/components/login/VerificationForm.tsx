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
  verificationCode: string;
  onChangeVerificationCode: (verificationCode: string) => void;
  onClickBack: () => void;
  onClickVerify: () => void;
}

export const VerificationForm: React.FC<Props> = ({
  email,
  verificationCode,
  onChangeVerificationCode,
  onClickBack,
  onClickVerify,
}) => {
  const onChangeVerificationCodeInner = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeVerificationCode(e.currentTarget.value);
    },
    [onChangeVerificationCode],
  );
  return (
    <Card variant="surface" size="4" style={{ width: 400 }}>
      <Box height="7" mb="4">
        <Heading as="h3" size="6" mt="-1">
          Verify your email
        </Heading>
      </Box>

      <Box mb="5">
        <Text size="2" weight="medium" mb="2">
          We have sent a verification code to <strong>{email}</strong>. Please
          check your email and enter the code below.
        </Text>
      </Box>

      <Box mb="5">
        <label>
          <Text as="div" size="2" weight="medium" mb="2">
            Verification code
          </Text>
          <TextField.Input
            variant="surface"
            placeholder="Enter the code"
            value={verificationCode}
            onChange={onChangeVerificationCodeInner}
          />
        </label>
      </Box>
      <Flex mt="6" justify="end" gap="3">
        <Button variant="soft" onClick={onClickBack}>
          Back
        </Button>
        <Button variant="solid" onClick={onClickVerify}>
          Create
        </Button>
      </Flex>
    </Card>
  );
};
