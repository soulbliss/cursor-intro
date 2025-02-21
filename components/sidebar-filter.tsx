import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export type FilterOption = {
    id: string;
    label: string;
    count?: number;
};

export type FilterSection = {
    title: string;
    options: FilterOption[];
};

export type FilterState = {
    categories: string[];
    difficulty: string[];
    tags: string[];
    tools: string[];
};

interface SidebarFilterProps {
    categories: FilterOption[];
    difficulties: FilterOption[];
    tags: FilterOption[];
    tools: FilterOption[];
    selectedFilters: FilterState;
    onFilterChange: (newFilters: FilterState) => void;
}

export function SidebarFilter({
    categories,
    difficulties,
    tags,
    tools,
    selectedFilters,
    onFilterChange,
}: SidebarFilterProps) {
    const [open, setOpen] = useState(false);

    const updateFilter = (
        section: keyof FilterState,
        value: string,
        checked: boolean
    ) => {
        const newFilters = { ...selectedFilters };
        if (checked) {
            newFilters[section] = [...newFilters[section], value];
        } else {
            newFilters[section] = newFilters[section].filter((item) => item !== value);
        }
        onFilterChange(newFilters);
    };

    const FilterSection = ({ title, options, section }: { title: string; options: FilterOption[]; section: keyof FilterState }) => (
        <div className="space-y-4">
            <h3 className="text-base font-semibold">{title}</h3>
            <div className="space-y-3">
                {options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3">
                        <Checkbox
                            id={`${section}-${option.id}`}
                            checked={selectedFilters[section].includes(option.id)}
                            onCheckedChange={(checked) =>
                                updateFilter(section, option.id, checked as boolean)
                            }
                        />
                        <label
                            htmlFor={`${section}-${option.id}`}
                            className="text-sm font-medium leading-none cursor-pointer select-none"
                        >
                            {option.label}
                            {option.count !== undefined && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                    {option.count}
                                </Badge>
                            )}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    const FilterContent = () => (
        <nav className="space-y-8">
            <FilterSection
                title="Difficulty Level"
                options={difficulties}
                section="difficulty"
            />
            <FilterSection
                title="Categories"
                options={categories}
                section="categories"
            />
            <FilterSection
                title="Tools"
                options={tools}
                section="tools"
            />
        </nav>
    );

    return (
        <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button size="lg" className="rounded-full shadow-lg">
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:w-[300px] p-0">
                        <div className="h-[calc(100vh-2rem)] overflow-y-auto p-6">
                            <FilterContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 p-6 border-r min-h-screen bg-muted/10">
                <div className="sticky top-6 overflow-y-auto max-h-[calc(100vh-3rem)]">
                    <FilterContent />
                </div>
            </aside>
        </>
    );
} 