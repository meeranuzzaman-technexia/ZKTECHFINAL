"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  index?: string;
  title: string;
  image: string;
  href?: string;
  description?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

export interface WorksWheelProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  label?: string;
  action?: string;
  pageScrollDriven?: boolean;
  onTurnRequest?: (turn: number) => void;
}

export interface WorksWheelHandle {
  setTurn: (turn: number, immediate?: boolean) => void;
}

const CARD_H = 0.38;
const CARD_MAX_W = 0.46;
const CARD_RATIO = 1.45;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const RING_R = 0.92;
const BOW = 1.82;
const TITLE = 0.124;
const INDEX = 0.04;
const CULL = 1.6;
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.12;

const clamp = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value));
const lerp = (a: number, b: number, amount: number) => a + (b - a) * amount;

type Stage = { w: number; h: number };

const rad = (degrees: number) => (degrees * Math.PI) / 180;
const bowAt = (drumDegrees: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDegrees)));

function place(
  ringDegrees: number,
  drumDegrees: number,
  ringRadius: number,
  drumRadius: number,
  bow: number,
  mix: number,
) {
  return (
    `translateX(${mix * bowAt(drumDegrees, bow)}px)` +
    ` rotateZ(${(1 - mix) * ringDegrees}deg) translateY(${-(1 - mix) * ringRadius}px)` +
    ` rotateX(${mix * drumDegrees}deg) translateZ(${mix * drumRadius}px)`
  );
}

export const WorksWheel = React.forwardRef<WorksWheelHandle, WorksWheelProps>(function WorksWheel(
  {
    items,
    label = "Works '26",
    action = "View",
    pageScrollDriven = false,
    onTurnRequest,
    className,
    ...props
  },
  forwardedRef,
) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const drag = React.useRef<number | null>(null);
  const settling = React.useRef(0);
  const id = React.useId().replace(/:/g, "");
  const [active, setActive] = React.useState(-1);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });
  const [reduced, setReduced] = React.useState(false);

  const count = items.length;
  const last = Math.max(count - 1, 0);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const read = () => setStage({ w: element.clientWidth, h: element.clientHeight });
    read();
    const observer = new ResizeObserver(read);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardWidth = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardHeight = cardWidth / CARD_RATIO;
    const drumRadius = cardHeight * DRUM;
    const ringRadius = cardHeight * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringRadius) / count) * 0.82) / (cardWidth || 1), 0.16, 1)
      : 1;

    return {
      cardWidth,
      cardHeight,
      ringRadius,
      ringScale,
      drumRadius,
      bow: cardHeight * BOW,
      depth: cardHeight * LENS,
      title: Math.max(18, cardHeight * TITLE),
      index: Math.max(9, cardHeight * INDEX),
    };
  }, [stage, count]);

  React.useEffect(() => {
    if (!stage.h || !count) return;
    let frame = 0;
    const { ringRadius, ringScale, drumRadius, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const currentTurn = turn.current;
      const mix = clamp(currentTurn, 0, 1);
      const position = Math.max(0, currentTurn - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-mix * drumRadius}px)`;
      }

      for (let index = 0; index < count; index += 1) {
        const distance = index - position;
        const drumDegrees = -distance * STEP;
        const card = cardRefs.current[index];
        if (card) {
          card.style.transform = place(
            distance * (360 / count),
            drumDegrees,
            ringRadius,
            drumRadius,
            bow,
            mix,
          );
          card.style.opacity = mix > 0.5 && Math.abs(distance) > CULL ? "0" : "1";
          card.style.pointerEvents = mix > 0.5 && Math.abs(distance) > CULL ? "none" : "auto";
          card.style.zIndex = String(Math.round(100 - Math.abs(distance) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, mix)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - mix);
      if (titleRef.current) titleRef.current.style.opacity = String(mix);
      const nearest = currentTurn >= 0.72 ? clamp(Math.round(position), 0, last) : -1;
      setActive((previous) => (previous === nearest ? previous : nearest));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  React.useImperativeHandle(
    forwardedRef,
    () => ({
      setTurn(next: number, immediate = false) {
        const clamped = clamp(next, 0, last + 1);
        target.current = clamped;
        if (immediate) turn.current = clamped;
      },
    }),
    [last],
  );

  const requestTurn = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, last + 1);
      if (onTurnRequest) onTurnRequest(clamped);
      else to(clamped);
    },
    [last, onTurnRequest, to],
  );

  React.useEffect(() => {
    const element = stageRef.current;
    if (!element || !count || pageScrollDriven) return;

    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(() => to(Math.round(target.current)), SETTLE);
    };

    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last, count, pageScrollDriven]);

  const endDrag = () => {
    drag.current = null;
    if (target.current > 0) {
      to(target.current < 0.5 ? 0 : Math.max(1, Math.round(target.current)));
    }
  };

  return (
    <section
      aria-label={label}
      className={cn(
        "bg-background text-foreground relative min-h-[30rem] w-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
      tabIndex={0}
      role="listbox"
        aria-label={`${label}. Scroll the page or use the arrow keys to browse.`}
        aria-activedescendant={active >= 0 ? `${id}-works-wheel-${active}` : undefined}
        className={cn(
          "works-wheel__stage focus-visible:outline-foreground absolute inset-0 outline-none focus-visible:outline-2 focus-visible:-outline-offset-4",
          pageScrollDriven ? "cursor-default touch-pan-y" : "cursor-grab touch-pan-x active:cursor-grabbing",
        )}
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={pageScrollDriven ? undefined : (event) => {
          drag.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={pageScrollDriven ? undefined : (event) => {
          if (drag.current === null) return;
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={pageScrollDriven ? undefined : endDrag}
        onPointerCancel={pageScrollDriven ? undefined : endDrag}
        onLostPointerCapture={pageScrollDriven ? undefined : endDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") requestTurn(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") requestTurn(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, index) => (
            <a
              key={item.title}
              id={`${id}-works-wheel-${index}`}
              role="option"
              aria-selected={index === active}
              href={item.href}
              target={item.target}
              rel={item.target === "_blank" ? "noreferrer" : undefined}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="group absolute [backface-visibility:hidden]"
              style={{
                width: metrics.cardWidth,
                height: metrics.cardHeight,
                marginLeft: -metrics.cardWidth / 2,
                marginTop: -metrics.cardHeight / 2,
              }}
            >
              <span className="bg-muted shadow-foreground/12 relative block size-full overflow-hidden rounded-lg shadow-[0_18px_40px_-18px_var(--tw-shadow-color)]">
                <img
                  src={item.image}
                  alt=""
                  draggable={false}
                  className="size-full object-cover"
                />
                {action && item.href ? (
                  <span className="bg-background/80 text-foreground pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                      <path
                        d="M3 9 9 3M4 3h5v5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {action}
                  </span>
                ) : null}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div
        ref={labelRef}
        className="works-wheel__label font-display pointer-events-none absolute inset-0 grid place-items-center tracking-tight"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>

      <div
        ref={titleRef}
        className="works-wheel__details pointer-events-none absolute top-1/2 left-[6%] max-w-[29%] -translate-y-1/2 opacity-0"
      >
        <p className="font-display leading-[1.05] tracking-tight" style={{ fontSize: metrics.title }}>
          {items[active]?.title}
        </p>
        {items[active]?.description ? (
          <p className="text-muted-foreground mt-4 max-w-[36ch] text-sm leading-relaxed">
            {items[active].description}
          </p>
        ) : null}
      </div>

      <ol
        className="works-wheel__index text-muted-foreground absolute top-[7.5%] right-[2.5%] max-w-[24%] text-right leading-[1.75]"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, index) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => requestTurn(index + 1)}
              aria-label={`Show ${item.title}`}
              className={cn(
                "focus-visible:outline-foreground cursor-pointer transition-colors outline-none focus-visible:outline-1",
                "works-wheel__index-button",
                index === active && "is-active font-medium",
              )}
              aria-current={index === active ? "true" : undefined}
              data-active={index === active ? "true" : "false"}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
});

WorksWheel.displayName = "WorksWheel";

export default WorksWheel;
