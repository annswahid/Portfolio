import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, UserPlus, ArrowLeft, Sparkles } from "lucide-react";
import { trpc } from "@/providers/trpc";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      if (data.success && data.token) {
        localStorage.setItem("local_auth_token", data.token);
        localStorage.setItem("local_auth_user", JSON.stringify(data.user));
        window.location.href = "/";
      }
    },
    onError: (err) => {
      setError(err.message || "Invalid username or password");
    },
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: () => {
      setMode("login");
      setError("");
      setDisplayName("");
    },
    onError: (err) => {
      setError(err.message || "Registration failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      loginMutation.mutate({ username, password });
    } else {
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      registerMutation.mutate({
        username,
        password,
        displayName: displayName || undefined,
      });
    }
  };

  const isSubmitting = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <Card className="glass-strong border-white/10">
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <p className="text-sm text-gray-400 mt-1">
              {mode === "login"
                ? "Sign in to access your account"
                : "Register a new account"}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* OAuth Button */}
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
              size="lg"
              onClick={() => {
                window.location.href = getOAuthUrl();
              }}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign in with Kimi
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0a0a0f] px-2 text-gray-500">
                  or continue with
                </span>
              </div>
            </div>

            {/* Local Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "register" && (
                <div>
                  <Label className="text-gray-400 text-sm">Display Name</Label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 mt-1"
                  />
                </div>
              )}
              <div>
                <Label className="text-gray-400 text-sm">Username</Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 mt-1"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
                size="lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : mode === "login" ? (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Register
                  </span>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-400">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setMode("register");
                      setError("");
                    }}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
