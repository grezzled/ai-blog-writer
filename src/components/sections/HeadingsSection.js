import React from "react";
import { generateHeadings } from "../../openAi/apiGateway";
import { showLoading, hideLoading, Loading } from "../elements/Loading";

export default class HeadingsSection extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="card mt-2">
                <Loading />
                <div className='card-body'>
                    <div>
                        <div className="row mb-2">
                            <span className=" h6 card-title align-middle">Headings</span>
                        </div>
                        <p className="card-subtitle mb-2 text-muted"><small>Which headings you would like to start out with?<br/>
                        Your headings are like chapters of your content, and indicate what visitors will read at each section. </small></p>
                        <button type="button" className="btn btn-sm btn-warning mb-4" onClick={async () => {
                            if (this.props.params.apiKey===null) {
                                return alert("API Not Valid") 
                            }
                            showLoading()
                            const headings = await generateHeadings(this.props.params.apiKey, this.props.params.title)
                            this.props.params.getGeneratedHeadings(headings)
                            console.log(headings)
                            hideLoading()
                        }}>NEXT: CHOOSE HEADINGS</button>
                        <div className='row row-cols-1 row-cols-md-3 g-4 mb-2' id='titleSection'>{this.props.params.suggestedHeadings}</div>
                    </div>
                </div>
                <div className=' card-footer  text-end'>
                    <div className='row'>
                        <div className='col-md-6 h-md-100 text-start'>
                            <p className="mb-0"><small><b>You selected</b>: <span className="text-info">{this.props.params.headings.length}</span> Headings</small> </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}