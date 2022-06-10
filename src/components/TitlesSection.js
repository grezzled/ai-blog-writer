import React from "react";
import { generateDescriptions } from "../openAi/apiGateway";
import { hideLoading, showLoading, Loading } from "./Loading";
export default class TitlesSection extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="card mt-2">
                <Loading />
                <div className='card-body'>
                    <h5 className="card-title">Titles</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Which title best represents what your page is about?</h6>
                    <p className="card-text">Target keywords: <b className='text-info'>{this.props.keywords}</b>. Your Title should read naturally and grab the reader's attention.</p>
                    <h5 className="card-subtitle text-muted mt-2 mb-2">Generated Page Title Ideas</h5>
                    <div className='row row-cols-1 row-cols-md-3 g-4 mb-2' id='titleSection'>{this.props.suggestedTitles}</div>
                </div>
                <div className=' card-footer  text-end'>
                    <div className='row'>
                        <div className='col-md-6 h-md-100 text-start'>
                            <p><b>Title</b>: {this.props.title}</p>
                        </div>
                        <div className='col-md-6 text-end'>
                            <button onClick={async () => {
                                showLoading()
                                const descs = await generateDescriptions(this.props.apiKey, this.props.title)
                                this.props.getGeneratedDescriptions(descs);
                                console.log(descs)
                                hideLoading()
                            }} type="button" className="btn btn-warning">NEXT: META DESCRIPTION</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}