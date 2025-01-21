import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading)
            return;
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                    },
                },
            });
            if (error) {
                toast.error(error.message);
                return;
            }
            if (data.user) {
                toast.success("Successfully signed up! Please check your email to confirm your account.");
                navigate("/"); // Redirect to the Index page
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/10 p-4", children: _jsxs(Card, { className: "w-full max-w-md p-6 space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Create an Account" }), _jsx("p", { className: "text-muted-foreground", children: "Sign up to get started" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "name", className: "text-sm font-medium", children: "Name" }), _jsx(Input, { id: "name", type: "text", placeholder: "Enter your name", value: name, onChange: (e) => setName(e.target.value), required: true, disabled: isLoading, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "email", className: "text-sm font-medium", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value), required: true, disabled: isLoading, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "password", className: "text-sm font-medium", children: "Password" }), _jsx(Input, { id: "password", type: "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value), required: true, disabled: isLoading, className: "w-full" })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Signing up..." : "Sign Up" })] }), _jsx("div", { className: "text-center space-y-2", children: _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Already have an account?", " ", _jsx(Button, { variant: "link", className: "p-0 h-auto font-semibold", onClick: () => navigate("/signin"), disabled: isLoading, children: "Sign in" })] }) })] }) }));
};
export default SignUp;
