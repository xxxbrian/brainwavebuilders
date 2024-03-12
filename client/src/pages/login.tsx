import type { User, Featured } from "@/backend";
import { LoginForm } from "@/components/login/LoginForm";
import { RegisterForm } from "@/components/login/RegisterForm";
import { useBackend } from "@/hooks/useBackend";
import { useEffect, useState } from "react";

export type PageState = "loggedin" | "login" | "register" | "forgotpwd";
export type SetPageState = React.Dispatch<React.SetStateAction<PageState>>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Login: React.FC<Props> = () => {
  const [featured, setFeatured] = useState<Featured | null>(null);

  // page state: logedin, sigin or signup
  const [pageState, setPageState] = useState<PageState>("login");
  const backend = useBackend();

  useEffect(() => {
    const inner = async () => {
      const { featured } = await backend.getFeatured({});
      setFeatured(featured);
    };

    void inner();
  }, [backend]);

  return (
    <div
      className="w-full h-full flex flex-col bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${featured?.background})`,
      }}
    >
      <LoginForm
        password="123"
        email="123"
        onChangeEmail={() => {}}
        onChangePassword={() => {}}
        onClickCreateAccount={() => {}}
        onClickForgotPassword={() => {}}
        onClickSignIn={() => {}}
      />
      {/* {pageState === "login" && <LoginForm setPageState={setPageState} />}
      {pageState === "register" && <RegisterForm setPageState={setPageState} />}
      {pageState === "loggedin" && <LoginForm setPageState={setPageState} />} */}
      {/* <LoginForm /> */}
      {/* <SignupForm /> */}
      {/* <SigninForm /> */}
      {/* Router */}
    </div>
  );
};

export default Login;
