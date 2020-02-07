import { connect } from 'react-redux';

import Room from '../../Room';

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.get(ownProps.roomID),
  };
}

export default connect(mapStateToProps, null)(Room);
