import './Nabbar.css'

function BasicExample() {
  const userData = localStorage.getItem('usedData')
  const data = JSON.parse(userData)
  return (
    <nav className="navbar bg-darkk main">
      <div className="container-fluid">
        <span className="navbar-brand text-light d-flex align-content-center  ms-3" href="">
          <img src="../../../../avatar.png" alt="" width="50" height="50" className="d-inline-block align-text-top me-2 " />
          <h5 className='mt-3 userName'>{data? data.name:''}</h5> 
        </span>
      </div>
    </nav>
  );
}

export default BasicExample;