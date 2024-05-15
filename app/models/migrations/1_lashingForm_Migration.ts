import { BSON } from 'realm';
import { LashingFormSchema } from '../lashingFormSchema';

export const migrationFunction: Realm.MigrationCallback = (
  oldRealm,
  newRealm
) => {
  console.log('Executing migration function');
  // if (oldRealm.schemaVersion < 2) {
  //   const LashingFormSchema = newRealm.schema.find(
  //     (s) => s.name === 'LashingFormSchema'
  //   );
  //   if (LashingFormSchema) {
  //     // Add the 'image' property as an array
  //     newRealm.create(
  //       'LashingFormSchema',
  //       {
  //         _id: {
  //           type: 'string',
  //           default: () => new Realm.BSON.ObjectID().toHexString()
  //         },
  //         clientName: 'string',
  //         certificateNumber: 'string',
  //         date: 'string',
  //         containersNumber: 'string',
  //         reservationNumber: 'string',
  //         loadingPort: 'string',
  //         destinationPort: 'string',
  //         cargoNumber: 'string',
  //         cargoDescription: 'string',
  //         cargoDimensions: 'string',
  //         cargoWeight: 'string',
  //         materialNumber: 'string',
  //         materialDescription: 'string',
  //         materialQuantity: 'string',
  //         materialSWL: 'string',
  //         cintasQuantity: 'string',
  //         companyName: 'string',
  //         cargoLateralExcess: 'string',
  //         cargoHeightExcess: 'string',
  //         cargoDate: 'string',
  //         image: { type: 'list', objectType: 'LashingImageList' }
  //       },
  //       true
  //     );

  //     const existingObjects = newRealm.objects('LashingFormSchema');
  //     console.log('Number of existing objects:', existingObjects.length);

  //     existingObjects.forEach((object: any) => {
  //       if (!object._id) {
  //         // Generate a new ObjectId if _id is undefined
  //         console.log('Adding _id for object:', object);
  //         object._id = new BSON.ObjectId();
  //       }
  //     });
  //   }
  // }
  if (oldRealm.schemaVersion <= 3) {
    console.log('executing version 3');
    const CarFormSchema = newRealm.schema.find(
      (s) => s.name === 'CarFormSchema'
    );
    console.log('executing version 3');
    if (CarFormSchema) {
      newRealm.create(
        'CarFormSchema',
        {
          _id: {
            type: 'string',
            default: () => new Realm.BSON.ObjectID().toHexString()
          },
          containerNumber: 'string',
          containerType: 'string',
          reportDate: 'string',
          day: 'string',
          clientName: 'string',
          sector: 'string',
          local: 'string',
          contractor: 'string',
          responsible: 'string',
          function: 'string',
          entryTime: 'string',
          exitTime: 'string',
          turnTime: 'string',
          breakIn: 'string',
          breakOut: 'string',
          breakTurn: 'string',
          morningWeather: 'string?',
          morningStatus: 'string?',
          afternoonWeather: 'string?',
          afternoonStatus: 'string?',
          nightWeather: 'string?',
          nightStatus: 'string?',
          activity: 'string?',
          certificateDescription: 'string?',
          containerDescription: 'string?',
          containerStatus: 'string?'
        },
        true
      );
      const existingObjects = newRealm.objects('CarFormSchema');
      console.log('Number of existing objects:', existingObjects.length);

      existingObjects.forEach((object: any) => {
        if (!object._id) {
          // Generate a new ObjectId if _id is undefined
          console.log('Adding _id for object:', object);
          object._id = new BSON.ObjectId().toHexString();
        }
      });
    }
  }

  console.log('Migration completed');
};
