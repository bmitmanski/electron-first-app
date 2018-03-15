import React from 'react';

class AddIntel extends React.Component {

  constructor(props) {
    super(props);

    this.db = this.props.db.database().ref('intels');
    this.addIntel = this.addIntel.bind(this);
  }

  addIntel() {
    const headline = this.headlineInput.value || 'INTELO!';

    const newIntelRef = this.db.push();
    newIntelRef.set({
      headline: headline,
      content: headline + ' bamboo'
    })
  }

  render() {
    return (<div>
      <input
        type="text"
        ref={input => {
          this.headlineInput = input;
        }}
      />
      <button onClick={this.addIntel}>ADD</button>
    </div>);
  }
}

export default AddIntel;
