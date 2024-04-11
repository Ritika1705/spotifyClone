import { Session } from "next-auth";
import { Appbar } from "../components/Appbar";
import './globals.css'
import Sidebar from "../components/Sidebar";
import { FrontPage } from "../components/Frontpage";
import Login from "./login/page";

export default function Home() {
  return (
    <div>
      <Appbar/>
      <FrontPage/>
    </div>
  );
}
