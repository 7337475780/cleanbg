# ImageComparisonSlider

A robust, highly scalable, zero-render React component for comparing two images. Built with Framer Motion, it features hardware acceleration, comprehensive accessibility, custom state pipelines, and zero layout shifts.

## Installation

This component depends on `framer-motion`, `lucide-react`, and Next.js's `next/image`.

```bash
npm install framer-motion lucide-react
```

## Features
- **Zero React Renders:** Uses Framer Motion's `useMotionValue` to drag at 60 FPS without triggering React re-renders.
- **Hardware Accelerated:** Enforces `translate3d(0,0,0)` and `will-change: transform`.
- **Progressive Loading:** Built-in skeletons, shimmer overlays, and `onImageLoaded` callbacks.
- **Accessibility:** Full keyboard navigation (Arrows, Home, End), ARIA roles, focus rings, and support for `prefers-reduced-motion`.
- **Pipeline Ready:** Native props for `idle`, `uploading`, `queued`, `processing`, `error`, and `completed` states.

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `beforeImage` | `string` | - | The image to reveal on the top/left. Supports blobs and data URIs natively. |
| `afterImage` | `string` | - | The image to reveal on the bottom/right. |
| `state` | `SliderState` | `"completed"` | Represents the AI processing state (`idle`, `uploading`, `queued`, `processing`, `completed`, `error`). |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | The slider direction. |
| `initialPosition` | `number` | `50` | Start position (0 to 100). |
| `disabled` | `boolean` | `false` | Disables interaction if true. |
| `showLabels` | `boolean` | `true` | Show hover labels on the corners. |
| `beforeLabel` | `string` | `"Original"` | Text for the before label. |
| `afterLabel` | `string` | `"Result"` | Text for the after label. |
| `aspectRatio` | `string` | `"4/3"` | Container aspect ratio to prevent CLS. |

### Imperative Handle (forwardRef)

You can pass a ref to control the slider programmatically:

```typescript
const sliderRef = useRef<ImageComparisonSliderRef>(null);

// Reset to 50% with spring animation
sliderRef.current?.reset();

// Animate to 100% (e.g. to show the original image)
sliderRef.current?.animateTo(100);

// Get current position (0-100)
const position = sliderRef.current?.getPosition();
```

## Events

- `onPositionChange(position: number)`
- `onDragStart()`
- `onDragEnd()`
- `onImageLoaded(type: "before" | "after")`
- `onProcessingComplete()`
- `onError(error: Error)`

## Future Integration (AI Pipeline)

The `state` prop is explicitly designed to couple with an AI generation pipeline.
Instead of unmounting the component and showing a separate spinner, you can transition the state from `"idle"` -> `"uploading"` -> `"processing"` -> `"completed"`. The component will automatically manage the overlays (e.g. loading spinners, error text) while perfectly maintaining the container dimensions and aspect ratio to prevent CLS.
