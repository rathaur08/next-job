import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata = {
  title: "Next.JS Job Portal",
  description: "Next.JS Job Portal And Created BY Sunny Rathaur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
           <ToastContainer />
      </body>
    </html>
  );
}
