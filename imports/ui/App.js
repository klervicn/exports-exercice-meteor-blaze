import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ExportsCollection } from '../api/ExportsCollection';
import { Tracker } from 'meteor/tracker';
import { ReactiveVar } from 'meteor/reactive-var';

import "./App.html";
import "./Export.html";

Template.mainContainer.onCreated(function mainContainerOnCreated() {
    this.isLoading = new ReactiveVar(false);

    const handler = Meteor.subscribe('exports');
    Tracker.autorun(() => {
        this.isLoading.set(!handler.ready());
    });
});

Template.mainContainer.helpers({
    exports() {
        return ExportsCollection.find({},
            {
                sort: { createdAt: -1 },
            }
        ).fetch();
    },
    isLoading() {
        const instance = Template.instance()
        return instance.isLoading.get()
    }
})

Template.form.events({
    'submit .export-form'(event) {
        event.preventDefault();

        const { target } = event;
        const name = target.name.value;

        Meteor.call('exports.insert', name);

        target.name.value = '';
    },
});