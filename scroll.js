var InfiniteScrollExample = React.createClass({
  //...
  _renderItems: function() {
    return this.state.items.map(function(imageUrl, index) {
      // ... generate list items here ...
    });
  },

  _renderWaypoint: function() {
    if (!this.state.isLoading) {
      return (
        <Waypoint/>
      );
    }
  },

  render: function() {
    return (
      <div className="infinite-scroll-example">
        <div className="infinite-scroll-example__scrollable-parent">
          {this._renderItems()}
          {this._renderWaypoint()}
        </div>
      </div>
    );
  }
});
