import React from "react";
import { CheckCircle } from "lucide-react";

export default function ProgressStepper({ currentStep, totalSteps, steps }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span 
                  className={`mt-2 text-xs sm:text-sm w-20 sm:w-auto transition-colors ${
                    isCurrent ? 'font-medium text-white' : 'text-slate-400'
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 sm:mx-4 rounded-full transition-colors ${
                    isCompleted ? 'bg-green-500' : 'bg-slate-700'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}