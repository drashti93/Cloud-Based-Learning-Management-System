import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './pdf.css'
import { Document, Page, pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class PDF extends Component {
  state = { numPages: null, pageNumber: 1};
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     isGradeBoxHidden: true
  //   }
  // }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const file = "http://52.8.27.226:8000/static/" + this.props.file
    const { pageNumber, numPages } = this.state;

    return (
        
      <div>
        <nav>
          <button className="btn btn-primary pdf-button" onClick={this.goToPrevPage}>Prev</button>
          <button className="btn btn-primary pdf-button" onClick={this.goToNextPage}>Next</button>
          
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file={file}
            onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
    
    return {
       
    };
}

function mapDispatchToProps(dispatch) {
    
    return {
        
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PDF));