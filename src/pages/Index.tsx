import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Redirect to sign-in if not authenticated
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Render nothing while redirecting
  }

  return (
    <div>
      {/* Your authenticated content here */}
      <h1>Welcome, {user.name || user.email}!</h1>
    </div>
  );
};

export default Index;