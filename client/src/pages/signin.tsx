import { useBackend } from "@/hooks/useBackend";
import React, { useCallback, useEffect, useState } from "react";
import { 
  Theme,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Text,
  TextField,
 } from '@radix-ui/themes';

import { PanelBackgroundImage } from '@/components/sign/background';

export default function SignIn() {
  const backend = useBackend();
  const onClickTest = useCallback(async () => {
    const { seq } = await backend.ping({
      seq: 1,
    });
    console.log(seq);
  }, [backend]);
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const updateAppearance = () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setAppearance('dark');
      } else {
        setAppearance('light');
      }
    };
    updateAppearance();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateAppearance);
    return () => mediaQuery.removeEventListener('change', updateAppearance);
  }, []);
  return (
    <Theme appearance={appearance} accentColor="orange">
      <Flex direction="column" mb="9" style={{ minHeight: '100vh' }}>
        <Flex justify="center" style={{ padding: 100 }}>
          <Flex
            align="center"
            justify="center"
            position="absolute"
            inset="0"
            style={{ overflow: 'hidden' }}
          >
            <PanelBackgroundImage id="1" width="100%" height="200%" />
          </Flex>

          <Card variant="classic" size="4" style={{ width: 400 }}>
            <Box height="7" mb="4">
              <Heading as="h3" size="6" mt="-1">
                Sign up
              </Heading>
            </Box>

            <Box mb="5">
              <label>
                <Text as="div" size="2" weight="medium" mb="2">
                  First name
                </Text>
                <TextField.Input variant="surface" placeholder="Enter your first name" />
              </label>
            </Box>

            <Box mb="5">
              <label>
                <Text as="div" size="2" weight="medium" mb="2">
                  Last name
                </Text>
                <TextField.Input variant="surface" placeholder="Enter your last name" />
              </label>
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
                <TextField.Input variant="surface" placeholder="Password" type="Enter your password" />
              </label>
            </Box>

            <Flex mt="6" justify="end" gap="3">
              <Button variant="soft">
                Create an account
              </Button>
              <Button variant="solid">Sign in</Button>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Theme>
  );
}
