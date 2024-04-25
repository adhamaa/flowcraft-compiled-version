import { signIn } from "auth"
import { providerMap } from "../../../auth.config"

export default async function SignInPage() {
  // return (
  //   <div className="flex flex-col gap-2">
  //     {Object.values(providerMap).map((provider) => (
  //       <form
  //         key={provider.id}
  //         action={async () => {
  //           "use server"
  //           await signIn(provider.id)
  //         }}
  //       >
  //         <button type="submit">
  //           <span>Sign in with {provider.name}</span>
  //         </button>
  //       </form>
  //     ))}
  //   </div>
  // )
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData)
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}