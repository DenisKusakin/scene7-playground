import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
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

const CommandEditor = observer(class CommandEditor extends Component {
    render() {
        return <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                    <TextField
                        label={"Command Name"}
                        value={this.props.command.name}
                        onChange={e => {
                            this.props.command.name = e.target.value
                        }}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div style={{paddingLeft: '15px'}}>
                    <TextField
                        error={this.props.command.name.length === 0}
                        label={this.props.command.name.length === 0 ? "Invalid Command Name" : this.props.command.name}
                        value={this.props.command.value}
                        onChange={e => {
                            this.props.command.value = e.target.value
                        }}
                        margin="normal"
                        multiline
                        fullWidth
                    />
                </div>
                <div>
                    <IconButton onClick={this.props.onRemoveClick}>
                        <DeleteIcon/>
                    </IconButton>
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
            {/*<Button variant="outlined" color="secondary" onClick={onRemoveClick}>*/}
            {/*Remove Layer*/}
            {/*<DeleteIcon/>*/}
            {/*</Button>*/}
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
                {/*<Button variant="outlined" color="primary" onClick={() => {*/}
                {/*layer.addCommand(new Command("", ""))*/}
                {/*}}>*/}
                {/*Add Layer Command*/}
                {/*</Button>*/}
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