import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="auth-screen">
      <div className="auth-card">
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      </div>
    </main>
  );
}
