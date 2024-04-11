'use client'

import React from "react"
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Login from "./login/page"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
      <SessionProvider>
        {children}
      </SessionProvider>
    );
};