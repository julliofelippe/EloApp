import { parse, format } from 'date-fns';

const dateConverter = (currentDate) => {
  const parsedDate = parse(currentDate, 'dd/MM/yyyy', new Date());
  const formattedDate = format(parsedDate, 'MMMM do yyyy');
  return formattedDate;
};

export default dateConverter;
