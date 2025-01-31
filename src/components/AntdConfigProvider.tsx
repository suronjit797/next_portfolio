// import { ConfigProvider, theme } from "antd";
// import { ReactNode } from "react";

// export default function AntdConfigProvider({ children }: { children: ReactNode }) {
//   return (
//     <ConfigProvider
//       theme={{
//         algorithm: theme.darkAlgorithm,
//         token: {
//           colorPrimary: "#bb86fc",
//           colorText: "#e1e1e1",
//           colorBgBase: "#292929",
//           colorBgContainer: "#000",
//           colorBorder: "#121212",
//           colorLink: "#6592fd",
//           colorLinkHover: "#8c61ff",
//           colorTextHeading: "#bb86fc",
//         },
//       }}
//     >
//       {children}
//     </ConfigProvider>
//   );
// }

import { ConfigProvider, theme } from "antd";
import { ReactNode } from "react";

export default function AntdConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#8c61ff",
          colorPrimaryHover: "#a573ff",
          colorText: "#e1e1e1",
          colorBgBase: "#1e1e1e",
          colorBgContainer: "#292929",
          colorBorder: "#393939",
          colorTextHeading: "#bb86fc",
          colorTextSecondary: "#cccccc",
          colorLink: "#6592fd",
          colorLinkHover: "#8c61ff",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          controlHeight: 38,          
        },
        components:{
          Button:{
            defaultShadow:'none',
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}
