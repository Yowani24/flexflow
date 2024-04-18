import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { MdRocketLaunch } from "react-icons/md";
import { TbAdjustmentsCode } from "react-icons/tb";
import { GrTestDesktop } from "react-icons/gr";
import { TbProgress } from "react-icons/tb";

const TaskDetails = ({ buttonProps, projectName }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [isSecondStep, setIsSecondStep] = React.useState(false);
  const [isThirdStep, setIsThirdStep] = React.useState(false);
  const [isLastStep, setIsLastStep] = React.useState(false);

  // const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  // const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const { opacity, transform } = useSpring({
    opacity: showDialog ? 1 : 0,
    transform: showDialog ? "translateY(0%)" : "translateY(0%)",
    onRest: () => {
      if (!showDialog) {
        setShowDialog(false);
      }
    },
  });

  return (
    <>
      <div className="rounded-full" onClick={() => setShowDialog(true)}>
        {buttonProps}
      </div>

      {showDialog && (
        <animated.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            opacity,
            transform,
          }}
        >
          <div className="fixed inset-0 flex items-center justify-center transition-all z-50">
            <div className="fixed inset-0 bg-black opacity-50 transition-all"></div>
            <div className="relative flex flex-col justify-start bg-white p-5 rounded-lg z-50 w-[90%] md:w-[60%] h-[80%] transition-all">
              <div className="flex items-start justify-between w-full transition-all">
                <p className="text-gray-600 font-medium text-xl">
                  {projectName}
                </p>
                <div
                  onClick={() => setShowDialog(false)}
                  className="bg-gray-200 group transition-all hover:bg-[rgb(191,199,244)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                >
                  <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                </div>
              </div>
              <div className="bg-gray-100 w-full h-44 rounded-md mt-5">
                <div className="w-full px-24 py-4">
                  <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    // isSecondStep={(value) => setIsSecondStep(value)}
                    // isThirdStep={(value) => setIsThirdStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                  >
                    <Step onClick={() => setActiveStep(0)}>
                      <TbProgress className="h-5 w-5" />
                      <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <Typography
                          variant="h6"
                          color={activeStep === 0 ? "blue-gray" : "gray"}
                          className="text-lg"
                        >
                          Development
                        </Typography>
                        <Typography
                          color={activeStep === 0 ? "blue-gray" : "gray"}
                          className="font-normal text-xs"
                        >
                          from <span className="font-semibold">Apr 14</span> to{" "}
                          <span className="font-semibold">Apr 30</span>
                        </Typography>
                      </div>
                    </Step>
                    <Step onClick={() => setActiveStep(1)}>
                      <GrTestDesktop className="h-5 w-5" />
                      <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <Typography
                          variant="h6"
                          color={activeStep === 1 ? "blue-gray" : "gray"}
                        >
                          Beta
                        </Typography>
                        <Typography
                          color={activeStep === 1 ? "blue-gray" : "gray"}
                          className="font-normal text-xs"
                        >
                          from <span className="font-semibold">Apr 14</span> to{" "}
                          <span className="font-semibold">Apr 30</span>
                        </Typography>
                      </div>
                    </Step>
                    <Step onClick={() => setActiveStep(2)}>
                      <TbAdjustmentsCode className="h-5 w-5" />
                      <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <Typography
                          variant="h6"
                          color={activeStep === 2 ? "blue-gray" : "gray"}
                        >
                          Final development
                        </Typography>
                        <Typography
                          color={activeStep === 2 ? "blue-gray" : "gray"}
                          className="font-normal text-xs"
                        >
                          from <span className="font-semibold">Apr 14</span> to{" "}
                          <span className="font-semibold">Apr 30</span>
                        </Typography>
                      </div>
                    </Step>
                    <Step onClick={() => setActiveStep(3)}>
                      <MdRocketLaunch className="h-5 w-5" />
                      <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <Typography
                          variant="h6"
                          color={activeStep === 3 ? "blue-gray" : "gray"}
                        >
                          Launch
                        </Typography>
                        <Typography
                          color={activeStep === 3 ? "blue-gray" : "gray"}
                          className="font-normal text-xs"
                        >
                          from <span className="font-semibold">Apr 14</span> to{" "}
                          <span className="font-semibold">Apr 30</span>
                        </Typography>
                      </div>
                    </Step>
                  </Stepper>
                  {/* <div className="mt-32 flex justify-between">
                    <Button onClick={handlePrev} disabled={isFirstStep}>
                      Prev
                    </Button>
                    <Button onClick={handleNext} disabled={isLastStep}>
                      Next
                    </Button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default TaskDetails;
