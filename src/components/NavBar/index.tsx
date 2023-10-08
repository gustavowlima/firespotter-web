import Logo from "../../assets/logo.svg?react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { LayoutDashboard } from "lucide-react";

type ITooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
};

export const NavBarTooltip = ({ children, content }: ITooltipProps) => {
  return (
    <Tooltip.Root delayDuration={200}>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="right"
          arrowPadding={4}
          sideOffset={8}
          className=" data-[state=delayed-open]:data-[side=right]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
        >
          {content}
          <Tooltip.Arrow className="fill-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export const NavBar = () => {
  return (
    <nav className="flex items-center flex-wrap mx-6 h-screen py-6">
      <div className="flex flex-col items-center bg-gray-800 h-full rounded-3xl p-4 gap-6">
        <Logo />
        <NavBarTooltip content="Dashboard">
          <div className="flex items-center p-3 hover:bg-gray-900 rounded-full">
            <LayoutDashboard size={28} className="text-white" />
          </div>
        </NavBarTooltip>
      </div>
    </nav>
  );
};
