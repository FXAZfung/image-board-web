import {columns} from "./columns"
import {UserDataTable} from "./data-table"
import {Button} from "@/components/ui/button";
import {PlusCircle, Settings} from "lucide-react";

const mockData = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
        createdAt: "2024-01-01",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "Inactive",
        createdAt: "2024-01-02",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
    },
    // ... 更多模拟数据
]

function Header() {
    return (
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">用户管理</h2>
            <div className="flex items-center space-x-2">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    新增用户
                </Button>
            </div>
        </div>
    )
}

export default function UsersPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <Header/>
            <div className="container mx-auto py-4">
                <UserDataTable columns={columns} data={mockData}/>
            </div>
        </div>
    )
}