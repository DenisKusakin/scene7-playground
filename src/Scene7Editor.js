import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import {Command, Layer, Scene7Request} from "./scene7url";
import {observer} from "mobx-react";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autosuggest from './autosuggest';
import scene7Commands from './scene7-commands';
import ColorPicker from './colorPicker';
import InputAdornment from '@material-ui/core/InputAdornment';

const getCommandInfo = commandName => {
    return scene7Commands[commandName];
};

const isValidColor = colorString => {
    const [r, g, b] = colorString.split(",");
    return !isNaN(parseInt(r)) && !isNaN(parseInt(g)) && !isNaN(parseInt(b))
};

const colorStringToRGB = color => {
    const [r, g, b] = color.split(",");
    return {
        r: parseInt(r),
        g: parseInt(g),
        b: parseInt(b)
    }
};

const PositionEditor = ({x, y, onChange}) => <div style={{display: 'flex', flexDirection: 'column'}}>
    <TextField
        value={parseInt(x)}
        onChange={e => {
            onChange({x: e.target.value, y})
        }}
        type="number"
        margin="normal"
        fullWidth
        InputLabelProps={{
            shrink: true,
        }}
        InputProps={{
            startAdornment: <InputAdornment position="start">X: </InputAdornment>
        }}
    />
    <TextField
        value={parseInt(y)}
        onChange={e => {
            onChange({x, y: e.target.value})
        }}
        margin="normal"
        type="number"
        InputLabelProps={{
            shrink: true,
        }}
        InputProps={{
            startAdornment: <InputAdornment position="start">Y: </InputAdornment>
        }}
        fullWidth
    />
</div>;

const CommandValueEditor = observer(({command}) => {
    const commandInfo = getCommandInfo(command.name);

    if (!commandInfo || !commandInfo.type || commandInfo.type === "string") {
        return <TextField
            error={command.name.length === 0}
            label={command.name.length === 0 ? "Invalid Command Name" : command.name}
            value={command.value}
            onChange={e => {
                command.value = e.target.value
            }}
            margin="normal"
            multiline
            fullWidth
        />
    }
    if (commandInfo.type === "color") {
        if (isValidColor(command.value)) {
            return <ColorPicker
                color={colorStringToRGB(command.value)}
                onChange={color => {
                    const rgbColor = color.rgb;
                    command.value = `${rgbColor.r},${rgbColor.g},${rgbColor.b}`
                }}
            />
        } else {
            return <TextField
                error='Incorrect Color'
                label={command.name}
                value={command.value}
                onChange={e => {
                    command.value = e.target.value
                }}
                margin="normal"
                multiline
                fullWidth
            />
        }
    }
    if (commandInfo.type === "position") {
        const [x, y] = command.value.split(",");
        return <PositionEditor
            x={x}
            y={y}
            onChange={({x, y}) => command.value = `${x},${y}`}
        />
    }
    if (commandInfo.type === "number") {
        return <TextField
            label={command.name}
            value={parseInt(command.value)}
            onChange={e => {
                command.value = e.target.value
            }}
            type="number"
            margin="normal"
            fullWidth
        />
    }
});

const CommandEditor = observer(class CommandEditor extends Component {
    render() {
        return <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div>
                    <IconButton onClick={this.props.onRemoveClick}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
                <div>
                    <Autosuggest
                        value={this.props.command.name || ''}
                        label={this.props.command.isCommandKnown ? 'Command Name' : 'Unknown Command'}
                        fullWidth
                        margin="normal"
                        error={!this.props.command.isCommandKnown}
                        onChange={newValue => {
                            this.props.command.name = newValue
                        }}
                    />
                </div>
                <div style={{paddingLeft: '15px'}}>
                    <CommandValueEditor command={this.props.command}/>
                </div>
            </div>
        </div>
    }
});

const LayerEditor = observer(class LayerEditor extends Component {
    render() {
        const {layer, onRemoveClick} = this.props;
        return <div style={{paddingLeft: '50px'}}>
            <div style={{display: 'flex'}}>
                <h3>Layer: {layer.order}</h3>
            </div>
            <IconButton color="secondary" onClick={onRemoveClick}>
                <DeleteIcon/>
            </IconButton>
            <Button variant="outlined" color="secondary" onClick={() => {
                layer.hide = !layer.hide;
            }}>
                {layer.hide ? "Show Layer" : "Hide Layer"}
            </Button>
            {
                layer.commands.map((command, i) => <CommandEditor command={command}
                                                                  onRemoveClick={() => layer.removeCommand(i)}/>)
            }
            <div style={{textAlign: 'center'}}>
                <IconButton onClick={() => {
                    layer.addCommand(new Command("", ""))
                }}>
                    <AddIcon/>
                </IconButton>
            </div>
        </div>
    }
});

const Scene7Editor = observer(class Scene7Editor extends Component {

    render() {
        return <div>
            <div style={{paddingBottom: "30px"}}>
                <TextField
                    error={!this.props.scene7Request.host || this.props.scene7Request.host === ""}
                    label="Host"
                    value={this.props.scene7Request.host}
                    onChange={e => {
                        this.props.scene7Request.host = e.target.value
                    }}
                    margin="normal"
                />
                <TextField
                    label="Template"
                    value={this.props.scene7Request.template}
                    onChange={e => {
                        this.props.scene7Request.template = e.target.value
                    }}
                    margin="normal"
                />
            </div>
            <div>
                {
                    this.props.scene7Request.commands.map((command, i) => {
                        if (command instanceof Layer) {
                            return <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography>Layer: {command.order}</Typography>
                                </ExpansionPanelSummary>
                                <LayerEditor layer={command}
                                             onRemoveClick={() => this.props.scene7Request.removeCommand(i)}/>
                            </ExpansionPanel>
                        } else if (command instanceof Command) {
                            return <CommandEditor command={command}
                                                  onRemoveClick={() => this.props.scene7Request.removeCommand(i)}/>
                        }
                        return null
                    })
                }
                <Button variant="outlined" color="primary" onClick={() => {
                    this.props.scene7Request.addLayer()
                }}>
                    Add Layer
                </Button>
                <Button variant="outlined" color="primary" onClick={() => {
                    this.props.scene7Request.addCommand(new Command("", ""))
                }}>
                    Add Command
                </Button>
            </div>
        </div>
    }
});

export default Scene7Editor