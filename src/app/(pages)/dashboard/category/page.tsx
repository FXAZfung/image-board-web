"use client";
import {useEffect, useState} from "react";
import {apiGetCategories} from "@/api/category";
import Loader from "@/components/loader";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";


export default function Page() {

    const [categories, setCategories] = useState([])

    const {data, isLoading} = apiGetCategories()

    useEffect(() => {
        if (data) {
            setCategories(data)
        }
    }, [data])

    if(isLoading) {
        return <Loader/>
    }

    return (
        <div className="p-8 w-full h-full">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>名字</TableHead>
                        <TableHead>随机</TableHead>
                        <TableHead>公开</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.is_random ? "√" : "×"}</TableCell>
                            <TableCell>{category.is_public ? "√" : "×"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}