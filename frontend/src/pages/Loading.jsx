import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StepLoader from "@/components/StepLoader";
import { runResearch } from "@/services/api";
import { toast } from "sonner";

const Loading = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    // State to track status
    const [apiResult, setApiResult] = useState(null);
    const [animationDone, setAnimationDone] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!formData) {
            // If no state (e.g. refresh), go back home
            navigate("/");
            return;
        }

        const fetchData = async () => {
            try {
                console.log("Starting research for:", formData);
                const data = await runResearch(formData);
                console.log("Research complete:", data);
                setApiResult(data);
            } catch (err) {
                console.error("Research failed:", err);
                setError(err);
                toast.error("Analysis failed. Please try again.");
                // Allow user to see the error for a moment or direct back
                setTimeout(() => navigate("/"), 3000);
            }
        };

        fetchData();
    }, [formData, navigate]);

    // Navigation logic: Wait for BOTH API and Animation
    useEffect(() => {
        if (apiResult && animationDone) {
            navigate("/results", { state: apiResult });
        }
    }, [apiResult, animationDone, navigate]);

    // Safety check for rendering
    if (!formData) {
        return null;
    }

    return (
        <div className="relative min-h-screen">
            <StepLoader
                onComplete={() => setAnimationDone(true)}
                moleculeName={formData.moleculeName}
                therapyArea={formData.therapyArea}
            />

            {/* Loading Status Indicator */}
            {animationDone && !apiResult && !error && (
                <div className="fixed bottom-20 left-0 right-0 text-center z-50 animate-pulse">
                    <p className="text-primary font-medium text-lg">
                        Processing real-time data from ClinicalTrials.gov & Europe PMC...
                    </p>
                    <p className="text-sm text-muted-foreground">
                        This may take a few moments.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Loading;
