import { Featured } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
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

  return (
    <div
      className="w-full h-full flex flex-col bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${featured?.background})`,
      }}
    >
      {/* <SignupForm /> */}
      {/* <SigninForm /> */}
      {/* Router */}
    </div>
  );
};

export default Login;
