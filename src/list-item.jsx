var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://basic-react-todo.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
  },
  render: function() {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          onChange={this.handleDoneChange}
          checked={this.state.done}
        />
      </span>

      <input type="text"
        disabled={this.state.done}
        className="form-control"
        value={this.state.text}
        onChange={this.handleTextChange}
        />

      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          onClick={this.handleDeleteClick}
          className="btn btn-default">
          Delete
        </button>
      </span>
    </div>
  },
  handleTextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  handleUndoClick: function() {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleSaveClick: function() {
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  },
  changesButtons: function() {
    if(!this.state.textChanged) {
      return null
    } else {
      return [
        <button
        onClick={this.handleSaveClick}
        className="btn btn-success">Save</button>,

        <button
        onClick={this.handleUndoClick}
        className="btn btn-default">
        Undo</button>
      ]
    }
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked};
    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick: function() {
    this.fb.remove();
  }
});
