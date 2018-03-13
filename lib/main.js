'use babel';

import { CompositeDisposable } from 'atom';
import Console from './console';

export default {

    subscriptions: null,
    console: null,

    activate(state) {
        //create a new Java Console instance, which in turn will create the console view.
        this.console     =   new Console(state.console);
        //listen to kill command
        this.console.setKillHanlder(function(){
            console.log("Kill command called.");
        });
        //listen to input from the console
        this.console.setInputHandler(function(text){
            console.log("Input received: " + text);
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
            "Atom-JDK:Toggle-Java-Console": ()  => this.toggleConsole()
        }));

    },

    deactivate() {
        this.subscriptions.dispose();
        this.console.destroy();
    },

    serialize() {
        return {
            console: {
                visible: this.console.isVisible()
            }
        };
    },

    toggle() {
        // return(
        //     this.modalPanel.isVisible() ?
        //     this.modalPanel.hide() :
        //     this.modalPanel.show()
        // );
    },

    toggleConsole() {
        if(this.console.isVisible())
            this.console.hide();
        else
            this.console.show();
    },

    buildProject() {

    },

    runProject() {

    },

    buildRunProject() {

    }

};
