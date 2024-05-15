import Realm, { BSON } from 'realm';

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
      containerStatus: 'string?'
    }
  };
}

export { CarFormSchema };
