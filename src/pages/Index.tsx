import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TransactionsTable } from "@/components/transactions-table"
import { Menu } from "lucide-react"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1">
          <header className="h-14 border-b bg-background flex items-center px-6">
            <SidebarTrigger>
              <Menu className="h-4 w-4" />
            </SidebarTrigger>
          </header>
          <main className="p-6">
            <TransactionsTable />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
