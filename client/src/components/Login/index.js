import React, { Component } from 'react';
// import { Input } from 'antd';
import TextField from '@material-ui/core/TextField';

export default class Login extends Component {
    render() {
        return (
            <div>
                <TextField
                    id="name"
                    label="Name"
                    // className={classes.textField}
                    // value={this.state.name}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                />
            </div>
        );
    }
}
