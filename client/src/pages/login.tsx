import type { User, Featured } from "@/backend";
import { LoginForm } from "@/components/login/LoginForm";
import { RegisterForm } from "@/components/login/RegisterForm";
import { ResetForm } from "@/components/login/ResetForm";
import { VerificationForm } from "@/components/login/VerificationForm";
import { useBackend } from "@/hooks/useBackend";
import { on } from "events";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
  const [verficationCode, setVerificationCode] = useState<string>("");

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

  return (
    <div
      className="w-full h-full flex flex-col bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${featured?.background})`,
      }}
    >
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
          verificationCode={verficationCode}
          onChangeVerificationCode={onChangeVerificationCode}
          onClickBack={onClickBack}
          onClickVerify={onClickVerify}
        />
      )}
    </div>
  );
};

export default Login;
