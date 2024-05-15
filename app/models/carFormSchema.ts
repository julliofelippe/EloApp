import Realm, { BSON } from 'realm';

class CarImageList extends Realm.Object<CarImageList> {
  imageUrl: string;
  imageTitle: string;
  imageDescription: string;
  static schema: Realm.ObjectSchema = {
    name: 'CarImageList',
    properties: {
      imageUrl: 'string',
      imageTitle: 'string',
      imageDescription: 'string'
    }
  };
}

class CarFormSchema extends Realm.Object<CarFormSchema> {
  _id: BSON.ObjectId = new BSON.ObjectID();
  containerNumber: string;
  containerType: string;
  reportDate: string;
  day: string;
  clientName: string;
  sector: string;
  local: string;
  contractor: string;
  responsible: string;
  function: string;
  entryTime: string;
  exitTime: string;
  turnTime: string;
  breakIn: string;
  breakOut: string;
  breakTurn: string;
  morningWeather: string;
  morningStatus: string;
  afternoonWeather: string;
  afternoonStatus: string;
  nightWeather: string;
  nightStatus: string;
  activity: string;
  certificateDescription: string;
  containerDescription: string;
  containerStatus: string;
  image: Realm.List<CarImageList>;
  static primaryKey: '_id';
  static schema: Realm.ObjectSchema = {
    name: 'CarFormSchema',
    properties: {
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
      containerStatus: 'string?',
      image: { type: 'list', objectType: 'LashingImageList' }
    }
  };
}

export { CarFormSchema };
