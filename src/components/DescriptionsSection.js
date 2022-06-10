import React from "react";
import { generateHeadings } from "../openAi/apiGateway";
import { hideLoading, showLoading, Loading } from "./Loading";

export default class DescriptionSection extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="card mt-2">
                <Loading />
                <div className='card-body'>
                    <h5 className="card-title">Meta Description</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Which meta description best describes your content?</h6>
                    <p className="card-text">Target keywords: <b className='text-info'>{this.props.keywords}</b>. Your meta description should explain to search engines and visitors what your page is about.</p>
                    <div className='row row-cols-1 row-cols-md-3 g-4 mb-2' id='titleSection'>{this.props.suggestedDescriptions}</div>
                </div>
                <div className=' card-footer  text-end'>
                    <div className='row'>
                        <div className='col-md-6 h-md-100 text-start'>
                            <p><b>Meta Description</b>: {this.props.metaDescription}</p>
                        </div>
                        <div className='col-md-6 text-end'>
                            <button type="button" className="btn btn-warning" onClick={async () => {
                                showLoading()
                                const headings = await generateHeadings(this.props.apiKey, this.props.title)
                                this.props.getGeneratedHeadings(headings)
                                console.log(headings)
                                hideLoading()
                            }}>NEXT: CHOOSE HEADINGS</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}