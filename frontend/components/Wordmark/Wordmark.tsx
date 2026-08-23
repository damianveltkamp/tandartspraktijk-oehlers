/**
 * Text wordmark that replaced the raster logo. It inherits its colour from the
 * parent so the header can render it white over the video hero and dark on
 * pages with a light background.
 */
export const Wordmark = () => {
  return (
    <span className="flex flex-col leading-[1.05]">
      <span className="text-[19px] font-extrabold tracking-[0.16em]">
        OEHLERS
      </span>
      <span className="text-[10px] font-semibold tracking-[0.28em] opacity-60">
        TANDARTSPRAKTIJK
      </span>
    </span>
  );
};
