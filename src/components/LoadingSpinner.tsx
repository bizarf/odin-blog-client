import { MoonLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/[.7]">
            <MoonLoader color="#CCCCCC" size={150} />
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default LoadingSpinner;
