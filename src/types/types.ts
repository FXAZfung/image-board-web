export type Auth = {
    token: string
    expire: string | Date
}

export type Category = {
    id: number
    name: string
    is_public: boolean
    is_random: boolean
}

export type CategoryRequest = {
    name: string
    is_public: boolean
    is_random: boolean
}

export type Image = {
    id: number
    file_name: string
    content_type: string
    path: string
    category: string
    width: number
    height: number
    short_link: string
    created_at: string | Date
}

export type ImageRequest = {
    image: File | Blob | null
    category: string
    shortLink: string
}


export type Setting = {
    site_title: string
    announcement: string
    index_title: string
    index_description: string
    logo: string
    favicon: string
    default_page_size: number
    robots_txt: string
}

export type SettingRequest = {
    key: string
    value: string | number
}

export type LoginRequest = {
    username: string
    password: string
}

export type Info = {
    category_count: number
    image_count: number
    storage_usage: number
    user_count: number
}