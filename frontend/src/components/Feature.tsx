import { CircularCount } from "./CircularCount";
import { FontSans } from "./FontSans";

interface feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconTitle: string;
  notificationCount?: number; // This will be the number of notifications for that feature.
}

export const Feature = ({
  icon: Icon,
  iconTitle,
  notificationCount,
}: feature) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 flex-grow">
        <Icon className="h-6 w-6 text-white" />

        <div>
          <FontSans
            title={iconTitle}
            fontSize="18px"
            fontWeight={400}
            color="white"
          />
        </div>
      </div>
      {notificationCount !== undefined && (
        <div className="ml-4">
          <CircularCount dim="25px" count={notificationCount} />
        </div>
      )}
    </div>
  );
};
