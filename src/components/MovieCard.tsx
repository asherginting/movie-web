import Image from "next/image";

interface MovieCardProps {
  title: string;
  posterPath: string;
  rating: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const MovieCard = ({
  title,
  posterPath,
  rating,
  isFavorite,
  onFavoriteToggle,
}: MovieCardProps) => {
  return (
    <div className="relative p-2 group">
      <Image
        src={posterPath}
        alt={title}
        width={256}
        height={384}
        className="rounded-lg transition duration-300 ease-in-out transform group-hover:brightness-75"
        priority={true}
      />
      <div className="absolute top-4 right-4 md:top-4 md:right-8 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
        <button onClick={onFavoriteToggle}>{isFavorite ? "❤️" : "♡"}</button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 flex justify-center items-center">
        <RatingOverlay rating={rating} />
      </div>
    </div>
  );
};

interface RatingOverlayProps {
  rating: number;
}

const RatingOverlay = ({ rating }: RatingOverlayProps) => (
  <div className="flex items-center justify-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} filled={i < Math.round(rating / 2)} />
    ))}
  </div>
);

interface StarIconProps {
  filled: boolean;
}

const StarIcon = ({ filled }: StarIconProps) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default MovieCard;
