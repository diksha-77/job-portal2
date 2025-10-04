import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const JobDescription = () => {
    const { jobId } = useParams();
    const { user } = useSelector(store => store.auth);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/job/${jobId}`, { withCredentials: true });
                if (res.data.success) setJob(res.data.job);
            } catch (error) {
                toast.error("Failed to fetch job details");
            }
        };
        fetchJob();
    }, [jobId]);

    const applyHandler = async () => {
        if (!user) return toast.error("Login first to apply!");
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/job/apply/${jobId}`, {}, { withCredentials: true });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply");
        } finally {
            setLoading(false);
        }
    };

    if (!job) return <p className="text-center mt-10">Loading job...</p>;

    return (
        <div className="p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto mt-6">
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <p className="text-gray-500 mb-4">{job.company?.name}</p>
            <p className="mb-4">{job.description}</p>
            <Button onClick={applyHandler} disabled={loading}>
                {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2 inline" /> : "Apply Now"}
            </Button>
        </div>
    );
};

export default JobDescription;
