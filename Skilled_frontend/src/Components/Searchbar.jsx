import React from 'react'

export const Searchbar = () => {
  return (
    <div>
      <br />
      <div className="input-group mt-3" style={{ padding: '10px' }}>
        <input type="text" className="form-control" placeholder="Search..." />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button">Search</button>
        </div>
      </div>
    </div>
  )
}
