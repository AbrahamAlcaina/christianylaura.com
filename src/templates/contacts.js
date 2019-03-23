import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import { navigate } from "gatsby-link";
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"

import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}


const ContactPageTemplate = ({ title, content, contentComponent, handleSubmit, handleChange, nameLabel }) => {
  const PageContent = contentComponent || Content
  return (
      <section className="section">
        <div className="container">
          <div className="content">
      <h1>{title}</h1>
      <PageContent className="content" content={content} />
      <form
        name="contact"
        method="post"
        action="/contact/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <div hidden>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={handleChange} />
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor={"name"} >{nameLabel}</label>
          <div className="control">
            <input className="input" type={"text"} name={"name"} onChange={handleChange} id={"name"} required={true} />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor={"email"}>Email</label>
            <div className="control">
              <input className="input" type={"email"} name={"email"} onChange={handleChange} id={"email"} required={true} />
            </div>
        </div>
        <div className="field">
          <label className="label" htmlFor={"message"}>Message</label>
          <div className="control">
            <textarea className="textarea" name={"message"} onChange={handleChange} id={"message"} required={true} />
          </div>
        </div>
        <div className="field">
          <button className="button is-link" type="submit">Send</button>
        </div>
      </form>
      </div>
      </div>
      </section>
)
}

ContactPageTemplate.propTypes = {
  //props: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };
  render() {
    var dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
    }
    return (
      <Layout className="container" data={this.props.data} location={this.props.location}>
        <div style={{ marginBottom: rhythm(2) }}>
            <ContactPageTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            onSubmit={this.handleSubmit}
            nameLabel={dataMarkdown.frontmatter.nameLabel}
             />
        </div>
      </Layout>
    )
  }
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage

export const pageQuery = graphql`
  query ContactPageQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        id
        title
        nameLabel
      }
      fields {
        slug
      }
    }
  }
`
