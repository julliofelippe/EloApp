import Realm from 'realm';

export class carFormImageSchema extends Realm.Object {
  imageUrl: string;
  imageTitle: string;
  imageDescription: string;
  static primaryKey: '_id';
}
