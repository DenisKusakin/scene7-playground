import React from 'react'
import Button from '@material-ui/core/Button';
// import ImageDiff from 'react-image-diff';
import TextField from '@material-ui/core/TextField';
//import ImageDiff from 'react-compare-image';
import ImageDiff from './react-image-diff';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class ImageComparator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compareToUrl: null,
            currentTabIndex: 0
        }
    }

    handleChange = (event, currentTabIndex) => {
        this.setState({ currentTabIndex });
    };

    render() {
        return <div>
            <Tabs value={this.state.currentTabIndex} onChange={this.handleChange}>
                <Tab label="Image" />
                <Tab label="Fade" />
                <Tab label="Comparison 2" />
            </Tabs>
            {this.state.currentTabIndex === 0 && <img
                style={{ border: '1px solid #021a40' }}
                src={this.props.originalUrl}
                alt='scene7' />}
            {this.state.currentTabIndex === 1 && <div>
                <ImageDiff
                    before={this.props.originalUrl}
                    after={this.state.compareToUrl} type="fade" value={.5} />
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

// class ImageComparator extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isComparisonMode: false,
//             compareToUrl: null
//         }
//     }

//     render() {
//         return <div>
//             {(!this.state.isComparisonMode || this.state.compareToUrl == null) && <img
//                 style={{ border: '1px solid #021a40' }}
//                 src={this.props.originalUrl}
//                 alt='scene7' />}
//             {this.state.isComparisonMode && (this.state.compareToUrl != null) && <ImageDiff 
//                 before={this.props.originalUrl} 
//                 after={this.state.compareToUrl} type="swipe" value={.5} 
//             />}
//             <Button variant="outlined" color="secondary" onClick={() => { this.setState(preveState => ({ isComparisonMode: !preveState.isComparisonMode })) }}>
//                 Switch
//             </Button>
//             {this.state.isComparisonMode && <TextField value={this.state.compareToUrl}
//                 onChange={e => {
//                     this.setState({
//                         compareToUrl: e.target.value
//                     })
//                 }}
//                 label="Compare to url"
//                 fullWidth
//                 multiline/>}
//         </div>
//     }
// }

export default ImageComparator;