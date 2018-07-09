import {Command, Layer, Scene7Request} from "../scene7url";

it('command url partial test', () => {
    let command = new Command("anchor", "0,0");
    expect(command.urlPartial).toEqual("anchor=0,0")
});

it('command. Set name, value', () => {
    let command = new Command("", "");
    command.name = "anchor";
    command.value = "0,0";
    expect(command.urlPartial).toEqual("anchor=0,0")
});

it('Layer url partial. Empty command', () => {
    let layer = new Layer();
    expect(layer.urlPartial).toEqual("layer=0");
});

it('Layer url partial. Non-Empty command', () => {
    let layer = new Layer();
    let command = new Command("anchor", "0,0");
    let command2 = new Command("size", "750,393");
    layer.addCommand(command);
    layer.addCommand(command2);
    expect(layer.urlPartial).toEqual("layer=0&anchor=0,0&size=750,393");
});

it('Scene7 Request', () => {
    let layer1 = new Layer();
    let command = new Command("anchor", "0,0");
    let command2 = new Command("size", "750,393");
    layer1.addCommand(command);
    layer1.addCommand(command2);

    let layer2 = new Layer(1);
    let layer2Command = new Command("anchor", "0.5,0.5");
    let layer2Command2 = new Command("size", "750,393");
    layer2.addCommand(layer2Command);
    layer2.addCommand(layer2Command2);

    let scene7Request = new Scene7Request();
    scene7Request.addCommand(layer1);
    scene7Request.addCommand(layer2);
    expect(scene7Request.urlPartial).toEqual("layer=0&anchor=0,0&size=750,393&layer=1&anchor=0.5,0.5&size=750,393");
});