export default function currentDates() {
    const tabLabels = [];
    const monthNames = new Intl.DateTimeFormat("en-US", { month: "long" });
    const currentDate = new Date();
  
    for (let i = 0; i < 5; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
  
      const currentDay = nextDate.getDate();
      const currentMonth = nextDate.getMonth();
  
      const monthName = monthNames.format(
        new Date(nextDate.getFullYear(), currentMonth, 1)
      );
  
      const finalDate = `${monthName} ${currentDay}`;
  
      tabLabels.push(finalDate);
    }
  
    return tabLabels;
  }
  