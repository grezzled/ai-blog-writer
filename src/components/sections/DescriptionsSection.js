import React from "react";
import { generateDescriptions } from "../../openAi/apiGateway";
import { hideLoading, showLoading, Loading } from "../elements/Loading";

export default class DescriptionSection extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="card mt-2">
                <Loading />
                <div className='card-body'>
                    <div className="row mb-2">
                        <span className="h6 card-title align-middle">Meta Description</span>
                    </div>
                    <p className="card-subtitle mb-2 text-muted"><small>Which meta description best describes your content?</small><br />
                        <small>Target keywords: <b className='text-info'>{this.props.params.keywords}</b>. Your meta description should explain to search engines and visitors what your page is about.</small> </p>
                    <div className='col-md-6 mb-4'>
                        <button onClick={async () => {
                            if (this.props.params.apiKey===null) {
                                return alert("API Not Valid") 
                            }
                            showLoading()
                            const descs = await generateDescriptions(this.props.params.apiKey, this.props.params.title)
                            this.props.params.getGeneratedDescriptions(descs);
                            console.log(descs)
                            hideLoading()
                        }} type="button" className="btn btn-sm btn-warning">NEXT: META DESCRIPTION</button>
                    </div>
                    <div className='row row-cols-1 row-cols-md-3 g-4 mb-2' id='titleSection'>{this.props.params.suggestedDescriptions}</div>

                </div>
                <div className='card-footer'>
                    <p className="mb-0 text-muted"><small><b>Meta Description</b>: {this.props.params.metaDescription}</small></p>
                </div>
            </div >
        )
    }
}