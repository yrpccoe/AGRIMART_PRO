import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/utils/auth";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    const res = login(email.trim(), password);
    if (!res.ok) {
      setError(res.message || "Login failed");
      return;
    }
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-background p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Log in</h2>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit">Log in</Button>
            <Link to="/signup" className="text-sm text-primary">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
