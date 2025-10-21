import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/" })
      }}
    >
      <button type="submit" className="cursor-pointer">Signin with Google</button>
    </form>
  )
}