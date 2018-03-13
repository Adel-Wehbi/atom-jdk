"use babel";

import ConsoleView from "./console-view";

export default class Console {

    constructor(state){
        if(state != undefined)
            this.visible    =   state.visible || false;
        else
            this.visible    =   false;

        this.view           =   new ConsoleView(this);
    }

    /**
     * Returns the visibility state of the console.
     * @author Adel Wehbi
     * @returns {boolean} True for visible, false for invisible.
     */
    isVisible(){
        return this.visible;
    }

    show(){
        this.view.show();
        this.visible    =   true;
    }

    hide(){
        this.view.hide();
        this.visible    =   false;
    }

    /**
     * Sets the handler function to be called when the Kill button on the console is clicked.
     * @author Adel Wehbi
     * @param  {function} handler Handler function.
     */
    setKillHanlder(handler){
        if(typeof(handler) == 'function')
            this.killHandler = handler;
    }

    /**
     * Calls the kill handler if it was set.
     * @author Adel Wehbi
     */
    killProcess(){
        if(this.killHandler != undefined)
            this.killHandler();
    }

    setInputHandler(handler){
        if(typeof(handler) == 'function')
            this.inputHandler = handler;
    }

    input(text){
        if(this.inputHandler != undefined)
            this.inputHandler(text);
    }

    destroy(){
        this.view.destroy();
    }

}
