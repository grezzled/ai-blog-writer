import React from "react";
import { v4 as uuidv4 } from 'uuid';
import ButtonCopy from "./ButtonCopy";

export default class RadioButton extends React.Component {
    valueTXT = this.props.value

    render() {
        let id = uuidv4();
        return (

                <div className="col-md-6 col-lg-12 col-sm-12 mt-2">
                    <div className="input-group input-group-sm mb-1">
                        <div className="input-group-text">
                            <input className="form-check-input" onChange={(e) => { this.props.getSelectdTtile(e.target.value) }} value={this.props.value} type="radio" name={this.props.name}/>
                        </div>
                        <input type="text" readOnly className="form-control" aria-label="With textarea" defaultValue={this.props.value}/>
                        <ButtonCopy value={this.props.value} />
                    </div>
                </div>


        )
    }

}