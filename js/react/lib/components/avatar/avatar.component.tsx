import { withAs } from "../../utils/hoc/with-as.hoc";
import { cn } from "../../utils/tw-merge";

type AvatarProps = {
  avatarUrl: string;
  alt?: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
};

export const Avatar = withAs(
  (
    Component,
    { avatarUrl, alt, size = 32, className, style, ...rest }: AvatarProps
  ) => {
    return (
      <Component
        {...rest}
        className={cn([
          "grid aspect-square place-items-center overflow-hidden rounded-full border object-cover",
          className,
        ])}
        style={{
          width: size,
          height: size,
          ...style,
        }}
      >
        <img
          className="aspect-square h-full w-full"
          src={avatarUrl}
          alt={alt}
        />
      </Component>
    );
  }
);
