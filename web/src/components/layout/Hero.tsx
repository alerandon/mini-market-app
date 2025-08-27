import Link from 'next/link';

interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export default function Hero({
  title,
  description,
  buttonText,
  buttonHref,
}: HeroProps) {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">{title}</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        {description}
      </p>

      <div className="space-y-4 mb-12">
        <Link
          href={buttonHref}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
