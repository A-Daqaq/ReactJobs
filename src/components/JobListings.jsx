import { useState, useEffect } from "react";
import React from "react";
// to make sure that the jobs data are coming from the json file
import JobListing from "./JobListing";
import Spinner from "./Spinner";
const JobListings = ({ isHome = false }) => {
  // true it will show only three false it will show all the jobs
  //
  const [jobs, setJobs] = useState([]); // Empty array is gonna will make the request when the component loads through the useEffect and then it will fill this state with the response from the API
  const [loading, setLoading] = useState(true); // to set a spinner when it's actually fetching

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";
      try {
        const res = await fetch(apiUrl); //back-end local host // we can use limit=3 to show only 3 jobs
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("Error Fetching data,", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs(); // by doing this now the jobs data are coming from our API
  }, []); // we can't put anything inside this array becasue it will trigger every time for ex the name changes we do need this empty array even if we don't have anything else it will be NeverEnding loop
  console.log(jobs); // to make sure that we are getting the jobs from jobs.json
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* <!-- Job Listing 1 --> */}

        {/* <!-- Job Listing 2 --> */}

        {/* <!-- Job Listing 3 --> */}
      </div>
    </section>
  );
};

export default JobListings;
