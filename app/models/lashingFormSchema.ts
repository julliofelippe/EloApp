import Realm, { BSON } from 'realm';

export class LashingFormSchema extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  clientName: string;
  certificateNumber: string;
  date: string;
  containersNumber: string;
  reservationNumber: string;
  loadingPort: string;
  destinationPort: string;
  cargoNumber: string;
  cargoDescription: string;
  cargoDimensions: string;
  cargoWeight: string;
  materialNumber: string;
  materialDescription: string;
  materialQuantity: string;
  materialSWL: string;
  cintasQuantity: string;
  companyName: string;
  cargoLateralExcess: string;
  cargoHeightExcess: string;
  cargoDate: string;
  image: [
    {
      imageUrl: string;
      imageTitle: string;
      imageDescription: string;
    }
  ];
  static primaryKey: '_id';
}
