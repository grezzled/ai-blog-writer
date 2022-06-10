import React from "react";
import { v4 as uuidv4 } from 'uuid';
export default class CheckBox extends React.Component {
    render() {
        let id = uuidv4();
        return (
            <div className="col">
                <div className="card p-2 m-2 h-100" >
                    <div className="form-check">
                        <input className="form-check-input" onChange={(e) => { if (e.target.checked) this.props.getSelectdHeading(e.target.value); else this.props.getUnselectdHeading(e.target.value) }} value={this.props.value} type="checkbox" name={this.props.name} id={id} />
                        <label className="form-check-label" forhtml={id}>
                            {this.props.value}
                        </label>
                    </div>
                </div>
            </div>
        )
    }

}