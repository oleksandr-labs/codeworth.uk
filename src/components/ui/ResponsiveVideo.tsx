/**
 * ResponsiveVideo — responsive 16:9 wrapper for <video> elements or YouTube embeds.
 * Usage:
 *   <ResponsiveVideo src="https://youtube.com/embed/..." title="Demo video" />
 *   <ResponsiveVideo src="/videos/demo.mp4" type="video/mp4" />
 */

interface ResponsiveVideoProps {
  /** YouTube embed URL or native video source URL */
  src: string;
  /** Accessible title for iframe / video */
  title?: string;
  /** MIME type for native video (e.g. "video/mp4"). If omitted, renders an iframe. */
  type?: string;
  /** Aspect ratio — defaults to "16/9" */
  aspectRatio?: "16/9" | "4/3" | "9/16";
  /** Extra className applied to the outer wrapper */
  className?: string;
}

const ASPECT_CLASSES: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3":  "aspect-[4/3]",
  "9/16": "aspect-[9/16]",
};

export function ResponsiveVideo({
  src,
  title = "Video",
  type,
  aspectRatio = "16/9",
  className = "",
}: ResponsiveVideoProps) {
  const wrapperClass = `relative w-full overflow-hidden rounded-xl ${ASPECT_CLASSES[aspectRatio] ?? "aspect-video"} ${className}`;

  if (type) {
    return (
      <div className={wrapperClass}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          controls
          preload="metadata"
          title={title}
        >
          <source src={src} type={type} />
          <track kind="captions" />
          {title}
        </video>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <iframe
        className="absolute inset-0 w-full h-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
