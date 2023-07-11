interface RestaurantItem {
    name: string
    link: string
}

export const query = ref<string>('')

export const restaurants = ref<RestaurantItem[]>([])

export const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
    // 调用回调函数以返回建议
    cb(results)
}

const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
        return (
            restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}