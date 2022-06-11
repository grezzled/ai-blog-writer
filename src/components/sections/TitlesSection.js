import React from "react";
import { generateTitles } from "../../openAi/apiGateway";
import { hideLoading, showLoading, Loading } from "../elements/Loading";


export default class TitlesSection extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            customTitle: null
        }
    }

    customTitle = ""
    render() {
        return (
            <div className="card mt-2">
                <Loading />
                <div className='card-body'>
                    <div className="row mb-1">
                        <span className="h6 card-title align-middle">Titles</span>
                    </div>
                    <p className="card-subtitle mb-2 text-muted">
                        <small>Which title best represents what your page is about? <b className='text-info'>{this.props.params.keywords}</b></small><br />
                        <small> Your Title should read naturally and grab the reader's attention.</small>
                    </p>
                    <button type="button" className="btn btn-sm btn-warning me-2"
                        onClick={async () => {
                            if (this.props.params.apiKey===null) {
                                return alert("API Not Valid") 
                            }
                            showLoading()
                            const titles = await generateTitles(this.props.params.apiKey, this.props.params.keywords)
                            this.props.params.getGeneratedTitles(titles)
                            console.log(titles)
                            hideLoading()
                        }}
                    >Generate Titles</button>

                    <button type="button" className="btn btn-sm btn-warning" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Custom Title</button>
                    <div className="collapse mt-3 mb-3" id="collapseExample">
                        <div className="row ">
                            <div className="col-md-6 col-sm-12">
                                <div className="input-group input-group-sm mb-2">
                                    <input onChange={e => { this.state.customTitle = e.target.value }} placeholder="Set your custom title here" type="text" className="form-control" aria-label="Custom Title" aria-describedby="button-addon2" />
                                    <button
                                        onClick={async () => {
                                            this.props.params.getCustomTitle(this.state.customTitle);
                                        }}
                                        className="btn btn-warning"
                                        type="submit"
                                        id="button-addon2">Set Title</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row row-cols-1 row-cols-md-3 mt-2' id='titleSection'>{this.props.params.suggestedTitles}</div>


                </div>
                <div className=' card-footer text-muted  text-end'>
                    <div className='row'>
                        <div className='col-md-6 h-md-100 text-start'>
                            <p className="mb-0"><small><b>Title</b>: {this.props.params.title}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}