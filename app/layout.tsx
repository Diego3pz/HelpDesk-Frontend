import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google";
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import QueryProvider from "@/components/layout/QueryProvider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "HelpDesk App",
  description: "Aplicación de gestión de tickets de soporte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={rubik.className}>
        <QueryProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <AntdRegistry>{children}</AntdRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
