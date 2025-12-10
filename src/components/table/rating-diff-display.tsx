function RatingDiffDisplay({ ratingDiff }: { ratingDiff: number }) {
  return ratingDiff > 0 ? (
    <>
      {"("}
      <span className="text-green-500">+{ratingDiff}</span>
      {")"}
    </>
  ) : (
    <>
      {"("}
      <span className="text-red-500">{ratingDiff}</span>
      {")"}
    </>
  );
}

export default RatingDiffDisplay;
