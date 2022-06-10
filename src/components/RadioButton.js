import React from "react";
import { v4 as uuidv4 } from 'uuid';
import ButtonCopy from "./ButtonCopy";

export default class RadioButton extends React.Component {

    render() {
        let id = uuidv4();
        return (
            <div className="col">

                <div className="card p-2 m-2 h-100" >
                    <ButtonCopy value= {this.props.value}/>
                    <div className="form-check">
                        <input className="form-check-input" onChange={(e) => { this.props.getSelectdTtile(e.target.value) }} value={this.props.value} type="radio" name={this.props.name} id={id} />
                        <label className="form-check-label" forhtml={id}>
                            {this.props.value}
                        </label>
                    </div>
                </div>
            </div>
        )
    }

}