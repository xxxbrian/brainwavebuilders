import type { Featured } from "@/backend";
import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/login/LoginForm";
import { RegisterForm } from "@/components/login/RegisterForm";
import { ResetForm } from "@/components/login/ResetForm";
import { VerificationForm } from "@/components/login/VerificationForm";
import { useBackend } from "@/hooks/useBackend";
import { Card, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {}

export const Login: React.FC<Props> = () => {
  const [featured, setFeatured] = useState<Featured | null>(null);
  const backend = useBackend();
  useEffect(() => {
    const inner = async () => {
      const { featured } = await backend.getFeatured({});
      setFeatured(featured);
    };

    void inner();
  }, [backend]);

  // step: "loggedin" | "login" | "register" | "reset"
  const [step, setStep] = useState<
    | "loggedin"
    | "login"
    | "register"
    | "reset"
    | "verify-register"
    | "verify-reset"
  >("login");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  const onChangeFirstName = (firstName: string) => {
    setFirstName(firstName);
  };

  const onChangeLastName = (lastName: string) => {
    setLastName(lastName);
  };

  const onChangeEmail = (email: string) => {
    setEmail(email);
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
  };

  const onChangeVerificationCode = (verificationCode: string) => {
    setVerificationCode(verificationCode);
  };

  const onClickCreateAccount = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setStep("register");
  };

  const onClickForgotPassword = () => {
    setStep("reset");
  };

  const onClickBack = () => {
    if (step === "register") {
      setPassword("");
      setStep("login");
    }
    if (step === "reset") {
      setPassword("");
      setStep("login");
    }
    if (step === "verify-register") {
      setPassword("");
      setStep("register");
    }
    if (step === "verify-reset") {
      setEmail("");
      setPassword("");
      setStep("reset");
    }
  };

  const onClickSignIn = () => {
    // noop
  };

  const onClickRegisterConfirm = () => {
    // noop
  };

  const onClickSendResetEmail = () => {
    // noop
  };

  const onClickVerify = () => {
    // noop
  };

  const getForm = () => {
    return (
      <>
        {" "}
        {step === "login" && (
          <LoginForm
            password={password}
            email={email}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onClickCreateAccount={onClickCreateAccount}
            onClickForgotPassword={onClickForgotPassword}
            onClickSignIn={onClickSignIn}
          />
        )}
        {step === "register" && (
          <RegisterForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            onChangeEmail={onChangeEmail}
            onChangeFirstName={onChangeFirstName}
            onChangeLastName={onChangeLastName}
            onChangePassword={onChangePassword}
            onClickRegisterConfirm={onClickRegisterConfirm}
            onClickBack={onClickBack}
          />
        )}
        {step === "reset" && (
          <ResetForm
            email={email}
            password={password}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onClickBack={onClickBack}
            onClickSendResetEmail={onClickSendResetEmail}
          />
        )}
        {step.startsWith("verify-") && (
          <VerificationForm
            email={email}
            verificationCode={verificationCode}
            onChangeVerificationCode={onChangeVerificationCode}
            onClickBack={onClickBack}
            onClickVerify={onClickVerify}
          />
        )}
      </>
    );
  };

  return (
    <div className="w-full h-full">
      {/* Background */}
      {featured?.background && (
        <div className="-z-10 lg:block hidden">
          <div className="bg-black opacity-70 w-full h-full absolute top-0 left-0 -z-10"></div>
          <img
            src={featured?.background}
            className="object-cover w-full h-full absolute left-0 top-0 -z-20"
            alt="background"
          />
        </div>
      )}

      <div className="mx-16 h-full flex flex-row lg:justify-between justify-center object-center lg:space-x-20">
        <div className="flex-col h-full justify-center ml-10 hidden lg:flex max-w-screen-sm">
          <div className="space-y-8">
            <Logo size="medium" variant="white"></Logo>
            <div className="text-white text-3xl lg:text-4xl xl:text-5xl font-extrabold">
              “{featured?.title}”
            </div>
            <div className="text-white font-bold text-xl">
              {featured?.description}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full flex-shrink-0 justify-center w-full lg:w-fit flex-1 items-center">
          <Card className="hidden lg:block p-4 min-w-[400px] backdrop-blur-sm w-fit">
            {getForm()}
          </Card>
          <div className="lg:hidden flex justify-center items-center w-full">
            <div className="flex-1 max-w-96">
              <Logo size="small" className="mx-auto my-8" variant="color" />
              {getForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
