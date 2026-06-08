export const currencyFormatter = new Intl.NumberFormat("en-US", {
    currency: "EUR",
    style: "currency",
})

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
})

const dateWithYearFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
})

export const getDateInputValue = (date = new Date()) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

const isSameDay = (firstDate: Date, secondDate: Date) => {
    return firstDate.toDateString() === secondDate.toDateString()
}

export const getDateGroupLabel = (date: Date) => {
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if (isSameDay(date, today)) return "TODAY"
    if (isSameDay(date, yesterday)) return "YESTERDAY"
    if (date.getFullYear() !== today.getFullYear()) {
        return dateWithYearFormatter.format(date).toUpperCase()
    }

    return dateFormatter.format(date).toUpperCase()
}
