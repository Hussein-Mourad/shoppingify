import  { ReactElement } from 'react'
import AuthCard from "components/AuthCard"


export default function signup(): ReactElement {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
    <AuthCard authType="Signup" />
  </main>
  )
}
