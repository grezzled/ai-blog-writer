import React from "react";
import { showLoading, hideLoading, Loading } from "./Loading";
import { generateBlog } from "../openAi/apiGateway";
import ButtonCopy from "./ButtonCopy";
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

    pushToBlogJSX(heading, section) {
        let data = (
            <div>
                <h2>{heading} <ButtonCopy value={heading} /></h2>
                <p>{section}  <ButtonCopy value={section} /></p>
            </div>
        )
        this.setState(prevState => ({
            blogJSX: [...prevState.blogJSX, data]
        }))
    }

    textAreaAdjust(el) {
        el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : "60px";
    }

    render() {
        return (
            <div className="card mt-2">
                <Loading />
                <div className='card-body'>
                    <div>
                        <button type="button" className="btn btn-warning"
                            onClick={async () => {
                                let arr = this.props.headings
                                let text = ""
                                for (let i = 0; i < arr.length; i++) {
                                    // showLoading()
                                    this.pushToHeadings(arr[i])
                                    const section = await generateBlog(this.props.apiKey, arr[i], this.props.title)
                                    console.log(section)
                                    this.pushToSections(section)
                                    this.pushToBlogJSX(arr[i], section)
                                    // hideLoading()

                                    text = text + arr[i] + '\n' + section + '\n'
                                }
                                // this.setState({ fullBlog: text })
                                this.setState({ fullBlog: "This is the text:" + text }, () => {
                                    console.log(this.state.fullBlog)
                                    // document.getElementById('fullBlogArea').focus()
                                    document.getElementById("fullBlogArea").focus();
                                })
                            }}>
                            WRITE FOR ME
                        </button>

                        <div className="card">
                            <h1>{this.props.title} <ButtonCopy value={this.props.title} /></h1>
                            <p>{this.props.metaDescription} <ButtonCopy value={this.props.metaDescription} /></p>
                            {this.state.blogJSX}
                            <textarea id="fullBlogArea" onFocus={(e)=>this.textAreaAdjust(e.target)} defaultValue={this.state.fullBlog}></textarea>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}