
import { Circle } from "lucide-react";

const Loading = () => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f4f4] backdrop-blur-md">
      <div className="flex flex-col items-center space-y-6">
        {/* Rotating Circle */}
        <div className="relative">
          <Circle 
            size={64} 
            className="text-black stroke-2" 
          />
          <Circle 
            size={64} 
            className="absolute inset-0 text-black stroke-2 animate-spin"
            style={{
              strokeDasharray: "100 100",
              strokeDashoffset: "75",
              animation: "spin 1.5s linear infinite, dash 1.5s ease-in-out infinite"
            }}
          />
        </div>
        

      </div>
    </div>
  );
};

export default Loading;