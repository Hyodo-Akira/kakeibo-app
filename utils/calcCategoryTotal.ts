export function calcCategoryTotal(items: {id: string; name: string; amount: number; category: string; }[]) {
    return items.reduce((acc, item) => {
        if (acc[item.category]) {
            // 足し算
            acc[item.category] = acc[item.category] + item.amount;
        } else {
            // 新規セット
            acc[item.category] = item.amount;
        }
        return acc;
    }, {} as { [key: string]: number });
}