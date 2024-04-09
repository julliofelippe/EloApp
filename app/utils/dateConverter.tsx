const dateConverter = (currentDate) => {
  const { parse, format } = require('date-fns');

  const dateObj = parse(currentDate, 'dd/MM/yyyy', new Date());

  const formattedDate = format(dateObj, 'MMMM do yyyy');
  console.log(formattedDate);
};

export default dateConverter;
