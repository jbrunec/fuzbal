function RatingDiffDisplay({ ratingDiff }: { ratingDiff?: number }) {
  if (!ratingDiff) return <></>;
  return ratingDiff > 0 ? (
    <>
      {"("}
      <span className="text-green-500">+{ratingDiff.toFixed(0)}</span>
      {")"}
    </>
  ) : (
    <>
      {"("}
      <span className="text-red-500">{ratingDiff.toFixed(0)}</span>
      {")"}
    </>
  );
}

export default RatingDiffDisplay;
