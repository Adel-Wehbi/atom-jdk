'use babel';

import AtomJdkView from './atom-jdk-view';
import { CompositeDisposable } from 'atom';
import Console from './console'

export default {

    atomJdkView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.atomJdkView = new AtomJdkView(state.atomJdkViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.atomJdkView.getElement(),
            visible: false
        });

        this.subscriptions = new CompositeDisposable();

        //Register commands
        this.subscriptions.add(atom.commands.add("atom-workspace", {
            "Atom-JDK:Build-Project": () => this.toggle()
        }));

        this.subscriptions.add(atom.commands.add("atom-workspace", {
            "Atom-JDK:Run-Project": () => this.toggle()
        }));

        this.subscriptions.add(atom.commands.add("atom-workspace", {
            "Atom-JDK:Build-and-Run-Project": () => this.toggle()
        }));

        this.subscriptions.add(atom.commands.add("atom-workspace", {
            "Atom-JDK:Toggle-Java-Console": ()  => this.toggle()
        }));

        let console     =   new Console("<div>");
        

    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.atomJdkView.destroy();
    },

    serialize() {
        return {
            atomJdkViewState: this.atomJdkView.serialize()
        };
    },

    toggle() {
        console.log('AtomJdk was toggled!');
        return(
            this.modalPanel.isVisible() ?
            this.modalPanel.hide() :
            this.modalPanel.show()
        );
    },

    toggleConsole() {

    },

    buildProject() {

    },

    runProject() {

    },

    buildRunProject() {

    }

};
