const JobPortalContent = () => {
  return (
    <div className="container mt-5">
      {/* Premium Advertisements Section */}
      <section>
        <h3 className="mb-4">Premium Advertisements</h3>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>Time ▼</div>
        </div>
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="premium-ad p-3 border rounded text-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="mb-2"
                />
                <h5>JOB TITLE</h5>
                <p>Company Name</p>
                <p>Location</p>

                {/* <Link to="/jobAdPage" className="text-primary">
                  VIEW DETAILS
                </Link> */}
                <a href="/jobAdPage" className="text-primary">
                    VIEW DETAILS
                  </a>
                <p>2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Hiring Companies Section */}
      <section className="mt-5">
        <h3 className="mb-4">Top Hiring Companies</h3>
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="hiring-company p-3 border rounded text-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="mb-2"
                />
                <p>Company Name</p>
                <p>120 Job posts</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="mt-5">
        <h3 className="mb-4">Job Categories</h3>
        <div className="row">
          {[...Array(9)].map((_, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="job-category p-3 border rounded text-center">
                <p>Job Category</p>
                <p>120 Job posts</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <br /><br />
    </div>
  );
};

export default JobPortalContent;