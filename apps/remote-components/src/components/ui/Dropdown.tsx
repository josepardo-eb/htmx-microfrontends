import type { ReactElement, ReactNode } from "react";
import type { AlpineComponent } from "alpinejs";
import { serializeAlpineData } from "@/alpine/utils";

interface DropdownAlpineProps {
  open: boolean;
  toggle: () => void;
  close: (focusAfter?: any) => void;
}

const dropdownAplineData: AlpineComponent<DropdownAlpineProps> = {
  open: false,
  toggle() {
    if (this.open) {
      return this.close();
    }
    this.$refs.button.focus();
    this.open = true;
  },
  close(focusAfter?: HTMLElement) {
    if (!this.open) return;

    this.open = false;

    focusAfter && focusAfter.focus();
  },
};

export const DropdownWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const alpineAttributes = {
    "x-data": serializeAlpineData(dropdownAplineData),
    "x-on:keydown.escape.prevent.stop": "close($refs.button)",
    "x-on:focusin.window": "! $refs.panel.contains($event.target) && close()",
    "x-id": "['dropdown-button']",
  };
  return (
    <div {...alpineAttributes} className="relative">
      {children}
    </div>
  );
};

export const Button: React.FC<{ children: ReactNode }> = ({ children }) => {
  const alpineAttributes = {
    ":aria-expanded": "open",
    ":aria-controls": "$id('dropdown-button')",
    "x-ref": "button",
    "x-on:click": "toggle()",
  };
  return (
    <div
      {...alpineAttributes}
      className="hover:cursor-pointer mx-4 px-4 py-2.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:text-gray-500"
    >
      {children}
    </div>
  );
};

export const DropdownPanel: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const alpineAttributes = {
    "x-show": "open",
    "x-transition.origin.top.left": "",
    "x-on:click.outside": "close($refs.button)",
    ":id": "$id('dropdown-button')",
  };
  return (
    <div
      style={{ display: "none" }}
      className="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-md"
      {...alpineAttributes}
    >
      {" "}
      {children}
    </div>
  );
};

export const DropdownItem: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <a
      href="#"
      className="flex items-center gap-2 w-full first-of-type:rounded-t-md last-of-type:rounded-b-md px-4 py-2.5 text-left text-sm hover:bg-gray-50 disabled:text-gray-500 hover:cursor-pointer"
    >
      <span>{children}</span>
    </a>
  );
};

export const Dropdown: React.FC<{
  buttonTitle: string;
  options: string[];
}> = ({ buttonTitle, options }) => {
  return (
    <DropdownWrapper>
      <Button>{buttonTitle}</Button>
      <DropdownPanel>
        {options.map((option, index) => (
          <DropdownItem key={index}>{option}</DropdownItem>
        ))}
      </DropdownPanel>
    </DropdownWrapper>
  );
};
