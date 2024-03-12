import type { SetPageState } from "@/pages/login";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Text,
  TextField,
} from "@radix-ui/themes";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  setPageState: SetPageState;
}

export const LoginForm: React.FC<Props> = (Props) => {
  return (
    <Card variant="surface" size="4" style={{ width: 400 }}>
      <Box height="7" mb="4">
        <Heading as="h3" size="6" mt="-1">
          Sign in
        </Heading>
      </Box>

      <Box mb="5">
        <label>
          <Text as="div" size="2" weight="medium" mb="2">
            Email address
          </Text>
          <TextField.Input variant="surface" placeholder="Enter your email" />
        </label>
      </Box>

      <Box mb="5" position="relative">
        <Box position="absolute" top="0" right="0" style={{ marginTop: -2 }}>
          <Link href="#card" size="2">
            Forgot password?
          </Link>
        </Box>

        <label>
          <Text as="div" size="2" weight="medium" mb="2">
            Password
          </Text>
          <TextField.Input
            variant="surface"
            placeholder="Password"
            type="Enter your password"
          />
        </label>
      </Box>

      <Flex mt="6" justify="end" gap="3">
        <Button
          variant="soft"
          onClick={() => {
            Props.setPageState("register");
          }}
        >
          Create an account
        </Button>
        <Button variant="solid">Sign in</Button>
      </Flex>
    </Card>
  );
};
