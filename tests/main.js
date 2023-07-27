import assert from "assert";
import { mockMethodCall } from 'meteor/quave:testing';
import { ExportsCollection, incrementExportProgress } from "../imports/api/ExportsCollection";
import { urls } from "../imports/api/urls";
import '/imports/api/exportsMethods.tests.js';
import '/imports/api/exportsMethods';

describe("exports-exercice-meteor-blaze", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "exports-exercice-meteor-blaze");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});

describe("export progression", function () {
  beforeEach(function () {
    const name = 'Test export';
    mockMethodCall('exports.insert', name, {});
  })


  it("export progression is incremented", function () {
    const exportRecord = ExportsCollection.findOne({});
    assert.strictEqual(exportRecord.progress, 0);

    const exportId = exportRecord._id;

    incrementExportProgress(exportRecord);

    const incrementedExportRecord = ExportsCollection.findOne({ _id: exportId });
    assert.strictEqual(incrementedExportRecord.progress, 5);

    ExportsCollection.remove({
      _id: exportId
    })

  })

  it("export url is not set before progression is 100", function () {
    const exportRecord = ExportsCollection.findOne({});
    const exportId = exportRecord._id;
    ExportsCollection.update(exportId, {
      $set: {
        progress: 90,
        url: "",
      }
    })
    const updatedExportRecord = ExportsCollection.findOne({ _id: exportId });
    incrementExportProgress(updatedExportRecord);

    const incrementedExportRecord = ExportsCollection.findOne({ _id: exportId });

    assert.strictEqual(incrementedExportRecord.progress, 95);
    assert.strictEqual(incrementedExportRecord.url, "");

    ExportsCollection.remove({
      _id: exportId
    })

  })

  it("set an url when an export is completed", function () {
    const exportRecord = ExportsCollection.findOne({});
    const exportId = exportRecord._id;
    ExportsCollection.update(exportId, {
      $set: {
        progress: 95,
        url: "",
      }
    })
    const updatedExportRecord = ExportsCollection.findOne({ _id: exportId });
    incrementExportProgress(updatedExportRecord);

    const incrementedExportRecord = ExportsCollection.findOne({ _id: exportId });

    assert.strictEqual(incrementedExportRecord.progress, 100);
    assert.strictEqual(urls.includes(incrementedExportRecord.url), true);

    ExportsCollection.remove({
      _id: exportId
    })
  })

  it("does not increment progression past 100", function () {
    const exportRecord = ExportsCollection.findOne({});
    const exportId = exportRecord._id;
    ExportsCollection.update(exportId, {
      $set: {
        progress: 95,
        url: "",
      }
    })
    const updatedExportRecord = ExportsCollection.findOne({ _id: exportId });

    incrementExportProgress(updatedExportRecord);
    incrementExportProgress(updatedExportRecord);

    const incrementedExportRecord = ExportsCollection.findOne({ _id: exportId });

    assert.strictEqual(incrementedExportRecord.progress, 100);

    ExportsCollection.remove({
      _id: exportId
    })
  })

})
