import './Skills.scss'

export const Skills = () => {
    return(
        <section className="bsb-skill-1 bg-light py-3 py-md-5">
            <div className="container overflow-hidden">
                <div className="row justify-content-xl-center gy-3 gy-sm-4">
                    <div className="col-12 col-sm-6 col-xl-5">
                        <div className="bg-white rounded shadow-sm p-3 p-md-4 p-xxl-5">
                            <h3 className="fw-bold mb-2">Bootstrap</h3>
                            <p className="text-secondary fst-italic mb-4">Bootstrap is a front-end framework that makes it easy to create responsive and mobile-friendly websites.</p>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated progress-bar-width-1" role="progressbar" aria-label="Bootstrap" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">85%</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-xl-5">
                        <div className="bg-white rounded shadow-sm p-3 p-md-4 p-xxl-5">
                            <h3 className="fw-bold mb-2">React</h3>
                            <p className="text-secondary fst-italic mb-4">React is a JavaScript library for building user interfaces. It is known for its speed, performance, and scalability.</p>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated progress-bar-width-2" role="progressbar" aria-label="React" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-xl-5">
                        <div className="bg-white rounded shadow-sm p-3 p-md-4 p-xxl-5">
                            <h3 className="fw-bold mb-2">Vue</h3>
                            <p className="text-secondary fst-italic mb-4">Vue is a progressive JavaScript framework for building user interfaces. It is known for its simplicity and flexibility.</p>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated progress-bar-width-3" role="progressbar" aria-label="Vue" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-xl-5">
                        <div className="bg-white rounded shadow-sm p-3 p-md-4 p-xxl-5">
                            <h3 className="fw-bold mb-2">WordPress</h3>
                            <p className="text-secondary fst-italic mb-4">WordPress is a content management system (CMS) that is used to create and manage websites.</p>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated progress-bar-width-4" role="progressbar" aria-label="WordPress" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">95%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}