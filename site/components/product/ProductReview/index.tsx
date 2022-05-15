import { StarIcon } from '@heroicons/react/20/solid'
import { ProductReview as IProductReview } from '@commerce/types/product'
import { FC } from 'react'
import { Text } from '@components/ui'

interface ProductReviewProps {
  review: IProductReview
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const ProductReview: FC<ProductReviewProps> = ({ review }) => {
  return (
    <div key={review.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
      <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
        <div className="flex items-center xl:col-span-1">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                  'h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="ml-3 text-sm text-gray-500">
            {review.rating}
            <span className="sr-only"> out of 5 stars</span>
          </p>
        </div>

        <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
          <Text variant="subHeading">{review.title}</Text>

          <div className="mt-3 space-y-6">
            <Text markdown={review.content} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center text-base lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
        <p className="font-medium">{review.author}</p>
        <time
          dateTime={review.datetime}
          className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
        >
          {review.date}
        </time>
      </div>
    </div>
  )
}

export default ProductReview
