import { AppSidebar } from '@/registry/default/block/sidebar-02/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/registry/default/ui/breadcrumb';
import { Separator } from '@/registry/default/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/registry/default/ui/sidebar';

export const iframeHeight = '800px';

export const description = 'A sidebar with collapsible sections.';

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className='sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4'>
                    <SidebarTrigger className='-ml-1' />
                    <Separator orientation='vertical' className='mr-2 h-4' />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className='hidden md:block'>
                                <BreadcrumbLink href='#'>Building Your Application</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className='hidden md:block' />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className='flex flex-1 flex-col gap-4 p-4'>
                    {Array.from({ length: 24 }).map((_, index) => (
                        <div key={index} className='aspect-video h-12 w-full rounded-lg bg-muted/50' />
                    ))}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
