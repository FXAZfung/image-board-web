
export default function Loading() {
    return (
        <div className="fixed z-50 w-full h-screen flex items-center justify-center bg-background">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-t-2 dark:border-gray-100 border-gray-900"></div>
        </div>
    )
}