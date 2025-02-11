import type { Metadata } from "next";
import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import "./sweetAlertCustomize.css";
import { AuthProvider } from "@/contexts/authContext";
import { ReduxProviders } from "@/components/ReduxProvider";
import AntdConfigProvider from "@/components/AntdConfigProvider";
import ApolloProvider from "@/graphql/ApolloProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ToastContainer } from "react-toastify";

const merriweather = Merriweather_Sans({
  weight: ["300", "400", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: `Home | ${process.env.NEXT_PUBLIC_TITLE ?? "Portfolio"}`,
  description:
    "I'm Suronjit Pal, a skilled web developer specializing in the MERN stack and Next.js. Explore my projects and skills.",
  keywords: [
    "Suronjit Pal",
    "Web Developer",
    "MERN Stack",
    "Next.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Suronjit Pal | Web Developer & MERN Stack Expert",
    description:
      "Discover the work and skills of Suronjit Pal, a Next.js and MERN Stack developer.",
    url: "https://suronjit797.vercel.app",
    siteName: "Suronjit Pal Portfolio",
    images: [
      {
        url: "/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Suronjit Pal - Web Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suronjit Pal | Web Developer",
    description:
      "I'm Suronjit Pal, a skilled web developer specializing in the MERN stack and Next.js.",
    images: ["/og-image-home.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.className} antialiased`}>
        <AntdRegistry>
          <ReduxProviders>
            <AntdConfigProvider>
              <ApolloProvider>
                <AuthProvider>{children}</AuthProvider>
              </ApolloProvider>
            </AntdConfigProvider>
          </ReduxProviders>
        </AntdRegistry>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </body>
    </html>
  );
}
