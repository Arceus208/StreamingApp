import React from "react";

import { Logo } from "./_components/logo";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({
  children,
}: AuthLayoutProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6">
      <Logo></Logo>
      {children}
    </div>
  );
};

export default AuthLayout;
