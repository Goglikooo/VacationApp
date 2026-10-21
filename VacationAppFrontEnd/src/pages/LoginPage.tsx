import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./../components/ui/card";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      //api call to log in
      // if (false) {
      //   setError("Invalid Username or Password");
      // }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("unable to log in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 px-4 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-28 -top-36 size-[30rem] rounded-full bg-cyan-400/35 blur-[80px] sm:size-[40rem]" />

        <div className="absolute -bottom-40 -right-24 size-[28rem] rounded-full bg-orange-400/25 blur-[80px] sm:size-[34rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(8,12,35,0.38)_100%)]" />
      </div>

      <div className="relative w-full max-w-sm">
        <Card className="w-full gap-6 border-white/80 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/80">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-primary">
              Vacation App
            </CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="font-semibold tracking-wide text-slate-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="font-semibold tracking-wide text-slate-700"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-4 text-xs">
                <label
                  htmlFor="remember-me"
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="size-4 rounded border-input accent-primary"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  Remember me
                </label>
                <a
                  href="/forgot-password"
                  className="font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="h-10 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
