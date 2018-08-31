import React from 'react'
import Button from '@material-ui/core/Button';
// import ImageDiff from 'react-image-diff';
import TextField from '@material-ui/core/TextField';
//import ImageDiff from 'react-compare-image';
import ImageDiff from './react-image-diff';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slider from '@material-ui/lab/Slider';

class ImageComparator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compareToUrl: null,
            currentTabIndex: 0,
            fadeValue: 50
        }
    }

    handleChange = (event, currentTabIndex) => {
        this.setState({ currentTabIndex });
    };

    handleFadeChange = (event, fadeValue) => {
        this.setState({ fadeValue });
    };

    render() {
        return <div>
            <Tabs value={this.state.currentTabIndex} onChange={this.handleChange}>
                <Tab label="Image" />
                <Tab label="Fade" />
                <Tab label="Difference" />
                <Tab label="Swipe" />
            </Tabs>
            {this.state.currentTabIndex === 0 && <img
                style={{ border: '1px solid #021a40' }}
                src={this.props.originalUrl}
                alt='scene7' />}
            {this.state.currentTabIndex === 1 && <div>
                <ImageDiff
                    after={this.props.originalUrl}
                    before={this.state.compareToUrl} type="fade" value={this.state.fadeValue/100} />
                <Slider style={{width: '300px'}} value={this.state.fadeValue} onChange={this.handleFadeChange} />
                <TextField value={this.state.compareToUrl}
                    onChange={e => {
                        this.setState({
                            compareToUrl: e.target.value
                        })
                    }}
                    label="Compare to url"
                    fullWidth
                    multiline />
            </div>}
            {this.state.currentTabIndex === 2 && <div>
                <ImageDiff
                    after={this.props.originalUrl}
                    before={this.state.compareToUrl} type="difference" />
                <TextField value={this.state.compareToUrl}
                    onChange={e => {
                        this.setState({
                            compareToUrl: e.target.value
                        })
                    }}
                    label="Compare to url"
                    fullWidth
                    multiline />
            </div>}
            {this.state.currentTabIndex === 3 && <div>
                <ImageDiff
                    value={this.state.fadeValue/100}
                    after={this.props.originalUrl}
                    before={this.state.compareToUrl} type="swipe"/>
                <Slider style={{width: '300px'}} value={this.state.fadeValue} onChange={this.handleFadeChange} />
                <TextField value={this.state.compareToUrl}
                    onChange={e => {
                        this.setState({
                            compareToUrl: e.target.value
                        })
                    }}
                    label="Compare to url"
                    fullWidth
                    multiline />
            </div>}
        </div>
    }
}

export default ImageComparator;