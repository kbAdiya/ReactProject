function About() {
  return (
    <section className="about text-center">
      <h1>About Project</h1>
      <div className="container">
        <div className="row">
          
          <div className="col about-item">
            <span>ℹ️</span>
            <h2>Main info</h2>
            
              <p className="lead">
              someinfo
            </p>
            
          </div>

          <div className="col about-item">
            <span>🌟</span>
            <h2>info</h2>
            
              <p className="lead">
             some info
            </p>
            
          </div>

          <div className="col about-item">
            <span>🚀</span>
            <h2>Goals</h2>
               <p className="lead">
              goals
            </p>
            
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;