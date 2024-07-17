import {ActiveJob, Job} from "@/app/components/job.entity";
import Joblist from "@/app/components/joblist";
import Activejob from "@/app/components/activejob";

type JobviewProps = {
    jobs: Job[];
    activeJob: ActiveJob | undefined;
}

export default function Jobview({ jobs, activeJob }: JobviewProps) {
    return(
        <div className="list-container-big">
            {activeJob ? <Activejob activeJob={activeJob} /> : <></>}
            <Joblist jobs={jobs} />
        </div>
    )
}
