import { Mongo } from 'meteor/mongo';
import { getRandomURL } from './urls';

export const ExportsCollection = new Mongo.Collection('exports');

export const incrementExportProgress = (exportRecord) => {
    if (exportRecord && exportRecord.progress < 100) {
        const progress = exportRecord.progress + 5;
        const isExportComplete = progress === 100;
        const url = isExportComplete ? getRandomURL() : "";

        ExportsCollection.update(exportRecord._id, {
            $set: {
                progress,
                url,
            }
        })
    }
}