// Get the current date
const currentDate = new Date();

// Define an array of month names
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Get the day, month, and year
const day = currentDate.getDate();
const month = monthNames[currentDate.getMonth()];
const year = currentDate.getFullYear();

// Format the date
export const formattedDate = `${day} ${month} ${year}`;