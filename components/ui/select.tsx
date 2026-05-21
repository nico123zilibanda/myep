
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import {
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* ================= ROOT ================= */

const Select = SelectPrimitive.Root;

const SelectGroup =
  SelectPrimitive.Group;

const SelectValue =
  SelectPrimitive.Value;

/* ================= TRIGGER ================= */

const SelectTrigger = React.forwardRef<
  React.ElementRef<
    typeof SelectPrimitive.Trigger
  >,
  React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.Trigger
  >
>(
  (
    { className, children, ...props },
    ref,
  ) => (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      className={cn(
        `
          flex h-11 w-full
          items-center
          justify-between
          gap-2

          rounded-2xl

          border border-input

          bg-background

          px-4 py-2

          text-sm

          shadow-sm

          transition-all duration-200

          outline-none

          placeholder:text-muted-foreground

          focus-visible:border-ring
          focus-visible:ring-4
          focus-visible:ring-ring/20

          disabled:cursor-not-allowed
          disabled:opacity-50

          data-placeholder:text-muted-foreground

          dark:bg-input/30
          dark:hover:bg-input/50
        `,
        className,
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon asChild>
        <ChevronDown
          className="
            size-4
            shrink-0
            opacity-50
          "
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  ),
);

SelectTrigger.displayName =
  SelectPrimitive.Trigger.displayName;

/* ================= CONTENT ================= */

const SelectContent = React.forwardRef<
  React.ElementRef<
    typeof SelectPrimitive.Content
  >,
  React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.Content
  >
>(
  (
    {
      className,
      children,
      position = "popper",
      ...props
    },
    ref,
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        data-slot="select-content"
        className={cn(
          `
            relative z-9999

            max-h-96
            min-w-32

            overflow-hidden

            rounded-2xl

            border border-border

            bg-popover
            text-popover-foreground

            shadow-2xl

            data-[state=open]:animate-in
            data-[state=closed]:animate-out

            data-[state=closed]:fade-out-0
            data-[state=open]:fade-in-0

            data-[state=closed]:zoom-out-95
            data-[state=open]:zoom-in-95

            data-[side=bottom]:slide-in-from-top-2
            data-[side=left]:slide-in-from-right-2
            data-[side=right]:slide-in-from-left-2
            data-[side=top]:slide-in-from-bottom-2

            ${
              position === "popper"
                ? `
                data-[side=bottom]:translate-y-1
                data-[side=left]:-translate-x-1
                data-[side=right]:translate-x-1
                data-[side=top]:-translate-y-1
              `
                : ""
            }
          `,
          className,
        )}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton
          className="
            flex cursor-default
            items-center
            justify-center
            py-1
          "
        >
          <ChevronUp className="size-4" />
        </SelectPrimitive.ScrollUpButton>

        <SelectPrimitive.Viewport
          className={cn(
            `
              p-1
            `,
            position === "popper" &&
              `
                h-(--radix-select-trigger-height)
                min-w-full
                w-(--radix-select-trigger-width)
              `,
          )}
        >
          {children}
        </SelectPrimitive.Viewport>

        <SelectPrimitive.ScrollDownButton
          className="
            flex cursor-default
            items-center
            justify-center
            py-1
          "
        >
          <ChevronDown className="size-4" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);

SelectContent.displayName =
  SelectPrimitive.Content.displayName;

/* ================= ITEM ================= */

const SelectItem = React.forwardRef<
  React.ElementRef<
    typeof SelectPrimitive.Item
  >,
  React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.Item
  >
>(
  (
    { className, children, ...props },
    ref,
  ) => (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        `
          relative flex w-full
          cursor-pointer
          select-none
          items-center

          rounded-xl

          py-2.5 pl-3 pr-9

          text-sm

          outline-none

          transition-colors

          focus:bg-accent
          focus:text-accent-foreground

          data-disabled:pointer-events-none
          data-disabled:opacity-50
        `,
        className,
      )}
      {...props}
    >
      <span
        className="
          absolute right-3

          flex size-4
          items-center
          justify-center
        "
      >
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ),
);

SelectItem.displayName =
  SelectPrimitive.Item.displayName;

/* ================= EXPORTS ================= */

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
};

