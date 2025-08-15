"use client"

import * as React from "react"
import {
  Building2,
  BookOpen,
  FileText,
  User,
  Flame,
  Leaf,
  Compass,

} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { url } from "inspector"
import CreatePostButton from "@/components/shared/CreatePostButton"

const data = {
  navMain: [
    {
      title: "Explore",
      url: "#",
      icon: Compass,
    },
    {
      title: "Trending",
      url: "#",
      icon: Flame,
    },
    {
      title: "Plants",
      url: "#",
      icon: Leaf,
    },
    {
      title: "Company",
      url: "#",
      icon: Building2,
      items: [
        { title: "About Us", url: "#" },
        { title: "Contact", url: "#" },
        { title: "Incubate 2025", url: "#" },
      ],
    },
    {
      title: "Resources",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Tutorial", url: "#" },
        { title: "Use App", url: "#" },
      ],
    },
    {
      title: "Legal",
      url: "#",
      icon: FileText,
      items: [
        { title: "Terms", url: "#" },
        { title: "Privacy Policy", url: "#" },
      ],
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="mt-20 font-poppins w-48 min-w-[60px] ">
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
