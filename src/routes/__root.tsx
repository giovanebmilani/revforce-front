import { AsideBar } from "@/components/AsideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <SidebarProvider>
        <AsideBar />
        <Outlet />
        <TanStackRouterDevtools />
      </SidebarProvider>
    </>
  ),
});
