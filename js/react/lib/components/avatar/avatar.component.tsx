import { withAs } from "@/utils/hoc";
import { cn } from "@/utils/tw-merge";

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
        className={cn(["rustlanges-avatar", className])}
        style={{
          width: size,
          height: size,
          ...style,
        }}
      >
        <img className="rustlanges-avatar__img" src={avatarUrl} alt={alt} />
      </Component>
    );
  }
);
