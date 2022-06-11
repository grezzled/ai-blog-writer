import React from "react";

export default class KeywordsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: null
        }
    }

    render() {
        return (
            <div className="card h-100">
                <div className='card-body'>
                    <div>
                        <h6 className="card-title mb-1">Keywords</h6>
                        <div className="crad-text text-muted mb-2"><small>Tell me what you want to rank for.</small></div>
                        <div className="input-group input-group-sm">
                            <input onChange={e => {
                                this.setState({ keywords: e.target.value },()=>{
                                    this.props.params.getKeywords(this.state.keywords)
                                });
                            }} placeholder="Enter a keyword [i.e. 'meal delivery']" type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        </div>
                    </div>
                </div>
                <div className='card-footer'>
                    <p className="text-muted mb-0"><small><b>Keyword</b>: {this.props.params.keywords}</small></p>
                </div>
            </div>
        )
    }

}