import React from 'react';
import './App.css';
import KeywordsSection from './components/sections/KeywordsSection';
import ApiKeyValidationSection from './components/sections/ApiKeyValidationSection';
import RadioButton from './components/elements/RadioButton';
import TitlesSection from './components/sections/TitlesSection';
import DescriptionSection from './components/sections/DescriptionsSection';
import BlogSection from './components/sections/BlogSection'
import CheckBox from './components/elements/CheckBox'
import HeadingsSection from './components/sections/HeadingsSection';
import { ToastContainer } from 'react-toastify';

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
    this.getCustomTitle = this.getCustomTitle.bind(this)
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
    this.setState({ suggestedHeadings: this.showHeadingsSection(data), headings: [] })
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

  getCustomTitle = async (data) => {
    this.setState({ title: data }, () => {
      console.log("this is the new Title" + this.state.title)

    })
  }

  render() {
    let params = {
      apiKey: this.state.apiKey,
      getApiKey: this.getApiKey,
      keywords: this.state.keywords,
      getKeywords: this.getKeywords,
      title: this.state.title,
      getGeneratedTitles: this.getGeneratedTitles,
      suggestedTitles: this.state.suggestedTitles,
      getCustomTitle: this.getCustomTitle,
      metaDescription: this.state.metaDescription,
      getGeneratedDescriptions: this.getGeneratedDescriptions,
      suggestedDescriptions: this.state.suggestedDescriptions,
      suggestedHeadings: this.state.suggestedHeadings,
      getGeneratedHeadings: this.getGeneratedHeadings,
      getSelectedHeading: this.getSelectedHeading,
      getUnselectdHeading: this.getUnselectdHeading,
      headings: this.state.headings,
    }

    return (
      <div className="App m-4">
        <ToastContainer />

        <div className='row'>
          <div className='col-lg-6 col-sm-12'>
            <div className='row'>
              <div className='col-lg-6 mt-2'>
                <ApiKeyValidationSection params={params} />
              </div>
              <div className='col-lg-6 mt-2'>
                <KeywordsSection params={params} />
              </div>
            </div>
            <TitlesSection params={params} />
            <DescriptionSection params={params} />
            <HeadingsSection params={params} />
          </div>
          <div className='col-lg-6 col-sm-12'>
            <BlogSection params={params} />
          </div>
        </div>


      </div>
    )
  }
}
