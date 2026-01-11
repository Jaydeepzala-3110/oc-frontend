"use client"
import { LoginForm } from "@/components/login/LoginForm"
import React from "react"


const Page = () => {
  return (
    <div className="admin-container">
        <div className="flex items-center justify-center h-screen">
          <LoginForm />
      </div>
    </div>
  )
}

export default Page

