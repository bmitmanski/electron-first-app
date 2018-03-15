import React from 'react';

class IntelList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      intels: []
    };

    this.db = this.props.db.database().ref('intels');
    this.db.on('value', snapshot => {
      const intels = [];
      console.log('intelList snapshot snapshot', snapshot);
      snapshot.forEach(childSnapshot => {
        const intel = childSnapshot.val();
        intel.key = childSnapshot.key;
        intels.push(intel);
      });
      this.setState({
        intels: intels
      });
    });
    this.deleteIntel = this.deleteIntel.bind(this);
  }

  // addIntel() {
  //   const headline = this.headlineInput.value || 'INTELO!';
  //
  //   const newIntelRef = this.db.push();
  //   newIntelRef.set({
  //     headline: headline,
  //     content: headline+'bamboo'
  //   })
  // }

  deleteIntel(key) {
    const intelRef = this.db.child(key);

    intelRef.remove()
      .then(() => console.log('IntelList deleted'))
      .catch(err => console.log('IntelList  err', err))
  }

  render() {
    return <ul>
      {this.state.intels.map(intel => {
        return (<li key={intel.key}>
          {intel.headline}
          <button onClick={() => this.deleteIntel(intel.key)}>Delete</button>
          </li>)
      })}
    </ul>;
  }
}

export default IntelList;