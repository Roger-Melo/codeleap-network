import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center p-4">
      <section className="flex flex-col gap-4 bg-white border border-primary-gray rounded-2xl p-5 w-full sm:w-[500px] mx-auto">
        <h1 className="text-lg sm:text-xl font-bold">Welcome to CodeLeap network!</h1>
        <LoginForm />
      </section>
    </main>
  )
}
