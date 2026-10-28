import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import GlobalInternships from "./pages/GlobalInternships.tsx";
import InternPortal from "./pages/InternPortal.tsx";
import AfricanStudentImpactProgram from "./pages/AfricanStudentImpactProgram.tsx";
const HallOfFamePage = lazy(() => import('./features/hall-of-fame/HallOfFamePage.tsx'));
const HallStoryPage = lazy(() => import('./features/hall-of-fame/HallStoryPage.tsx'));
const LegalPolicyPage = lazy(() => import('./pages/LegalPolicyPage.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));

const router = createBrowserRouter([
  ...['/privacy-policy', '/terms-and-conditions', '/refund-policy'].map(path => ({
    path,
    element: <Suspense fallback={<p role="status">Loading policy…</p>}><LegalPolicyPage /></Suspense>,
  })),
  { path: '/contact', element: <Suspense fallback={<p role="status">Loading contact information…</p>}><Contact /></Suspense> },
  {path:'/hall-of-fame',element:<Suspense fallback={<p role="status">Loading Hall of Fame…</p>}><HallOfFamePage/></Suspense>},
  {path:'/hall-of-fame/stories/:slug',element:<Suspense fallback={<p role="status">Loading impact story…</p>}><HallStoryPage/></Suspense>},
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/global-internships",
    element: <GlobalInternships />,
  },
  {
    path: "/quest-quiz",
    element: <Navigate to="/#core-solutions" replace />,
  },
  {
    path: "/intern-portal",
    element: <InternPortal />,
  },
  {
    path: "/african-student-impact-program",
    element: <AfricanStudentImpactProgram />,
  },
  {
    path: "/africa-internship-program-2026",
    element: <AfricanStudentImpactProgram />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
