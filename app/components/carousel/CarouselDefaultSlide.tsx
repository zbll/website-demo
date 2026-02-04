type CarouselDefaultSlideProps = {
  src: string;
  index: number;
};

export default function CarouselDefaultSlide({
  src,
  index,
}: CarouselDefaultSlideProps): React.ReactElement {
  return (
    <div className="relative h-full w-full">
      <img
        src={src}
        alt={`carousel-${index + 1}`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
    </div>
  );
}
