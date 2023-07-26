import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ExportsCollection } from './ExportsCollection';

Meteor.methods({
    'exports.insert'(name) {
        check(name, String);

        ExportsCollection.insert({
            name,
            progress: 0,
            url: "",
            createdAt: new Date(),
        });
    },
});