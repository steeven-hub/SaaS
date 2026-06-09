import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "./components/saas/AuthPage";
import { LandingPage } from "./components/saas/LandingPage";
import { QuickStartPage } from "./components/saas/QuickStartPage";
import { CheckoutPage } from "./components/saas/CheckoutPage";
import { CustomerDashboard } from "./components/saas/CustomerDashboard";
import { AIDecisionHub } from "./components/saas/AIDecisionHub";
import { HackathonPage } from "./components/saas/HackathonPage";
import { ChangelogPage } from "./components/saas/ChangelogPage";
import { MainLayout } from "./components/saas/MainLayout";
import { ProtectedRoute } from "./components/saas/ProtectedRoute";
import { ProfilePage } from "./components/saas/ProfilePage";
import { TeamPage } from "./components/saas/TeamPage";
import { DataPipelinePage } from "./components/saas/DataPipelinePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "landing", Component: LandingPage },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "docs", Component: QuickStartPage },
          { path: "checkout", Component: CheckoutPage },
          { path: "dashboard", Component: CustomerDashboard },
          { path: "ai-hub", Component: AIDecisionHub },
          { path: "hackathon", Component: HackathonPage },
          { path: "changelog", Component: ChangelogPage },
          { path: "profile", Component: ProfilePage },
          { path: "team", Component: TeamPage },
          { path: "pipeline", Component: DataPipelinePage },
        ],
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
]);
