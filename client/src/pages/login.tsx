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
  // if userinfo not null, means user is logged in
  const [userInfo, setUserInfo] = useState<User | null>(null);
  // page state: logedin, sigin or signup
  const [pageState, setPageState] = useState<PageState>("login");
  const backend = useBackend();

  useEffect(() => {
    const inner = async () => {
      const { featured } = await backend.getFeatured({});
      setFeatured(featured);
      // if local storage has token and email, then get user info
      const token: string | null = localStorage.getItem("token");
      const email: string | null = localStorage.getItem("email");
      if (token && email) {
        const { user } = await backend.getUserInfo({
          email,
          token,
        });
        setUserInfo(user);
        setPageState("loggedin");
      }
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
      {pageState === "login" && <LoginForm setPageState={setPageState} />}
      {pageState === "register" && <RegisterForm setPageState={setPageState} />}
      {pageState === "loggedin" && <LoginForm setPageState={setPageState} />}
      {/* <LoginForm /> */}
      {/* <SignupForm /> */}
      {/* <SigninForm /> */}
      {/* Router */}
    </div>
  );
};

export default Login;
