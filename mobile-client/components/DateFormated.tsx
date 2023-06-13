import moment from "moment";
import "moment/locale/fr";

const DateFormated = (date: Date) => {
  if (!date) return "...";

  moment.locale("fr");
  const formattedDate = moment(date).format("LL");
  return formattedDate;
};

export default DateFormated;
