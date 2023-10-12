"use client";

import { Dispatch, SetStateAction, ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-dropdown-menu";
import useWindowSize from "@/lib/hooks/use-window-size";
import { Drawer } from "vaul";

export default function Popover({
  children,
  content,
  align = "center",
}: {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
}) {
  const { isMobile, isDesktop } = useWindowSize();
  if (!isMobile && !isDesktop) return <>{children}</>;
  return (
    <>
      {isMobile && (
          <Drawer.Root>
            <Drawer.Trigger>
              {children}
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Content className="drawer">
                {content}
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
      )}
      {isDesktop && (
        <PopoverPrimitive.Root>
          <PopoverPrimitive.Trigger className="inline-flex cursor-pointer" asChild>
            {children}
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            sideOffset={4}
            align={align}
            className="overflow-hidden z-20 animate-slide-up-fade rounded-xl texture-acrylic border shadow-lg"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      )}
    </>
  );
}
