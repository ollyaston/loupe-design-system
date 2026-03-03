"use client";

import Color from "color";
import { Icon } from "@/design-system/icon";
import * as Slider from "@radix-ui/react-slider";
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@/design-system/button";
import { Input } from "@/design-system/input";
import { Select } from "@/design-system/select";
import { cn } from "@/lib/utils";

interface ColorPickerContextValue {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  mode: string;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setLightness: (lightness: number) => void;
  setAlpha: (alpha: number) => void;
  setMode: (mode: string) => void;
}

const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined,
);

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext);

  if (!context) {
    throw new Error("useColorPicker must be used within a ColorPickerProvider");
  }

  return context;
};

export type ColorPickerValue = {
  hex: string;
  rgb: { r: number; g: number; b: number };
  rgba: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number };
  hsla: { h: number; s: number; l: number; a: number };
};

export type ColorPickerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "className"
> & {
  value?: Parameters<typeof Color>[0];
  defaultValue?: Parameters<typeof Color>[0];
  onChange?: (value: ColorPickerValue) => void;
  showAlpha?: boolean;
  showHue?: boolean;
  showEyeDropper?: boolean;
  showFormatSelector?: boolean;
  selectionHeight?: string;
  width?: "full";
};

export const ColorPicker = ({
  value,
  defaultValue = "#000000",
  onChange,
  showAlpha = true,
  showHue = true,
  showEyeDropper = true,
  showFormatSelector = true,
  selectionHeight = "h-48",
  width,
  children,
  ...props
}: ColorPickerProps) => {
  const initialColor = value ? Color(value) : Color(defaultValue);

  const [hue, setHue] = useState(initialColor.hue() || 0);
  const [saturation, setSaturation] = useState(
    initialColor.saturationl() || 100,
  );
  const [lightness, setLightness] = useState(initialColor.lightness() || 50);
  const [alpha, setAlpha] = useState(initialColor.alpha() * 100 || 100);
  const [mode, setMode] = useState("hex");
  const [isInitialized, setIsInitialized] = useState(false);

  // Track the last value we emitted to prevent feedback loops:
  // When we send a hex value to parent via onChange, parent updates our value prop,
  // which would trigger a re-sync and cause precision issues (e.g. hue slider shaking).
  // By tracking what we sent, we can skip re-syncing our own updates.
  const lastEmittedValue = useRef<string | null>(null);

  // Update color when controlled value changes (but not from our own updates)
  useEffect(() => {
    if (value && isInitialized) {
      // Skip if this is the same value we just emitted (prevents feedback loop)
      if (lastEmittedValue.current === value) {
        console.log("[ColorPicker] Skipping feedback loop for:", value);
        return;
      }

      const color = Color(value);
      const hslValues = color.hsl().array();

      console.log("[ColorPicker] External value changed:", {
        value,
        hsl: hslValues,
        rgb: color.rgb().array(),
      });

      setHue(hslValues[0] || 0);
      setSaturation(hslValues[1] || 100);
      setLightness(hslValues[2] || 50);
      setAlpha(color.alpha() * 100 || 100);
    }
  }, [value, isInitialized]);

  // Mark as initialized after first render
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Notify parent of changes (but not on initial mount)
  useEffect(() => {
    if (onChange && isInitialized) {
      const color = Color.hsl(hue, saturation, lightness).alpha(alpha / 100);
      const rgbArray = color.rgb().array();
      const hslArray = color.hsl().array();

      // Round all values
      const r = Math.round(rgbArray[0]);
      const g = Math.round(rgbArray[1]);
      const b = Math.round(rgbArray[2]);
      const a = Math.round(alpha) / 100;
      const h = Math.round(hslArray[0]);
      const s = Math.round(hslArray[1]);
      const l = Math.round(hslArray[2]);

      // Generate hex string
      const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

      // Store the value we're about to emit to prevent feedback loop
      lastEmittedValue.current = hex;

      console.log("[ColorPicker] onChange called:", {
        hex,
        hsl: { h, s, l },
        rgb: { r, g, b },
      });

      onChange({
        hex,
        rgb: { r, g, b },
        rgba: { r, g, b, a },
        hsl: { h, s, l },
        hsla: { h, s, l, a },
      });
    }
  }, [hue, saturation, lightness, alpha, onChange, isInitialized]);

  return (
    <ColorPickerContext.Provider
      value={{
        hue,
        saturation,
        lightness,
        alpha,
        mode,
        setHue,
        setSaturation,
        setLightness,
        setAlpha,
        setMode,
      }}
    >
      <div
        className={cn(
          "loupe-system",
          "flex flex-col gap-4",
          width === "full" ? "w-full" : "w-full max-w-md",
        )}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            <ColorPickerSelection className={cn("w-full", selectionHeight)} />
            {showHue && (
              <div className="flex gap-2">
                <ColorPickerHue className="flex-1" />
              </div>
            )}
            {showAlpha && (
              <div className="flex gap-2">
                <ColorPickerAlpha className="flex-1" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <ColorPickerFormat className="flex-1" />
              {showFormatSelector && <ColorPickerOutput />}
              {showEyeDropper && <ColorPickerEyeDropper />}
            </div>
          </>
        )}
      </div>
    </ColorPickerContext.Provider>
  );
};

export type ColorPickerSelectionProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerSelection = memo(
  ({ className, ...props }: ColorPickerSelectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const { hue, saturation, lightness, setSaturation, setLightness } =
      useColorPicker();

    const backgroundGradient = useMemo(() => {
      return `linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0)),
            linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)),
            hsl(${hue}, 100%, 50%)`;
    }, [hue]);

    // Update circle position when saturation/lightness change externally (e.g. from controlled value prop)
    // Skip when dragging to avoid interfering with user input
    // This uses the inverse of the formula in handlePointerMove to convert color values back to position
    useEffect(() => {
      if (!isDragging) {
        const x = saturation / 100;
        const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x);
        const y = topLightness === 0 ? 0 : 1 - lightness / topLightness;

        setPositionX(x);
        setPositionY(Math.max(0, Math.min(1, y)));
      }
    }, [saturation, lightness, isDragging]);

    const handlePointerMove = useCallback(
      (event: PointerEvent, forceUpdate = false) => {
        if (!(forceUpdate || (isDragging && containerRef.current))) {
          return;
        }

        if (!containerRef.current) {
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (event.clientX - rect.left) / rect.width),
        );
        const y = Math.max(
          0,
          Math.min(1, (event.clientY - rect.top) / rect.height),
        );

        setPositionX(x);
        setPositionY(y);
        setSaturation(x * 100);
        const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x);
        const lightness = topLightness * (1 - y);

        setLightness(lightness);
      },
      [isDragging, setSaturation, setLightness],
    );

    useEffect(() => {
      const handlePointerUp = () => setIsDragging(false);

      if (isDragging) {
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
      }

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }, [isDragging, handlePointerMove]);

    return (
      <div
        className={cn(
          "loupe-system",
          "relative size-full cursor-crosshair rounded",
          className,
        )}
        onPointerDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
          // Use forceUpdate=true because state hasn't updated yet
          handlePointerMove(e.nativeEvent, true);
        }}
        ref={containerRef}
        style={{
          background: backgroundGradient,
        }}
        {...props}
      >
        <div
          /* eslint-disable-next-line agent-loupe-ui/literal-color-classes */
          className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute h-4 w-4 rounded-full border-2 border-white"
          style={{
            left: `${positionX * 100}%`,
            top: `${positionY * 100}%`,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
          }}
        />
      </div>
    );
  },
);

ColorPickerSelection.displayName = "ColorPickerSelection";

export type ColorPickerHueProps = ComponentProps<typeof Slider.Root>;

export const ColorPickerHue = ({
  className,
  ...props
}: ColorPickerHueProps) => {
  const { hue, setHue } = useColorPicker();

  return (
    <Slider.Root
      className={cn(
        "loupe-system",
        "relative flex h-4 w-full touch-none",
        className,
      )}
      max={360}
      onValueChange={([hue]) => setHue(hue)}
      step={1}
      value={[hue]}
      {...props}
    >
      <Slider.Track className="relative my-0.5 h-3 w-full grow rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]">
        <Slider.Range className="absolute h-full" />
      </Slider.Track>
      <Slider.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  );
};

export type ColorPickerAlphaProps = ComponentProps<typeof Slider.Root>;

export const ColorPickerAlpha = ({
  className,
  ...props
}: ColorPickerAlphaProps) => {
  const { alpha, setAlpha } = useColorPicker();

  return (
    <Slider.Root
      className={cn(
        "loupe-system",
        "relative flex h-4 w-full touch-none",
        className,
      )}
      max={100}
      onValueChange={([alpha]) => setAlpha(alpha)}
      step={1}
      value={[alpha]}
      {...props}
    >
      <Slider.Track
        className="relative my-0.5 h-3 w-full grow rounded-full"
        style={{
          background:
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center',
        }}
      >
        {/* eslint-disable-next-line agent-loupe-ui/literal-color-classes */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-black/50" />
        <Slider.Range className="absolute h-full rounded-full bg-transparent" />
      </Slider.Track>
      <Slider.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  );
};

export type ColorPickerEyeDropperProps = ComponentProps<typeof Button>;

export const ColorPickerEyeDropper = ({
  className,
  ...props
}: ColorPickerEyeDropperProps) => {
  const { setHue, setSaturation, setLightness, setAlpha } = useColorPicker();

  const handleEyeDropper = async () => {
    try {
      // @ts-expect-error - EyeDropper API is experimental
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      const color = Color(result.sRGBHex);
      const [h, s, l] = color.hsl().array();

      setHue(h);
      setSaturation(s);
      setLightness(l);
      setAlpha(100);
    } catch (error) {
      console.error("EyeDropper failed:", error);
    }
  };

  return (
    <Button
      className={cn("shrink-0 text-muted-foreground", className)}
      onClick={handleEyeDropper}
      size="icon"
      variant="outline"
      type="button"
      {...props}
    >
      <Icon name="colorize" size={16} />
    </Button>
  );
};

export type ColorPickerOutputProps = Omit<
  ComponentProps<typeof Select>,
  "options" | "value" | "onValueChange" | "placeholder" | "triggerClassName"
> & {
  options?: never; // Prevent options from being passed
};

const formats = ["hex", "rgb", "css", "hsl"];

export const ColorPickerOutput = ({
  className,
  ...props
}: ColorPickerOutputProps) => {
  const { mode, setMode } = useColorPicker();

  return (
    <Select
      onValueChange={setMode}
      value={mode}
      placeholder="Mode"
      triggerClassName="h-8 w-20 shrink-0 text-xs"
      {...props}
      options={formats.map((format) => ({
        value: format,
        label: format.toUpperCase(),
      }))}
    />
  );
};

type PercentageInputProps = ComponentProps<typeof Input>;

const PercentageInput = ({ className, ...props }: PercentageInputProps) => {
  return (
    <div className="relative">
      <Input
        readOnly
        type="text"
        {...props}
        className={cn(
          "h-8 w-[3.25rem] rounded-l-none bg-secondary px-2 text-xs shadow-none",
          className,
        )}
      />
      <span className="-translate-y-1/2 absolute top-1/2 right-2 text-muted-foreground text-xs">
        %
      </span>
    </div>
  );
};

export type ColorPickerFormatProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerFormat = ({
  className,
  ...props
}: ColorPickerFormatProps) => {
  const { hue, saturation, lightness, alpha, mode } = useColorPicker();
  const color = Color.hsl(hue, saturation, lightness, alpha / 100);

  if (mode === "hex") {
    const hex = color.hex();

    return (
      <div
        className={cn(
          "-space-x-px relative flex w-full items-center rounded-md",
          className,
        )}
        {...props}
      >
        <Input
          className="h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none"
          readOnly
          type="text"
          value={hex}
        />
        <PercentageInput value={alpha} />
      </div>
    );
  }

  if (mode === "rgb") {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value));

    return (
      <div
        className={cn("-space-x-px flex items-center rounded-md", className)}
        {...props}
      >
        {rgb.map((value, index) => (
          <Input
            className={cn(
              "h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none",
              index && "rounded-l-none",
              className,
            )}
            key={index}
            readOnly
            type="text"
            value={value}
          />
        ))}
        <PercentageInput value={alpha} />
      </div>
    );
  }

  if (mode === "css") {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value));

    return (
      <div className={cn("w-full rounded-md", className)} {...props}>
        <Input
          className="h-8 w-full bg-secondary px-2 text-xs shadow-none"
          readOnly
          type="text"
          value={`rgba(${rgb.join(", ")}, ${alpha}%)`}
          {...props}
        />
      </div>
    );
  }

  if (mode === "hsl") {
    const hsl = color
      .hsl()
      .array()
      .map((value) => Math.round(value));

    return (
      <div
        className={cn("-space-x-px flex items-center rounded-md", className)}
        {...props}
      >
        {hsl.map((value, index) => (
          <Input
            className={cn(
              "h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none",
              index && "rounded-l-none",
              className,
            )}
            key={index}
            readOnly
            type="text"
            value={value}
          />
        ))}
        <PercentageInput value={alpha} />
      </div>
    );
  }

  return null;
};
