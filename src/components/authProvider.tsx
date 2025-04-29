import React from "react";

type Props = {
  children: React.ReactNode;
  isLogin: boolean;
};

function AuthProvider({ children, isLogin = false }: Props) {
  if (!isLogin) {
    return <div>Yetkisiz giriş</div>;
  }
  return <div>{children}</div>;
}

export default AuthProvider;


