export default function formatDate(date) {
  let weekday = new Intl.DateTimeFormat("en", { weekday: "short" }).format(
    date
  );
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  let month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  return `${weekday} ${day}/${month}/${year}`;
}
