import './components.css';

function Info() {
  function AsideItems() {
    return <div></div>
  }

  function MainContents() {
    return <div></div>
  }

  return (<div className="component">
    <aside>{AsideItems()}</aside>
    <section className="contents">{MainContents()}</section>
  </div>);
}

export default Info;