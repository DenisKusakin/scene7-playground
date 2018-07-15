import React, {Component} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import {Command, Layer, Scene7Request, urlToScene7Request} from "./scene7url";
import Scene7Editor from './Scene7Editor'
import {observer} from "mobx-react";

const url = "http://s7d2.scene7.com/is/image/?layer=0&anchor=0,0&size=750,393&wid=750&bgc=82,248,79&layer=1&textps=Heading&textattr=80&pos=350,30&layer=2&textps=One More Heading&pos=324,72&layer=3&textps=Text&pos=365,132&layer=4&pos=375,297&color=153,147,218&size=300,80&extend=1,1,1,1&bgColor=25,25,25&layer=5&textps=Button&textattr=90&pos=350,303&fmt=png";

const App = observer(class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scene7Request: urlToScene7Request(url)
        };
    }

    render() {
        return (
            <div className="App">
                <div className="column">
                    <Scene7Editor scene7Request={this.state.scene7Request}/>
                </div>
                <div className="column">
                    <div style={{paddingBottom: '50px'}}>
                        <TextField value={this.state.scene7Request.urlPartial}
                                   onChange={e => {
                                       let scene7Request = urlToScene7Request(e.target.value);
                                       console.log(scene7Request);
                                       this.setState({
                                           scene7Request
                                       })
                                   }}
                                   label="Scene7 URL"
                                   fullWidth
                                   multiline/>
                    </div>
                    <img
                        style={{border: '1px solid #021a40'}}
                        src={`${this.state.scene7Request.urlPartial}`}
                        alt='scene7'/>
                </div>
            </div>
        );
    }
});

export default App;
