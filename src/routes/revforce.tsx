import { AsideBar } from "@/components/AsideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/revforce")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center p-8 transition-opacity duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <SidebarProvider>
        <AsideBar />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}
