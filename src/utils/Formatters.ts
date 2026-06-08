
export const currencyFormatter = new Intl.NumberFormat("en-US", {
    currency: "EUR",
    style: "currency",
})

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
})


const isSameDay = (firstDate: Date, secondDate: Date) => {
    return firstDate.toDateString() === secondDate.toDateString()
}

export const getDateGroupLabel = (date: Date) => {
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if (isSameDay(date, today)) return "TODAY"
    if (isSameDay(date, yesterday)) return "YESTERDAY"
    console.log(date)
    return dateFormatter.format(date).toUpperCase()
}