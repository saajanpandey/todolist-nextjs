import { Toaster } from "react-hot-toast";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Toaster position="bottom-right" reverseOrder={true} />
      <main>{children}</main>
    </>
  );
}
