var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
  render: function() {
    return <ul>
    {this.renderList()}
    </ul>
  },
  renderList: function() {
    if (!this.props.items) {
      return <h4>
        Add a Todo to Start
      </h4>
    } else {
      var children = [];

      for(var key in this.props.items) {
        var item = this.props.items[key];
        item.key = key;

        children.push(
          <ListItem
            item={item}
            key={key}
            >
          </ListItem>
        )
      }
      return children;
    }
  }
});
