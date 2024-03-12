import { useBackend } from "@/hooks/useBackend";
import React, { useCallback, useEffect, useState } from "react";
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

import { PanelBackgroundImage } from "@/components/sign/background";
import { useRouter } from "next/router";

export default function SignIn() {
  // const backend = useBackend();
  // const onClickTest = useCallback(async () => {
  //   const { seq } = await backend.ping({
  //     seq: 1,
  //   });
  //   console.log(seq);
  // }, [backend]);

  const router = useRouter();

  return (
    <Flex direction="column" mb="9" style={{ minHeight: "100vh" }}>
      <Flex justify="center" style={{ padding: 100 }}>
        <Flex
          align="center"
          justify="center"
          position="absolute"
          inset="0"
          style={{ overflow: "hidden" }}
        >
          <PanelBackgroundImage id="1" width="100%" height="200%" />
        </Flex>

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
              <TextField.Input
                variant="surface"
                placeholder="Enter your email"
              />
            </label>
          </Box>

          <Box mb="5" position="relative">
            <Box
              position="absolute"
              top="0"
              right="0"
              style={{ marginTop: -2 }}
            >
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
                router.push("/register").catch(console.error);
              }}
            >
              Create an account
            </Button>
            <Button variant="solid">Sign in</Button>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
