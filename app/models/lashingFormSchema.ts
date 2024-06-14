import Realm, { BSON } from 'realm';

class LashingImageList extends Realm.Object<LashingImageList> {
  imageUrl: string;
  imageTitle: string;
  imageDescription: string;
  static schema: Realm.ObjectSchema = {
    name: 'LashingImageList',
    properties: {
      imageUrl: 'string',
      imageTitle: 'string',
      imageDescription: 'string'
    }
  };
}

class LashingCargoList extends Realm.Object<LashingCargoList> {
  newCargoNumber: string;
  newCargoDescription: string;
  newCargoDimensions: string;
  newCargoWeight: string;
  static schema: Realm.ObjectSchema = {
    name: 'LashingCargoList',
    properties: {
      newCargoNumber: 'string',
      newCargoDescription: 'string',
      newCargoDimensions: 'string',
      newCargoWeight: 'string'
    }
  };
}

class LashingMaterialList extends Realm.Object<LashingMaterialList> {
  newMaterialNumber: string;
  newMaterialDescription: string;
  newMaterialQuantity: string;
  newMaterialSWL: string;
  static schema: Realm.ObjectSchema = {
    name: 'LashingMaterialList',
    properties: {
      newMaterialNumber: 'string',
      newMaterialDescription: 'string',
      newMaterialQuantity: 'string',
      newMaterialSWL: 'string'
    }
  };
}

class LashingFormSchema extends Realm.Object<LashingFormSchema> {
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
  image: Realm.List<LashingImageList>;
  newCargo: Realm.List<LashingCargoList>;
  newMaterial: Realm.List<LashingMaterialList>;
  static primaryKey: '_id';
  static schema: Realm.ObjectSchema = {
    name: 'LashingFormSchema',
    properties: {
      _id: {
        type: 'string',
        default: () => new Realm.BSON.ObjectID().toHexString()
      },
      clientName: 'string',
      certificateNumber: 'string',
      date: 'string',
      containersNumber: 'string',
      reservationNumber: 'string',
      loadingPort: 'string',
      destinationPort: 'string',
      cargoNumber: 'string',
      cargoDescription: 'string',
      cargoDimensions: 'string',
      cargoWeight: 'string',
      materialNumber: 'string',
      materialDescription: 'string',
      materialQuantity: 'string',
      materialSWL: 'string',
      cintasQuantity: 'string',
      companyName: 'string',
      cargoLateralExcess: 'string',
      cargoHeightExcess: 'string',
      cargoDate: 'string',
      image: { type: 'list', objectType: 'LashingImageList' },
      newCargo: { type: 'list', objectType: 'LashingCargoList' },
      newMaterial: { type: 'list', objectType: 'LashingMaterialList' }
    }
  };
}

export {
  LashingImageList,
  LashingCargoList,
  LashingMaterialList,
  LashingFormSchema
};
