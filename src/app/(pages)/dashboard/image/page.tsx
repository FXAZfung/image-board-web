import {columns} from "./columns"
import {DataTable} from "./data-table"
import {Image} from "@/types/types";
import request from "@/utils/request";

async function getData(): Promise<Image[]> {
    return request({
        url: '/public/images',
        method: 'GET',
        params: {
            page: 1,
            page_size: 100
        }
    })
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
