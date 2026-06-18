import type { ReviewData } from "@/types/dentist";

interface ReviewMatrixProps {
  reviews: ReviewData[];
  columns?: 2 | 3;
}

const VerificationIcon = ({
  platform,
}: {
  platform: ReviewData["verificationBadge"];
}) => {
  const icons = {
    google: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#1877F2"
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
      </svg>
    ),
    yelp: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#FF1A1A"
          d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206l2.42 2.098c.603.522.324 1.418-.75 1.613zm-9.107 5.25l.676 5.15c.087.663-.77 1.05-1.253.566l-3.047-3.051a1.072 1.072 0 01.106-1.608l2.712-1.95c.752-.54 1.72.23 1.806.893zm-.89-6.116L5.22 9.797c-.66-.258-.66-1.21 0-1.468l4.943-1.931a1.072 1.072 0 011.394.644l.943 3.19c.262.886-.524 1.717-1.337 1.496z"
        />
      </svg>
    ),
    healthgrades: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
        <circle fill="#00A37D" cx="12" cy="12" r="10" />
        <path
          fill="#fff"
          d="M17 9h-4V5h-2v4H7v2h4v4h2v-4h4V9z"
        />
      </svg>
    ),
  };
  return icons[platform];
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-neutral-border"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export const ReviewMatrix = ({ reviews, columns = 3 }: ReviewMatrixProps) => {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="w-full" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="sr-only">
        Patient Reviews
      </h2>
      <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
        {reviews.map((review) => (
          <article
            key={review.id}
            className="card-elevated p-6 flex flex-col gap-4 no-cls"
          >
            {/* Header: Platform Badge + Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VerificationIcon platform={review.verificationBadge} />
                <StarRating rating={review.rating} />
              </div>
              {review.isVerifiedPatient && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full"
                  style={{
                    backgroundColor: "var(--primary-brand)",
                    color: "var(--bg-canvas)",
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified
                </span>
              )}
            </div>

            {/* Procedure Category Tag */}
            <div
              className="inline-block self-start px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded"
              style={{
                backgroundColor: "var(--secondary-accent)",
                color: "var(--text-main)",
              }}
            >
              {review.procedureCategory}
            </div>

            {/* Review Text */}
            <blockquote className="flex-1">
              <p
                className="text-sm leading-relaxed line-clamp-4"
                style={{ color: "var(--text-main)" }}
              >
                &ldquo;{review.reviewText}&rdquo;
              </p>
            </blockquote>

            {/* Footer: Reviewer + Date */}
            <footer className="flex items-center justify-between pt-4 border-t border-neutral-border">
              <cite
                className="text-sm font-medium not-italic"
                style={{ color: "var(--text-main)" }}
              >
                {review.reviewerName}
              </cite>
              <time
                className="text-xs"
                style={{ color: "var(--neutral-muted)" }}
                dateTime={review.datePosted}
              >
                {new Date(review.datePosted).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReviewMatrix;
