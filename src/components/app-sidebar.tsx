import { Calendar, Mail, FileText } from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigation = [
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
    count: 19,
  },
  {
    title: "Emails", 
    url: "/emails",
    icon: Mail,
    count: 8,
  },
  {
    title: "Transactions",
    url: "/",
    icon: FileText,
    count: 19,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="w-60 border-r">
      <SidebarContent>
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-foreground">AdMAX</h1>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground font-medium' 
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-xs font-medium">{item.count}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t">
          <div className="text-xs text-muted-foreground">
            Next appointment in: 15 mins
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">IG</span>
            </div>
            <span className="text-sm">Isaiah Gutierrez</span>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}