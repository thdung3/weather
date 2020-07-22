import React, { Component } from 'react'
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";


const override = css`
    display: block;
    margin: 2;    
    border-color: red;
`;

export default class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    render() {
        return (
            <div className="sweet-loading spinner">
                <PacmanLoader
                    css={override}
                    size={25}
                    color={"#36D7B7"}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}
