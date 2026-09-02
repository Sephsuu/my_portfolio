import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

export function AppTooltip({
	trigger,
	content,
	triggerClassName,
	triggerStyle,
	contentClassName,
	onClick
}: {
	trigger: React.ReactNode
	content: React.ReactNode | string
	triggerClassName?: string
	triggerStyle?: React.CSSProperties
	contentClassName?: string
	onClick?: React.MouseEventHandler<HTMLSpanElement>
}) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger 
					className={triggerClassName} 
					asChild
				>
					<span onClick={onClick} style={triggerStyle}>
						{trigger}
					</span>
				</TooltipTrigger>
				<TooltipContent className={`${contentClassName ?? ""} border border-primary-foreground/20 bg-primary text-primary-foreground`}>
					{content}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
