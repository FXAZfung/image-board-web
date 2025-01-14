import { Button } from "@/components/ui/button"
import { PlusCircle, Settings } from "lucide-react"

export function DashboardHeader() {
    return (
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">控制台</h2>
            <div className="flex items-center space-x-2">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    新建图片
                </Button>
                <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    系统设置
                </Button>
            </div>
        </div>
    )
}
