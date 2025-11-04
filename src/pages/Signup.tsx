import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "@/utils/auth";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password || !confirm) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    const res = signup(email.trim(), password);
    if (!res.ok) {
      setError(res.message || "Signup failed");
      return;
    }
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-background p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Sign up</h2>
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
          <div>
            <label className="block text-sm">Confirm password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit">Sign up</Button>
            <Link to="/login" className="text-sm text-primary">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
