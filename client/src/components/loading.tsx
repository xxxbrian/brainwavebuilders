import { Logo } from "./Logo";

export const CenteredLoading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Logo size="small" className="animate-pulse" />
    </div>
  );
};
