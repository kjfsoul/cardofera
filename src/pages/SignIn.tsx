import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Enhanced validation
      if (!email || !password) {
        toast.error("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        setIsLoading(false);
        return;
      }

      console.log("Attempting sign in with:", { email: email.trim() });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      console.log("Sign in response:", { data, error });

      if (error) {
        if (error.message === "Invalid login credentials") {
          toast.error("Invalid email or password. Please check your credentials and try again.");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please verify your email address before signing in.");
        } else if (error.message.includes("Email logins are disabled")) {
          toast.error("Email authentication is not enabled. Please contact support.");
          console.error("Email authentication is disabled in Supabase settings");
        } else {
          toast.error(error.message);
        }
        console.error("Sign in error:", error);
        return;
      }

      if (data.session) {
        console.log("Successfully signed in with session:", data.session);
        toast.success("Successfully signed in!");
        navigate("/");
      } else {
        console.error("No session after successful sign in");
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/10 p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => navigate("/signup")}
              disabled={isLoading}
            >
              Sign up
            </Button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;