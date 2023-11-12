import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function UserAvatar({
  name,
  img,
  className,
}: {
  name?: string | null;
  img?: string | null;
  className?: string;
}) {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      {img && (
        <Image
          src={img}
          alt={name || "Avatar"}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}

      <AvatarFallback className="bg-gray-300/50 text-black">
        {name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
