import { Meteor } from 'meteor/meteor';
import { ExportsCollection } from './ExportsCollection';

Meteor.publish('exports', function publishExports() {
    return ExportsCollection.find({});
})