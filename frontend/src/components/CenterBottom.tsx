import { Clipboard, Mic, Smile } from "react-feather";
import { FontSans } from "./FontSans";

export const CenterBottom = () => {
  return (
    <div className="p-3 flex justify-center">
      <div className="p-2 bg-slate-300 flex items-center space-x-2 w-full rounded justify-between">
        <div className="flex items-center space-x-2">
          <Mic />
          <FontSans
            title="Type your message here"
            fontSize="13px"
            fontWeight={600}
            color="grey"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Clipboard />
          <Smile />
        </div>
      </div>
    </div>
  );
};
