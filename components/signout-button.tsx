import { signOut } from "@/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1">Sign Out</button>
    </form>
  )
}