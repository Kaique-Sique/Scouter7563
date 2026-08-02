const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function formatEventDateRange(
    startDate?: string | null,
    endDate?: string | null
): string {
    if (!startDate) return "";

    try
    {

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start;

    const startMonth = MONTHS[start.getMonth()];
    const endMonth = MONTHS[end.getMonth()];

    const startDay = start.getDate();
    const endDay = end.getDate();

    if (startMonth === endMonth) {
        if (startDay === endDay) {
            return `${startMonth} ${startDay}`;
        }

        return `${startMonth} ${startDay}-${endDay}`;
    }

    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    }   catch  { 
        return ""; 
    }
}