"use client";
import dynamic from "next/dynamic";
const CrmApp = dynamic(() => import("./CrmApp"), { ssr: false });
export default function CrmPage() { return <CrmApp />; }
