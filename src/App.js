import React from 'react';

import './App.css';
import KeywordSection from './components/KeywordsSection';
import ApiKeyValidationSection from './components/ApiKeyValidationSection';
import RadioButton from './components/RadioButton';
import TitlesSection from './components/TitlesSection';
import { generateDescriptions, generateBlog } from './openAi/apiGateway';
import DescriptionSection from './components/DescriptionsSection';
import BlogSection from './components/BlogSection'
import CheckBox from './components/CheckBox'
export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      apiKey: null,
      keywords: null,

      title: null,
      suggestedTitles: [],


      metaDescription: null,
      suggestedDescriptions: [],

      suggestedHeadings: [],
      headings: [],
      heading: null,
    }

    this.getApiKey = this.getApiKey.bind(this)
    this.getKeywords = this.getKeywords.bind(this)
    this.getGeneratedTitles = this.getGeneratedTitles.bind(this)
    this.showTitlesSection = this.showTitlesSection.bind(this)
    this.getGeneratedHeadings = this.getGeneratedHeadings.bind(this)
    this.getSelectdTtile = this.getSelectdTtile.bind(this)
    this.getSelectedDescription = this.getSelectedDescription.bind(this)
    this.getGeneratedDescriptions = this.getGeneratedDescriptions.bind(this)
    this.showDesciptionsSection = this.showDesciptionsSection.bind(this)
    this.getSelectedHeading = this.getSelectedHeading.bind(this)
    this.getUnselectdHeading = this.getUnselectdHeading.bind(this)
    this.showHeadingsSection = this.showHeadingsSection.bind(this)
  }


  getApiKey = async (data) => {
    this.setState({ apiKey: data })
  }
  getKeywords = async (data) => {
    this.setState({ keywords: data })
  }

  getGeneratedTitles = async (data) => {
    this.setState({ title: data }, () => {
      this.showTitlesSection(data);
      this.setState({ suggestedTitles: this.showTitlesSection(data) })
    })
  }

  showTitlesSection(data) {
    const titles = data.split('\n');
    let endata = []
    titles.forEach((e, key) => {
      e = e.trim();
      e = e.replace(/[1-9](-|\)|\.)/g, "")
      if (e !== "")
        endata.push(
          <RadioButton key={key} name="titles" value={e} getSelectdTtile={this.getSelectdTtile} />
        )
    });
    this.setState({ title: null })
    return endata
  }

  getSelectdTtile = (data) => {
    this.setState({ title: data })
  }

  getSelectedDescription = (data) => {
    this.setState({ metaDescription: data })
  }

  getGeneratedDescriptions = async (data) => {
    this.setState({ descriptions: data }, () => {
      this.showDesciptionsSection(data);
      this.setState({ suggestedDescriptions: this.showDesciptionsSection(data) })
    })
  }

  showDesciptionsSection(data) {
    const descriptions = data.split('\n');
    let endata = []
    descriptions.forEach((e, key) => {
      e = e.trim();
      e = e.replace(/[1-9](-|\)|\.)/g, "")
      if (e !== "")
        endata.push(
          <RadioButton key={key} name="descriptions" value={e} getSelectdTtile={this.getSelectedDescription} />
        )
    })
    this.setState({ metaDescription: null })
    return endata
  }

  getSelectedHeading = (data) => {
    this.setState(prevState => ({
      headings: [...prevState.headings, data]
    }), () => {
      console.log(this.state.headings)
    })
  }

  getUnselectdHeading = (data) => {
    let arr = this.state.headings;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === data) {
        arr.splice(i, 1);
        i--;
      }
    }
    this.setState({ headings: arr }, () => {
      console.log(this.state.headings)
    })
  }

  getGeneratedHeadings = async (data) => {
    this.showHeadingsSection(data)
    this.setState({ suggestedHeadings: this.showHeadingsSection(data) })
  }

  showHeadingsSection(data) {
    console.log('hrer')
    let headings = data.split('\n');
    let endata = []
    headings = [...new Set(headings)]
    headings.forEach((e, key) => {
      e = e.trim();
      e = e.replace(/[1-9](-|\)|\.)|-\s/g, "")
      if (e !== "")
        endata.push(
          <CheckBox key={key} name="headings" value={e} getSelectdHeading={this.getSelectedHeading} getUnselectdHeading={this.getUnselectdHeading} />
        )
    })
    return endata
  }

  render() {
    return (
      <div className="App container">
        <ApiKeyValidationSection getApiKey={this.getApiKey} />
        <KeywordSection apiKey={this.state.apiKey} getGeneratedTitles={this.getGeneratedTitles} getKeywords={this.getKeywords} />
        <TitlesSection apiKey={this.state.apiKey} getGeneratedDescriptions={this.getGeneratedDescriptions} keywords={this.state.keywords} suggestedTitles={this.state.suggestedTitles} title={this.state.title} />
        <DescriptionSection getGeneratedHeadings={this.getGeneratedHeadings} apiKey={this.state.apiKey} keywords={this.state.keywords} suggestedDescriptions={this.state.suggestedDescriptions} metaDescription={this.state.metaDescription} title={this.state.title} />

        <div className="card mt-2">
          <div className='card-body'>
            <div>
              <h5 className="card-title">Headings</h5>
              <h6 className="card-subtitle mb-2 text-muted">Which headings you would like to start out with?</h6>
              <p className="card-text">Your headings are like chapters of your content, and indicate what visitors will read at each section.</p>
              <div className='row row-cols-1 row-cols-md-3 g-4 mb-2' id='titleSection'>{this.state.suggestedHeadings}</div>
            </div>
          </div>
          <div className=' card-footer  text-end'>
            <div className='row'>
              <div className='col-md-6 h-md-100 text-start'>
                <p><b>Meta Description</b>: {this.props.metaDescription}</p>
              </div>
              <div className='col-md-6 text-end'>
                <button type="button" className="btn btn-warning" onClick={async () => generateBlog(this.state.apiKey, this.state.headings)}>WRITE FOR ME</button>
              </div>
            </div>
          </div>
          <BlogSection headings={this.state.headings} apiKey={this.state.apiKey} />
        </div>
      </div>
    )
  }
}
