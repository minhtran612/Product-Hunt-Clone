import React from 'react';

class Popup extends React.Component {
  renderPopupContent() {
    const id = this.props.id;
    return (
      <div id={id} className="modal fade" role="dialog">
        <div className="modal-dialog modal-md">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                 <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
                {this.props.children}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div >
        {
          this.renderPopupContent()
        }
      </div>
    );
  }
}

export default Popup;
