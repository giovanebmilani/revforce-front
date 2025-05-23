import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {cn} from "@/lib/utils";

interface TabsItem {
    value: string;
    label: string;
    content: React.ReactNode;
}

interface TabsComponentProps {
    tabs: TabsItem[];
    defaultValue?: string;
    className?: string; //opcional pra estilizacao
    containerClassName?: string; //opcional pra estilizacao
}

export function TabsComponent({
                                  tabs,
                                  defaultValue,
                                  className,
                                  containerClassName,
                              }: TabsComponentProps) {
    const defaultTab = defaultValue || tabs[0]?.value;

    return (
        <div
            className={cn(
                "w-full border rounded-lg overflow-hidden shadow-sm",
                containerClassName
            )}
        >
            <Tabs
                defaultValue={defaultTab}
                className={cn("flex flex-col", className)}
            >
                <TabsList
                    className={cn(
                        "mx-auto mt-4",
                        "border-b rounded-sm bg-gray-100 border-gray-200",
                        "px-4",
                        "space-x-2 inline-flex"
                    )}
                >
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value}
                                     value={tab.value}
                                     className={cn(
                                         "px-4 py-2 rounded-sm text-sm font-medium transition-all",
                                         "data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:px-6 data-[state=active]:py-2.5"
                                     )}

                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>


                {tabs.map((tab) => (
                    <TabsContent
                        key={tab.value}
                        value={tab.value}
                        className="flex-1 pt-0 pr-4 pb-4 pl-4 outline-none"
                    >
                        {tab.content}
                    </TabsContent>
                ))}

            </Tabs>
        </div>
    );
}
