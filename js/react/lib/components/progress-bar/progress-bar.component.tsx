import { Ferris } from "@/icons/ferris";
import { cn } from "@/utils/tw-merge";

type ProgressBarProps = {
  percentage: number;
};
export const ProgressBar = (props: ProgressBarProps) => {
  const percentage = Number(props.percentage ?? 0);
  const isZeroProgress = percentage === 0;
  const progressIsInLimit = isZeroProgress || percentage === 100;
  const isInMinLimit = percentage < 25;

  const position = {
    right: isInMinLimit ? "auto" : `${100 - percentage}%`,
    left: isInMinLimit ? `${percentage}%` : "auto",
  };

  return (
    <div className="rustlanges-progress-bar__container">
      <div className="rustlanges-progress-bar">
        <span
          className={cn([
            "text-overline rustlanges-progress-bar__percentage",
            isInMinLimit && "rustlanges-progress-bar__percentage--invert",
          ])}
          style={position}
        >
          {percentage}%
          <Ferris width={15} height={15} />
        </span>
        <div
          className={cn([
            "rustlanges-progress-bar__fill",
            progressIsInLimit && "rustlanges-progress-bar__fill--limit",
          ])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
