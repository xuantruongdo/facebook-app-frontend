import "@/app/styles/global.scss";
import NextAuthWrapper from "./lib/next.auth.wrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NProgressWrapper from "./lib/nprogress.wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NProgressWrapper>
          <NextAuthWrapper>
            {children}
          </NextAuthWrapper>
        </NProgressWrapper>
        <ToastContainer />
      </body>
    </html>
  );
}
