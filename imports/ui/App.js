import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ExportsCollection } from '../api/ExportsCollection';
import { Tracker } from 'meteor/tracker';
import { ReactiveDict } from 'meteor/reactive-dict';

import "./App.html";
import "./Export.html";

const IS_LOADING_STRING = 'isLoading';

Template.mainContainer.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict();

    const handler = Meteor.subscribe('exports');
    Tracker.autorun(() => {
        this.state.set(IS_LOADING_STRING, !handler.ready());
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
        return instance.state.get(IS_LOADING_STRING)
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