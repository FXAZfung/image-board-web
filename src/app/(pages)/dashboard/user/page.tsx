import { columns } from "./columns"
import { UserDataTable } from "./data-table"

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

export default function UsersPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
            </div>
            <div className="container mx-auto py-4">
                <UserDataTable columns={columns} data={mockData} />
            </div>
        </div>
    )
}