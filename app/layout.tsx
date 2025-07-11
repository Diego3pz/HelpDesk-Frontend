import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google";
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';
import { AntdRegistry } from '@ant-design/nextjs-registry';

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
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
