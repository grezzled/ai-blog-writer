import React from "react";
import { Loading, showLoading, hideLoading } from '../elements/Loading';
import { validateApiKey } from '../../openAi/apiGateway';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class ApiKeyValidationSection extends React.Component {

    // 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
    constructor(props) {
        super(props)
        this.state = {
            apiKey: null
        }
    }


    notifySuccess = () => toast.success("Working like a charm :) happy hacking", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    notifyError = () => toast.error('Error occured! Check that the API Key is valid and not reached the limit', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    render() {
        return (
            <div className="card h-100">
                <div className='card-body'>
                    <h6 className="card-title mb-1">OpenAi API Key </h6>
                    <div className="crad-text text-muted mb-2"><small>Validate your api key here</small></div>
                    <div>
                        <Loading />
                        <div id="liveAlertPlaceholder"></div>
                        <div className="input-group input-group-sm">
                            <input onChange={e => { this.setState({ apiKey: e.target.value }) }} placeholder="Enter your API Key here" type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button
                                onClick={async () => {
                                    if (this.state.apiKey===null) {
                                        return alert("API Not Valid") 
                                    }
                                    showLoading()
                                    const isValid = await validateApiKey(this.state.apiKey)
                                        ? this.notifySuccess()
                                        : this.notifyError()
                                    hideLoading()
                                    if (isValid)
                                        this.props.params.getApiKey(this.state.apiKey);
                                }}
                                className="btn btn-warning"
                                type="submit"
                                id="button-addon2">Validate API Key</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}