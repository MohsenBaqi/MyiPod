import React, { Component } from 'react';

/* make pagination */
class Page extends Component {
  render() {
    return (
      <li onClick={() => { this.props.handlePage(this.props.Id) }}
          className={(this.props.CurrentPageId === this.props.Id)?'active':''}>
        {this.props.Id}
      </li>
    )
  }
}

class Pagination extends Component {
  /* handle page click */
  handlePage = (pageId) => {
    this.props.handlePage(pageId);
  }

  render() {
    var pages = [];
    for (var i = 1; i <= Math.ceil(this.props.TotalItems/this.props.PageItems); i++) {
        pages.push( i );
    }
    return (
      <ul id="pagination">
        {pages.map((page, i) => {
          return <Page key={i}
                       Id={page}
                       CurrentPageId={this.props.CurrentPageId}
                       handlePage={this.handlePage.bind(this)}/>
        })}
        <div className="clearfix"></div>
      </ul>
    );
  }
}

export default Pagination;