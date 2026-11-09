import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { raised, well } from "@/components/kit/styles"
import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn("relative grow overflow-hidden rounded-[5px] select-none data-horizontal:h-4 data-horizontal:w-full data-vertical:h-full data-vertical:w-4", well)}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-muted-foreground/45 select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={cn("relative block h-[22px] w-2.5 shrink-0 cursor-grab rounded-[3px] ring-ring/50 transition-[box-shadow,filter] select-none after:absolute after:-inset-2 hover:brightness-[.98] active:cursor-grabbing active:shadow-(--button-raised-pressed) disabled:pointer-events-none disabled:opacity-50 pointer-coarse:after:-inset-3 dark:hover:brightness-[1.2]", raised)}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
