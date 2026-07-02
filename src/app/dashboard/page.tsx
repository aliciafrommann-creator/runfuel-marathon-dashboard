import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NotifyButton } from "./NotifyButton";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const firstName = user?.firstName || user?.emailAddresses[0]?.emailAddress || "Runner";

  return (
    <>
      <header className="app-header">
        <div className="page-shell app-header-inner">
          <div>
            <p className="eyebrow">RunFuel</p>
            <h1>{firstName}</h1>
          </div>
          <div className="header-tools">
            <NotifyButton />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <iframe
        className="dashboard-frame"
        title="RunFuel Marathon Dashboard"
        src="/dashboard-static/lissabon-marathon-dashboard.html"
      />
    </>
  );
}
