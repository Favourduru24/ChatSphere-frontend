import { Link } from "react-router-dom"
import { z } from "zod"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import { toast } from "sonner"
import type { LoginType } from "@/types/auth.type"
import { Loader2, Lock, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
  const { login, isLoggingIn } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const formSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").max(17, "Password must be less than 17 characters")
  })

  const handleLogin = async () => {
    const result = formSchema.safeParse({ email, password })

    if (!result.success) {
      const errorMessages = result.error.issues.map(issue => issue.message).join(", ")
      toast.error(errorMessages)
      return
    }
     
    const data: LoginType = result.data
    const success = await login(data)

    if (success) {
    navigate("/chat");
    toast.success("Login Successfully!");
  }

  }

  const handleGoogleLogin = () => {
    window.location.href = "https://chatsphere-production-7bdc.up.railway.app/api/auth/google";
  };

  return (
    <section className="w-full flex lg:flex-row items-center justify-center h-screen gap-5 px-5 ">
      
      {/* Form Container */}
      <div className="w-full max-w-lg flex flex-col py-6 bg-white border border-[#ebeeed] rounded-xl shadow-sm p-2 justify-center">
        {/* Logo & Title */}
       <div className="w-full flex flex-col gap-3 px-6 justify-center">
          <div className="flex gap-2 justify-center items-center">
            <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center">
              <p className="font-semibold text-white">C</p>
            </div>
            <p className="text-xl font-semibold">chatSphere</p>
          </div>

            <div className="px-3 py-3 border-[1.5px] cursor-pointer rounded-full max-w-80 w-ful mx-auto w-full flex justify-center items-center mt-2 gap-2" onClick={handleGoogleLogin}>
                <img src="/image/google2.png" className="size-5 object-cover"/>
              <label className="text-[1rem] font-normal text-gray-400 cursor-pointer">Login with Google</label>
            </div>

             <p className="text-sm font-norma text-gray-400 text-center mt-2 font-semibold">OR</p>
             <div className="h-0 w-full"/>
        </div>


        {/* Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault(),
            handleLogin()
          }}
        >
          {/* Email */}
          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label className="text-sm font-normal text-gray-400">Email</label>
            <div className="focus:ring-2 focus:ring-purple-600 rounded-md flex items-center border px-1">
                          <Mail className="size-5 text-gray-600 "/>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="email@gmail.com"
              className="py-2 px-1 placeholder:text-gray-400 font-sans font-normal w-full outline-none placeholder:text-sm"
            />
          </div>
          </div>

          {/* Password */}
          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label className="text-sm font-normal text-gray-400">Password</label>
            <div className="focus:ring-2 focus:ring-purple-600 rounded-md flex items-center border px-1">
                <Lock className="size-5 text-gray-600 "/>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="pa**word"
              className="py-2 px-1 placeholder:text-gray-400 font-sans font-normal w-full outline-none placeholder:text-sm"
            />
          </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex flex-col gap-2.5 px-6 relative mt-4">
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full rounded-md h-12 flex justify-center items-center cursor-pointer ${
                isLoggingIn
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-800 hover:bg-purple-700 focus:bg-purple-500"
              } text-white font-semibold text-xl`}
            >
              {isLoggingIn ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="animate-spin size-5" />
                  <span className="text-[1rem]">Loading...</span>
                </div>
              ) : (
                <span className="text-[1.2rem]">Sign In</span>
              )}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="text-sm font-medium text-end mx-6 mt-1">
          Don't have an account?{" "}
          <Link to="/sign-up">
            <span className="text-purple-600 cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full h-full bg-purple-50 hidde lg:block px-10 pt-28 flex items-center justify-center">
        <img
          src="/image/sign-up.svg"
          alt="Authentication Illustration"
          className=" object-contain w-full h-[70vh]"
        />
      </div>
    </section>
  )
}

export default SignIn

 