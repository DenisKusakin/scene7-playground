import React, {Component} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import {Command, Layer, Scene7Request, urlToScene7Request} from "./scene7url";
import Scene7Editor from './Scene7Editor'
import {observer} from "mobx-react";

const url = "http://s7d2.scene7.com/is/image/ToryBurchNA/andrei_template?layer=0&anchor=0,0&size=750,393&wid=750&bgc=240,207,207&layer=1&textps={\\rtf1\\ansi{\\fonttbl{\\f0%20Sweet%20Sans%20Pro%20Medium;}}{\\colortbl\\red25\\green25\\blue25;}\\vertalt\\qc{\\f0\\cf0\\fs56\\expndtw148%20EITHER+%2F+OR}}&textattr=32&pos=375,30&layer=2&textps={\\rtf1\\ansi{\\fonttbl{\\f0%20Sweet%20Sans%20Pro%20Medium;}}{\\colortbl\\red25\\green25\\blue25;}\\vertalt\\qc{\\f0\\cf0\\fs56\\expndtw42%20SUMMER+NEUTRALS}}&pos=375,72&layer=3&textps={\\rtf1\\ansi{\\fonttbl\\f0\\ansi%20Adobe%20Garamond%20Pro;}{\\colortbl\\red81\\green82\\blue82;}\\vertalt\\qc{\\f0\\cf0\\fs56%20This+is+a+text+I%27d+like+to+see+here.+It+has+3+lines}\\par\\qc{\\f0\\cf0\\fs56%20This+is+second+line}\\par\\qc{\\f0\\cf0\\fs56%20And+this+is+third}}&pos=375,132&layer=4&pos=375,297&color=240,207,207&size=300,80&extend=1,1,1,1&bgColor=25,25,25&layer=5&textps={\\rtf1\\ansi{\\fonttbl{\\f0%20Sweet%20Sans%20Pro%20Medium;}}{\\colortbl\\red25\\green25\\blue25;}\\vertalt\\qc{\\f0\\cf0\\fs56\\expndtw64%20SHOP+NOW}}&textattr=48&pos=375,303&fmt=png"

const App = observer(class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scene7Request: urlToScene7Request("layer=0&anchor=0,0&size=750,393&wid=750&bgc=240,207,207&layer=1&textps={\\rtf1\\ansi{\\fonttbl{\\f0%20Sweet%20Sans%20Pro%20Medium;}}{\\colortbl\\red25\\green25\\blue25;}\\vertalt\\qc{\\f0\\cf0\\fs56\\expndtw148%20EITHER+%2F+OR}}&textattr=32&pos=375,30&layer=2&textps={\\rtf1\\ansi{\\fonttbl{\\f0%20Sweet%20Sans%20Pro%20Medium;}}{\\colortbl\\red25\\green25\\blue25;}\\vertalt\\qc{\\f0\\cf0\\fs56\\expndtw42%20SUMMER+NEUTRALS}}&pos=375,72&layer=3&textps={\\rtf1\\ansi{\\fonttbl\\f0\\ansi%20Adobe%20Garamond%20Pro;}{\\colortbl\\red81\\green82\\blue82;}\\vertalt\\qc{\\f0\\cf0\\fs56%20This+is+a+text+I%27d+like+to+see+here.+It+has+3+lines}\\par\\qc{\\f0\\cf0\\fs56%20This+is+second+line}\\par\\qc{\\f0\\cf0\\fs56%20And+this+is+third}}&pos=375,132&layer=4&pos=375,297&color=240,207,207&size=300,80&extend=1,1,1,1&bgColor=25,25,25&layer=5&textps={\\rtf1\\ansi{\\fonttbl{\\f0%20Sweet%20Sans%20Pro%20Medium;}}{\\colortbl\\red25\\green25\\blue25;}\\vertalt\\qc{\\f0\\cf0\\fs56\\expndtw64%20SHOP+NOW}}&textattr=48&pos=375,303&fmt=png")//new Scene7Request()
        };
        // this.scene7Request = new Scene7Request();
    }

    render() {
        return (
            <div className="App">
                <div className="column">
                    <Scene7Editor scene7Request={this.state.scene7Request}/>
                </div>
                <div className="column">
                    <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
                        <img
                            src={`http://s7d2.scene7.com/is/image/ToryBurchNA/andrei_template?${this.state.scene7Request.urlPartial}`}
                            alt='scene7'/>
                        <TextField value={this.state.scene7Request.urlPartial}
                                   onChange={e => {
                                       let scene7Request = urlToScene7Request(e.target.value);
                                       console.log(scene7Request);
                                       this.setState({
                                           scene7Request
                                       })
                                   }}
                                   fullWidth
                                   multiline/>
                    </div>

                    {/*<TextField value={this.state.scene7Request.urlPartial}*/}
                    {/*fullWidth*/}
                    {/*multiline/>*/}
                    {/*<p>Example</p>*/}
                    {/*<TextField value={url}*/}
                    {/*fullWidth*/}
                    {/*multiline/>*/}
                </div>
            </div>
        );
    }
});

export default App;
