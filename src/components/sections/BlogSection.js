import React from "react";
import { showLoading, hideLoading, Loading } from "../elements/Loading";
import { generateBlog } from "../../openAi/apiGateway";
import ButtonCopy from "../elements/ButtonCopy";
import { v4 as uuidv4 } from 'uuid';

export default class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headings: [],
            sections: [],
            fullBlog: "",
            blogJSX: [],
        }
    }

    pushToHeadings(data) {
        this.setState(prevState => ({
            headings: [...prevState.headings, data]
        }))
    }

    pushToSections(data) {
        this.setState(prevState => ({
            headings: [...prevState.headings, data]
        }))
    }

    pushToBlogJSX(heading, section, newId) {
        let data = (
            <div>
                <h5 className="text-capitalize"><b><small>{heading} <ButtonCopy value={heading} /></small></b></h5>
                <textarea className="form-control w-100 m-2" id={newId} onFocus={(e) => this.textAreaAdjust(e.target)} defaultValue={section} />
                {/* <ButtonCopy value={section} /> */}
            </div>
        )
        this.setState(prevState => ({
            blogJSX: [...prevState.blogJSX, data]
        }))
    }

    textAreaAdjust(el) {
        el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight) + "px" : "60px";
    }

    render() {
        return (
            <div className="card mt-2">
                <Loading />
                <div className='card-body'>
                    <div>
                        <button type="button" className="btn btn-sm btn-warning"
                            onClick={async () => {
                                if (this.props.params.apiKey === null) {
                                    return alert("API Not Valid")
                                }
                                this.setState({ blogJSX: [] })
                                let arr = this.props.params.headings
                                let text = ""
                                for (let i = 0; i < arr.length; i++) {
                                    const newId = uuidv4()
                                    this.pushToHeadings(arr[i])
                                    const section = await generateBlog(this.props.params.apiKey, arr[i], this.props.params.title)
                                    console.log(section)
                                    this.pushToSections(section)
                                    this.pushToBlogJSX(arr[i], section.trim(), newId)
                                    console.log(newId)
                                    // document.getElementById(newId).focus();
                                    text = text + arr[i] + '\n' + section + '\n'
                                }
                                // this.setState({ fullBlog: text })
                                this.setState({ fullBlog: text }, () => {
                                    console.log(this.state.fullBlog)
                                    // document.getElementById('fullBlogArea').focus()
                                    document.getElementById("fullBlogArea").focus();
                                })
                            }}>
                            WRITE FOR ME
                        </button>

                        <div className="p-2">
                            <b className="h6"><span className="align-middle">{this.props.params.title} </span><ButtonCopy value={this.props.params.title} /></b>
                            <p>{this.props.params.metaDescription} <small><ButtonCopy value={this.props.params.metaDescription} /></small></p>
                            {this.state.blogJSX}
                            <h5 className="text-capitalize"><b><small>Full Article</small></b></h5>
                            <textarea className=" form-control w-100" id="fullBlogArea" onFocus={(e) => this.textAreaAdjust(e.target)} defaultValue={this.state.fullBlog}></textarea>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}