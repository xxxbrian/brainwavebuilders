import { Logo } from "./Logo";

export const CenteredLoading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Logo size="small" className="animate-pulse" />
    </div>
  );
};
