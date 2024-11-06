export function parseEventDate(dateString, timeString) {
  // Split date and time separately for safer parsing
  const [year, month, day] = dateString.split("-").map(Number); // Split the date string (YYYY-MM-DD)

  // Convert 12-hour time format (with AM/PM) to 24-hour format
  const [time, modifier] = timeString.split(" "); // Split the time and AM/PM
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12; // Convert PM to 24-hour format
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0; // Midnight case
  }

  // Manually construct the Date object using the year, month, day, hours, and minutes
  return new Date(year, month - 1, day, hours, minutes); // Month is zero-based in JS
}

export function calculateTimeDifference(eventDate, now) {
  const difference = eventDate.getTime() - now.getTime();

  if (difference > 0) {
    // Calculate days, hours, minutes, and seconds remaining
    const days = Math.floor(difference / (1000 * 60 * 60 * 24)); // Total days remaining
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ); // Remaining hours after days
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes after hours
    const seconds = Math.floor((difference % (1000 * 60)) / 1000); // Remaining seconds after minutes

    // Update the time left state with days, hours, minutes, and seconds
    return `${days} ${hours} ${minutes} ${seconds}`;
  } else {
    // If the event has started, clear the timer and show the event has started
    return "Event has started";
  }
}


export function formatDate(dateString) {
  // Create a new Date object from the input string
  const date = new Date(dateString);
  
  // Define options for date formatting
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  
  // Format the date using toLocaleDateString with the options
  return date.toLocaleDateString(options);
}