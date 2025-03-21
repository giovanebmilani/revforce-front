import { Home, LogOut, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Link } from "@tanstack/react-router";

export function AsideBar() {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Exit",
      url: "/",
      icon: LogOut,
    },
  ];

  return (
    <Sidebar className="bg-gray-50 h-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-extrabold text-4xl text-black p-8 pl-2 mb-10">
            Revforce
          </SidebarGroupLabel>
          <SidebarGroupContent className="">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="pl-8 pr-8 mb-5" key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className="flex items-center gap-8 pl-4 pr-4 pt-6 pb-6 rounded-lg transition-colors hover:bg-yellow-300 text-black"
                      to={item.url}
                    >
                      <div>
                        <item.icon size={25}/>
                      </div>
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
