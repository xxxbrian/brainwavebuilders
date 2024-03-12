import type { SetPageState } from "@/pages/login";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  setPageState: SetPageState;
}

export const RegisterForm: React.FC<Props> = (Props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verficationCode, setVerificationCode] = useState<string>("");
  const [waitingForVerification, setWaitingForVerification] =
    useState<boolean>(false);

  const backend = useBackend();
  const createAccount = useCallback(async () => {
    // noop
  }, []);
  return (
    <Card variant="surface" size="4" style={{ width: 400 }}>
      {waitingForVerification ? (
        <>
          <Box height="7" mb="4">
            <Heading as="h3" size="6" mt="-1">
              Verify your email
            </Heading>
          </Box>

          <Box mb="5">
            <Text size="2" weight="medium" mb="2">
              We have sent a verification code to <strong>{email}</strong>.
              Please check your email and enter the code below.
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
                value={verficationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </label>
          </Box>
        </>
      ) : (
        <>
          <Box height="7" mb="4">
            <Heading as="h3" size="6" mt="-1">
              Register
            </Heading>
          </Box>

          <Box mb="5">
            <label>
              <Text as="div" size="2" weight="medium" mb="2">
                First name
              </Text>
              <TextField.Input
                variant="surface"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </Box>

          <Box mb="5">
            <label>
              <Text as="div" size="2" weight="medium" mb="2">
                Last name
              </Text>
              <TextField.Input
                variant="surface"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
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
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </Box>
        </>
      )}
      <Flex mt="6" justify="end" gap="3">
        {/* logic? verifi email first? */}
        {/* {waitingForVerification ? (
          <Button variant="solid" onClick={verificationCodeConfirm}>
            Confirm
          </Button>
        ) : (
          <Button variant="solid" onClick={createAccount}>
            Create account
          </Button>
        )} */}
      </Flex>
    </Card>
  );
};
