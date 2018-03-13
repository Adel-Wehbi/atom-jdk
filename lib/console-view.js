"use babel";

export default class ConsoleView{
    constructor(model){
        this.model          =   model;

        this.consoleTitle   =   "Java Console";

        //the root element of our view
        this.rootElement    =   document.createElement("div");
        this.rootElement.classList.add("atom-jdk");

        //panel divider for resizing
        this.panelDivider    =   document.createElement("div");
        this.panelDivider.classList.add("panel-divider");
        //make sure the handlers for resizing have "this" bound to this object
        this.resizeStarted   =   this.resizeStarted.bind(this);
        this.resize          =   this.resize.bind(this);
        this.resizeEnded     =   this.resizeEnded.bind(this);
        //and now listen to resizing
        this.panelDivider.addEventListener("mousedown", this.resizeStarted);
        this.rootElement.appendChild(this.panelDivider);

        //a container div for our panel
        this.panelContainer             =   document.createElement("div");
        this.panelContainer.classList.add("panel-container");
        this.rootElement.appendChild(this.panelContainer);

        //a top bar for our title and buttons
        var topBar                      =   document.createElement("div");
        topBar.classList.add("topBar");
        this.panelContainer.appendChild(topBar);

        //title in top topBar
        var title       =   document.createElement("div");
        title.classList.add("title");
        title.classList.add("left");
        title.innerHTML =   this.consoleTitle;
        topBar.appendChild(title);

        var closeButton         =   document.createElement("a");
        closeButton.classList.add("right");
        closeButton.innerHTML   =   '<span class="icon icon-remove-close"></span>';
        closeButton.addEventListener("click", (e) => this.model.hide());
        topBar.appendChild(closeButton);

        var clearButton         =   document.createElement("a");
        clearButton.classList.add("right");
        clearButton.innerHTML   =   "Clear";
        clearButton.addEventListener("click", (e) => this.clear());
        topBar.appendChild(clearButton);

        var killButton          =   document.createElement("a");
        killButton.classList.add("right");
        killButton.innerHTML    =   "Kill";
        killButton.addEventListener("click", (e) => this.kill());
        topBar.appendChild(killButton);

        this.console            =   document.createElement("div");
        this.console.classList.add("console");
        this.panelContainer.appendChild(this.console);

        this.consoleContent     =   document.createElement("pre");
        this.consoleContent.classList.add("console-content");
        this.consoleContent.innerHTML = "TESTING";
        this.console.appendChild(this.consoleContent);

        this.input              =   document.createElement("input");
        this.input.classList.add("native-key-bindings");
        //when the user clicks on the console, we must start listening to input
        this.getRoot().addEventListener("click", (e) => this.input.focus());
        //we need to update our input display when the value of the input changes
        this.input.addEventListener("input", (e) => {
            var text    =   e.target.value;
            this.inputDisplay.innerHTML =   text;
        });
        this.input.addEventListener("keydown", (e) =>{
            //if Enter is pressed
            if(e.keyCode == 13){
                var text = e.target.value;
                //give the input to the model
                this.model.input(text + "\n");
                //empty the input
                e.target.value                  =   '';
                //empty the inputDisplay too
                this.inputDisplay.innerHTML     =   '';

                this.consoleContent.innerHTML   =   this.consoleContent.innerHTML + text + '\n';
            }

            //set the caret to the end no matter what button is pressed
            e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        });
        this.console.appendChild(this.input);

        //since the actual input element is hidden, we need somewhere to display what the user enters
        this.inputDisplay       =   document.createElement("div");
        this.inputDisplay.classList.add("inputDisplay");
        this.console.appendChild(this.inputDisplay);

        var caret               =   document.createElement("div");
        caret.classList.add("caret");
        this.console.appendChild(caret);

        //and finally create the panel
        this.panel  =   atom.workspace.addBottomPanel({
            item: this.getRoot(),
            visible: false
        })

        if(this.model.isVisible())
            this.show();
    }

    /**
     * Returns the root element of the view.
     * @author Adel Wehbi
     * @returns {HTMLElement}  The root element that contains the entire panel.
     */
    getRoot(){
        return this.rootElement;
    }

    /**
     * Shows the console.
     * @author Adel Wehbi
     */
    show(){
        this.panel.show();
        this.input.focus();
    }

    /**
     * Closes the panel.
     * @author Adel Wehbi
     */
    hide(){
        this.panel.hide();
    }

    /**
     * Clears the content of the panel, including text in the input that was not yet flushed.
     * @author Adel Wehbi
     */
    clear(){
    }

    /**
     * Sends a kill command to the model to kill any running process.
     * @author Adel Wehbi
     */
    kill(){
        this.model.killProcess();
    }

    /**
     * Starts listening to mouse moves to resize the console. It is called after the user
     * holds the panelDivider.
     * @author Adel Wehbi
     */
    resizeStarted(){
        //now that resize has started, we need to listen to when the mouse moves up
        //or down
        document.addEventListener("mousemove", this.resize);
        //when user stops dragging, stop resizing
        document.addEventListener("mouseup",   this.resizeEnded);
    }

    /**
     * Called when the user lets go of the panelDivider.
     * @author Adel Wehbi
     */
    resizeEnded(){
        //stop listening to mouse moves
        document.removeEventListener("mousemove", this.resize);
        document.removeEventListener("mouseup", this.resizeEnded);
    }

    /**
     * Resizes the console based on the position of the mouse and the height of the parent.
     * @author Adel Wehbi
     * @param   {number} clientY The position of the mouse in the document.
     */
    resize({clientY}){
        //the minimum height of our panel
        var minHeight                       =   parseInt(window.getComputedStyle(this.panelContainer).getPropertyValue('min-height'), 10);
        //the new height is calculated as height of parent (excluding some wrappers) - y coordinate of mouse
        var newHeight                       =   this.getRoot().parentElement.parentElement.parentElement.clientHeight - clientY;
        this.getRoot().style.height         =   (newHeight > minHeight) ? newHeight + "px" : minHeight + "px";
    }

    destroy(){
        this.getRoot().remove();
    }
}
