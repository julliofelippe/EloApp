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
  breakIn: string;
  breakOut: string;
  static primaryKey: '_id';
  static schema: Realm.ObjectSchema = {
    name: 'CarFormSchema',
    properties: {
      _id: {
        type: 'string',
        default: () => new Realm.BSON.ObjectID().toString()
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
      breakIn: 'string',
      breakOut: 'string'
    }
  };
}

export { CarFormSchema };
