import React from "react";
import { Loading, showLoading, hideLoading } from './Loading';
import { generateTitles } from "../openAi/apiGateway";
export default class KeywordSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            result: null,
            keywords: null
        }
    }

    render() {
        return (
            <div className="card mt-2">
                <div className='card-body'>
                    <div>
                        <Loading />
                        <h5 className="card-title">Keywords</h5>
                        <div className="crad-text">Tell me what you want to rank for. I'll help create your content.</div>
                        <div className="input-group mt-3">
                            <input onChange={e => { this.setState({ keywords: e.target.value }) }} placeholder="Enter a keyword [i.e. 'meal delivery']" type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button
                                onClick={async () => {
                                    showLoading()
                                    const titles = await generateTitles(this.props.apiKey, this.state.keywords)
                                    this.props.getKeywords(this.state.keywords)
                                    this.props.getGeneratedTitles(titles)
                                    console.log(titles)
                                    hideLoading()
                                }}
                                className="btn btn-warning"
                                type="submit"
                                id="button-addon2">Start</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}