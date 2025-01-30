import { ConfigProvider, theme } from "antd";
import { ReactNode } from "react";

export default function AntdConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#bb86fc",
          colorText: "#e1e1e1",
          colorBgBase: "#292929",
          colorBgContainer: "#000",
          colorBorder: "#121212",
          colorLink: "#6592fd",
          colorLinkHover: "#8c61ff",
          colorTextHeading: "#bb86fc",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
