import { Meteor } from 'meteor/meteor';
import { ExportsCollection, incrementExportProgress } from "/imports/api/ExportsCollection"
import "/imports/api/exportsMethods"
import "/imports/api/exportsPublications"

const makeExportsProgress = () => {
  const exports = ExportsCollection.find({
    progress: {
      $lt: 100
    }
  });
  exports.forEach(incrementExportProgress);
}

Meteor.startup(() => {
  Meteor.setInterval(makeExportsProgress, 1000)
});
