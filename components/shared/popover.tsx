"use client";

import { Dispatch, SetStateAction, ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import useWindowSize from "@/lib/hooks/use-window-size";
import { Drawer } from "vaul";

export default function Popover({
  children,
  content,
  align = "center",
  openPopover,
  setOpenPopover,
}: {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
}) {
  const { isMobile, isDesktop } = useWindowSize();
  if (!isMobile && !isDesktop) return <>{children}</>;
  return (
    <>
      {isMobile && (
          <Drawer.Root open={openPopover} onOpenChange={setOpenPopover}>
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
        <PopoverPrimitive.Root
          open={openPopover}
          onOpenChange={(isOpen) => setOpenPopover(isOpen)}
        >
          <PopoverPrimitive.Trigger className="inline-flex" asChild>
            {children}
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            sideOffset={4}
            align={align}
            className="overflow-hidden z-20 animate-slide-up-fade items-center rounded border border-neutral-200 bg-white drop-shadow-lg"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      )}
    </>
  );
}
