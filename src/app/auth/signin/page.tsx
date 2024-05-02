import { signIn } from "@/auth"

export default async function SignInPage() {

  return (
    <div className="grid place-items-center h-screen">
      <form
        action={async (formData) => {
          "use server"
          const email = formData.get("email")
          const password = formData.get("password")
          await signIn("credentials",
            {
              email, password,
              redirectTo: "/"
            })
        }}
        className="flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-md"
      >
        <label
          className="flex flex-col gap-1"
        >
          Email
          <input
            className="p-2 border border-gray-300 rounded-lg"
            name="email"
            type="text"
          />
        </label>
        <label
          className="flex flex-col gap-1"
        >
          Password
          <input
            className="p-2 border border-gray-300 rounded-lg"
            name="password"
            type="password"
          />
        </label>
        <button
          className="p-2 bg-blue-500 text-white rounded-lg"
        >Sign In</button>
      </form>
    </div>
  )
}