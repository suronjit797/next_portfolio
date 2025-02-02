'use client'

import { ConfigProvider, theme } from "antd";
import { ReactNode } from "react";

export default function AntdConfigProvider({ children }: { children: ReactNode }) {
  console.log(theme)
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          // colorPrimary: "#8c61ff",
          // colorPrimaryHover: "#a573ff",
          // colorText: "#e1e1e1",
          // colorBgBase: "#1e1e1e",
          // colorBorder: "#393939",
          // colorTextHeading: "#bb86fc",
          // colorTextSecondary: "#cccccc",
          // colorLink: "#6592fd",
          // colorLinkHover: "#8c61ff",
          // colorTextPlaceholder: "#7a7a7a",
        //   colorIcon: "#e1e1e1",
        //   colorIconHover: "#bb86fc",
        //   controlItemBgActive: "#3d3d3d",
        //   lineWidthBold: 0,
        //   controlOutlineWidth: 0
          
        },
        components: {
          // Button: {
          //   defaultShadow: "none",
          // },
          // DatePicker: {
          //   cellActiveWithRangeBg: "#00000050",
          // },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
