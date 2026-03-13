import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { SupportButton } from "./components/SupportButton";
import { useActor } from "./hooks/useActor";
import { CosmeticsPage } from "./pages/CosmeticsPage";
import { HomePage } from "./pages/HomePage";
import { MensPage } from "./pages/MensPage";
import { OrderPage } from "./pages/OrderPage";
import { WomensPage } from "./pages/WomensPage";

const queryClient = new QueryClient();

function Layout() {
  const { actor } = useActor();

  useEffect(() => {
    if (actor) {
      actor.initialize().catch(() => {});
    }
  }, [actor]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <SupportButton />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const mensRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mens",
  component: MensPage,
});

const womensRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/womens",
  component: WomensPage,
});

const cosmeticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cosmetics",
  component: CosmeticsPage,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order",
  validateSearch: (search: Record<string, unknown>) => ({
    productId: (search.productId as string) ?? "",
  }),
  component: OrderPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  mensRoute,
  womensRoute,
  cosmeticsRoute,
  orderRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
