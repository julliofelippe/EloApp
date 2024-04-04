// import { useState } from 'react';
// import { Button } from 'native-base';
// import DatePicker from 'react-native-date-picker';

// export default function DateModal() {
//   const [date, setDate] = useState(new Date());
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <Button onPress={() => setOpen(true)}>Open</Button>
//       <DatePicker
//         modal
//         open={open}
//         date={date}
//         onConfirm={(date) => {
//           setOpen(false);
//           setDate(date);
//         }}
//         onCancel={() => {
//           setOpen(false);
//         }}
//       />
//     </>
//   );
// }
