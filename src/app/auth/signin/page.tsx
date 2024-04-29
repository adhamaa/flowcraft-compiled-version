import { signIn } from "@/auth"

export default async function SignInPage() {

  return (
    <div className="grid place-items-center h-screen">
      <form
        action={async (formData) => {
          "use server"
          const username = formData.get("username")
          const password = formData.get("password")
          await signIn("credentials",
            {
              username, password,
              redirectTo: "/"
            })
        }}
        className="flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-md"
      >
        <label>
          Username
          <input name="username" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
    </div>
  )
}