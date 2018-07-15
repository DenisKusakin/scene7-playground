import {decorate, observable, computed, action} from "mobx"
import scene7Commands from "./scene7-commands"

class Command {
    constructor(name, value) {
        this.name = name;
        this.value = value
    }

    get urlPartial() {
        return `${this.name}=${this.value}`
    }

    get isCommandKnown() {
        return !!Object.keys(scene7Commands).find(x => x.toLowerCase() === this.name.toLowerCase())
    }
}

class Layer {
    order = 0;
    commands = [];
    hide = null;

    constructor(order = 0) {
        this.order = order;
        this.commands = []
    }

    addCommand(command) {
        //if (command instanceof Layer) throw "Layer is not valid command in Layer";
        this.commands.push(command)
    }

    removeCommand(index) {
        this.commands.splice(index, 1)
    }

    get urlPartial() {
        let layerCommandsUrlPartial = this.commands.map(command => command.urlPartial).join("&");
        if (this.commands.length > 0) {
            return `layer=${this.order}&${layerCommandsUrlPartial}${this.hide ? "&hide=1" : (this.hide === null ? "" : "&hide=0")}`
        } else {
            return `layer=${this.order}`
        }
    }

}

class Scene7Request {
    commands = [];
    host = null;
    template = null;

    constructor() {
        this.commands = []
    }

    addCommand(command) {
        this.commands.push(command)
    }

    addLayer() {
        const totalLayers = this.commands.filter(x => x instanceof Layer).length;
        let newLayer = new Layer(totalLayers);
        newLayer.addCommand(new Command("", ""));
        this.commands.push(newLayer)
    }

    removeCommand(index) {
        this.commands.splice(index, 1)
    }

    get urlPartial() {
        return `${this.host}/is/image/${this.template}?${this.commands.map(command => command.urlPartial).join("&")}`
    }
}

function urlToScene7Request(scene7Url) {
    //TODO: This primitive implementation should be reworked
    const [hostWithTemplate, rest] = scene7Url.split("?");
    const [host, template] = hostWithTemplate.split("/is/image/");
    const parametersPairs = rest ? rest.split("&") : [];
    const request = new Scene7Request();
    request.host = host;
    request.template = template;
    let addCommandFunc = command => {
        request.addCommand(command)
    };
    parametersPairs.forEach(parameterPair => {
        const [name, value] = parameterPair.split("=");
        //console.log(name, value);
        if (name === 'layer') {
            let newLayer = new Layer(value);
            request.addCommand(newLayer);
            addCommandFunc = command => newLayer.addCommand(command)
        } else {
            addCommandFunc(new Command(name, value));
        }
    });
    return request
}

decorate(Command, {
    name: observable,
    value: observable,
    urlPartial: computed,
    isCommandKnown: computed
});

decorate(Layer, {
    order: observable,
    commands: observable,
    hide: observable,
    urlPartial: computed,
    addCommand: action,
    removeCommand: action
});

decorate(Scene7Request, {
    commands: observable,
    host: observable,
    template: observable,
    addCommand: action,
    urlPartial: computed,
    removeCommand: action,
    addLayer: action
});

export {Command, Layer, Scene7Request, urlToScene7Request}