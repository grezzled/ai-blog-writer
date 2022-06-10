import React from "react";
import { showLoading, hideLoading, Loading } from "./Loading";
import { generateBlog } from "../openAi/apiGateway";
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
                <h3>{heading}</h3>
                <p>{section}</p>
            </div>
        )
        this.setState(prevState => ({
            blogJSX: [...prevState.blogJSX, data]
        }))
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
                                for (let i = 0; i < arr.length; i++) {
                                    showLoading()
                                    this.pushToHeadings(arr[i])
                                    const section = await generateBlog(this.props.apiKey, arr[i], this.props.title)
                                    console.log(section)
                                    this.pushToSections(section)
                                    this.pushToBlogJSX(arr[i], section)
                                    hideLoading()
                                }
                            }}>
                            WRITE FOR ME
                        </button>
                        <div className="card">
                            <h1>{this.props.title}</h1>
                            <p>{this.props.metaDescription}</p>
                            {this.state.blogJSX}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}