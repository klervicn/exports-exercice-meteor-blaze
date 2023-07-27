import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { mockMethodCall } from 'meteor/quave:testing';
import { ExportsCollection } from './ExportsCollection';
import '/imports/api/exportsMethods';

if (Meteor.isServer) {
    describe('Exports', () => {
        describe('methods', () => {
            it('can insert new export', () => {
                const name = 'Test export';
                mockMethodCall('exports.insert', name, {});

                const exports = ExportsCollection.find({}).fetch();
                assert.equal(exports.length, 1);
                assert.isTrue(exports.some(exportRecord => exportRecord.name === name));
            })
        })
    })
}