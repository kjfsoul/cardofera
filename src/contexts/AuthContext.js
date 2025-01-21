import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }, } = await supabase.auth.getSession();
            if (session) {
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.name,
                });
            }
            setLoading(false);
        };
        fetchSession();
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.name,
                });
            }
            else if (event === "SIGNED_OUT") {
                setUser(null);
            }
        });
        return () => subscription.unsubscribe();
    }, []);
    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error)
            throw error;
        return !!data.session;
    };
    const signOut = async () => {
        await supabase.auth.signOut();
    };
    return (_jsx(AuthContext.Provider, { value: { user, loading, signIn, signOut }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
