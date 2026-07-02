import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/dashboard-static(.*)",
  "/api/dashboard-state(.*)",
  "/api/notifications(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/dashboard(.*)",
    "/dashboard-static(.*)",
    "/api/dashboard-state(.*)",
    "/api/notifications(.*)"
  ]
};
