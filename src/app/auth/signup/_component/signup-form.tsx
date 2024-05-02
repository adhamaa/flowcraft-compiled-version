import { CustomAdapter } from '@/auth'
import { AdapterUser } from 'next-auth/adapters'
import React from 'react'

function SignupForm() {
  return (
    <form action={
      async (formData) => {
        "use server"
        const userid = formData.get("userid")
        const password = formData.get("password")
        const email = formData.get("email")
        const username = formData.get("username")
        CustomAdapter.createUser?.({
          name: username as string,
          email: email as string,
          emailVerified: new Date(),
          image: '/profile_image.png',
          password: password as string
        } as AdapterUser & { password: string });
      }
    }>
      <label>
        Username:
        <input
          type="text"
          name="username"
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupForm