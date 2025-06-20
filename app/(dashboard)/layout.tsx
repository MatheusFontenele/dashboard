import * as React from 'react';
import { AppSidebar } from "../../components/app-sidebar"
import { Header } from "../../components/header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface IDashboardComponentProps {
  children?: React.ReactNode;
}

const DashboardComponent: React.FunctionComponent<IDashboardComponentProps> = ({children}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
};

export default DashboardComponent;