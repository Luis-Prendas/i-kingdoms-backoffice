import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { SlidersHorizontal, Users } from "lucide-react"
import { Link } from "react-router-dom"

const races = [
  {
    title: "Lista de razas",
    url: "/races",
    icon: Users,
  },
  {
    title: "Lista de sub-razas",
    url: "/races/sub-races",
    icon: SlidersHorizontal,
  },
  {
    title: "Bonus en habilidades", 
    url: "/races/sub-races/skill-bonus",
    icon: SlidersHorizontal,
  },
  {
    title: "Bonus en atributos",
    url: "/races/sub-races/attribute-bonus",
    icon: SlidersHorizontal,
  }
]

const attributes = [
  {
    title: "Lista de atributos",
    url: "/attributes/attribute-list",
    icon: SlidersHorizontal,
  },
]

const skills = [
  {
    title: "Lista de habilidades",
    url: "/skills/skill-list",
    icon: SlidersHorizontal,
  }
]

export function SidebarLayout() {
  return (
    <SidebarProvider >
      <Sidebar >
        <SidebarContent>
          <div className="flex gap-2 items-center w-full justify-center pt-2">
            <img src="/icon.svg" alt="Logo Imaginary Kingdoms Backoffice" className="h-8" />
            <h1 className="text-2xl font-bold">I-Kingdoms</h1>
          </div>
          <SidebarGroup>
            <SidebarGroupLabel>Razas</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {races.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Atributos</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {attributes.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Habilidades</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {skills.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}