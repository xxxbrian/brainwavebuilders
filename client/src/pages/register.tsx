import { useBackend } from "@/hooks/useBackend";
import React, { useCallback, useEffect, useState } from "react";
import {
  Theme,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";

import { PanelBackgroundImage } from "@/components/sign/background";
import { useRouter } from "next/router";

export default function Register() {
  // const backend = useBackend();
  // const onClickTest = useCallback(async () => {
  //   const { seq } = await backend.ping({
  //     seq: 1,
  //   });
  //   console.log(seq);
  // }, [backend]);

  const router = useRouter();

  // automatically switch between light and dark themes based on user's system preferences
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  useEffect(() => {
    const updateAppearance = () => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setAppearance("dark");
      } else {
        setAppearance("light");
      }
    };
    updateAppearance();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateAppearance);
    return () => mediaQuery.removeEventListener("change", updateAppearance);
  }, []);

  // buisness logic
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verficationCode, setVerificationCode] = useState<string>("");
  const [waitingForVerification, setWaitingForVerification] =
    useState<boolean>(false);

  const backend = useBackend();
  const createAccount = useCallback(async () => {
    // TODO: Wait for backend implementation
    console.log("createAccount", { firstName, lastName, email, password });
    const { seq } = await backend.ping({
      seq: 1,
    });
    if (seq === 2) {
      setWaitingForVerification(true);
    }
  }, [backend, firstName, lastName, email, password]);

  const verficationCodeConfirm = useCallback(async () => {
    // TODO: Wait for backend implementation
    console.log("verficationCodeConfirm", { verficationCode });
    const { seq } = await backend.ping({
      seq: 1,
    });
    if (seq === 2) {
      router.push("/signin").catch(console.error);
    }
  }, [backend, verficationCode, router]);

  return (
    <Theme appearance={appearance} accentColor="orange">
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
            {waitingForVerification ? (
              <>
                <Box height="7" mb="4">
                  <Heading as="h3" size="6" mt="-1">
                    Verify your email
                  </Heading>
                </Box>

                <Box mb="5">
                  <Text size="2" weight="medium" mb="2">
                    We have sent a verification code to <strong>{email}</strong>
                    . Please check your email and enter the code below.
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
              {waitingForVerification ? (
                <Button variant="solid" onClick={verficationCodeConfirm}>
                  Confirm
                </Button>
              ) : (
                <Button variant="solid" onClick={createAccount}>
                  Create account
                </Button>
              )}
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Theme>
  );
}
