import React, { useEffect, useState } from "react";
import { Check, Loader2, BarChart3, Ship, FileSearch, FlaskConical, BookOpen, FileText, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    { id: 1, label: "Analyzing Market (IQVIA)", icon: BarChart3, duration: 2000 },
    { id: 2, label: "Checking Export/Import Data", icon: Ship, duration: 1500 },
    { id: 3, label: "Scanning Patent Landscape", icon: FileSearch, duration: 2000 },
    { id: 4, label: "Reviewing Clinical Trials", icon: FlaskConical, duration: 1800 },
    { id: 5, label: "Summarizing Literature", icon: BookOpen, duration: 1500 },
    { id: 6, label: "Processing Internal PDFs", icon: FileText, duration: 1200 },
    { id: 7, label: "Synthesizing Innovation Story", icon: Lightbulb, duration: 2000 },
];

const StepLoader = ({ onComplete, moleculeName, therapyArea }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);

    useEffect(() => {
        if (currentStep >= steps.length) {
            setTimeout(onComplete, 500);
            return;
        }

        const timer = setTimeout(() => {
            setCompletedSteps((prev) => [...prev, steps[currentStep].id]);
            setCurrentStep((prev) => prev + 1);
        }, steps[currentStep].duration);

        return () => clearTimeout(timer);
    }, [currentStep, onComplete]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 mb-6 animate-pulse-glow">
                        <FlaskConical className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-foreground mb-3">
                        Analyzing {moleculeName}
                    </h1>
                    <p className="text-muted-foreground">
                        Researching opportunities in {therapyArea}
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="glass-card p-6 space-y-4">
                    {steps.map((step, index) => {
                        const isCompleted = completedSteps.includes(step.id);
                        const isCurrent = currentStep === index && !isCompleted;
                        const isPending = currentStep < index;
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.id}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-xl transition-all duration-500",
                                    isCompleted && "bg-primary/10",
                                    isCurrent && "bg-muted",
                                    isPending && "opacity-50"
                                )}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                {/* Step Icon */}
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                                        isCompleted && "bg-primary step-complete",
                                        isCurrent && "bg-primary/30",
                                        isPending && "bg-muted"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="w-5 h-5 text-primary-foreground" />
                                    ) : isCurrent ? (
                                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                    ) : (
                                        <Icon className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </div>

                                {/* Step Label */}
                                <div className="flex-1">
                                    <p
                                        className={cn(
                                            "font-medium transition-colors",
                                            isCompleted && "text-primary",
                                            isCurrent && "text-foreground",
                                            isPending && "text-muted-foreground"
                                        )}
                                    >
                                        {step.label}
                                    </p>
                                </div>

                                {/* Status Badge */}
                                {isCompleted && (
                                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                                        Done
                                    </span>
                                )}
                                {isCurrent && (
                                    <span className="text-xs font-medium text-foreground bg-muted px-2 py-1 rounded-full">
                                        Processing...
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Progress</span>
                        <span>{Math.round((completedSteps.length / steps.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepLoader;
