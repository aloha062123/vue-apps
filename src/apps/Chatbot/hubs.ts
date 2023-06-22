import App from "./App.vue";
import HubsAppProto from "../HubsApp";

class HubsApp extends HubsAppProto {

    // constructor (params: any = {}) {
    //     super(App, 400, 225, params);
    //     this.isInteractive = true;

    // }

    constructor (width: number, height: number, public params: any = {}) {
        super(App, width, height, params)
         this.isInteractive = true;

         this.vueApp.provide('app', this);

         // Listen for the 'user-input' event emitted from the Vue app
         this.vueApp.config.globalProperties.$on('user-input', (input) => {
           this.updateAnswer(input);
         });
    }

    updateAnswer(input: string) {
        const answer = '✅ User input: ' + input;
        this.vueApp.config.globalProperties.$refs.app.res = answer;
      }

    // change the label of the node
    async setLabel(text: string, color: string) {
        this.params.text = text
        this.params.color = color

        // return a promise that resolves when the label is set
        // and updated
        return this.waitForReady()
    }
}

var init = function(params: any = {}) {
    let app = new HubsApp(0, 0, params)
    app.mount()
    return app
}

export default init