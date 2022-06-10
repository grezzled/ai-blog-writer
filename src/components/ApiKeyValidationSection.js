import React from "react";
import { Loading, showLoading, hideLoading } from './Loading';
import { validateApiKey } from './../openAi/apiGateway';

export default class ApiKeyValidationSection extends React.Component {

    // apiKey = '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'
    apikey = "nothinhg here"
    constructor(props) {
        super(props)
        this.alert = this.alert.bind(this);

        this.props.getApiKey(this.apiKey)
    }

    alert(message, type) {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        alertPlaceholder.append(wrapper)
    }

    render() {
        return (
            <div className="card mt-2">
                <div className='card-body'>
                    <h5 className="card-title">OpenAi API Key </h5>
                    <div>
                        <Loading />
                        <div id="liveAlertPlaceholder"></div>
                        <div className="input-group mb-3">
                            <input onChange={e => { this.apiKey = e.target.value }} placeholder="Enter your API Key here" type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button
                                onClick={async () => {
                                    showLoading()
                                    await validateApiKey(this.apiKey) === true
                                        ? this.alert('Working like a charm :) happy hacking', 'success')
                                        : this.alert('Error occured! Check that the API Key is valid and not reached the limit', 'danger')
                                    hideLoading()
                                    this.props.getApiKey(this.apiKey);
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