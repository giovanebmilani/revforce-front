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
import MenuButton from "./MenuButton";
import { Link } from "@tanstack/react-router";

export function AsideBar() {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard/",
      icon: Home,
    },
    {
      title: "Settings",
      url: "/settings/",
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
          <SidebarGroupLabel className="font-extrabold text-4xl text-black p-8 mb-10">
            <Link to='/'>
              Revforce
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="pl-8 pr-8 mb-5" key={item.title}>
                  <SidebarMenuButton asChild>
                    <MenuButton item={item}/>
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
