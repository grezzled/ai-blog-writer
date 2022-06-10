import React from "react";
import { v4 as uuidv4 } from 'uuid';
import {toast } from 'react-toastify';

export default class CheckBox extends React.Component {
    render() {

        let id = uuidv4();
        const notify = () => toast.success("Text Copied \n\n\n" + this.props.value, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return (
            <div className="col">
                <div className="card p-2 m-2 h-100" >
                    <div className="text-end">
                        <button type="button" id={id} className="btn btn-light" onClick={(e) => {
                            navigator.clipboard.writeText(this.props.value)
                            notify()
                        }}>
                            <span className="material-symbols-outlined">content_copy</span>
                        </button>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" onChange={(e) => {
                            if (e.target.checked)
                                this.props.getSelectdHeading(e.target.value);
                            else
                                this.props.getUnselectdHeading(e.target.value)

                        }
                        }
                            value={this.props.value} type="checkbox" name={this.props.name} id={id} />
                        <label className="form-check-label" forhtml={id}>
                            {this.props.value}
                        </label>
                    </div>
                </div>
            </div>
        )
    }

}